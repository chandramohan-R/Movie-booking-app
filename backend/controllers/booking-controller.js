import Booking from "../models/Booking";
import Movie from "../models/Movie";
import User from "../models/User";
import mongoose from "mongoose";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    // Validate required fields
    if (!movie || !date || !seatNumber || !user) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    // Retrieve the user ID from the request or your preferred method
    const userId = req.user?.id; // Adjust accordingly based on how user data is stored in your requests

    if (!userId) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        const existingMovie = await Movie.findById(movie);
        const existingUser = await User.findById(user);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const booking = new Booking({
            movie: existingMovie._id,
            date: new Date(date),
            seatNumber: seatNumber,
            user: existingUser._id,
        });

        const session = await startSession();
        session.startTransaction();

        existingUser.booking.push(booking);
        existingMovie.booking.push(booking);

        await existingUser.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });

        session.commitTransaction();

        return res.status(201).json({ booking });
    } catch (error) {
        console.error("Error in newBooking:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unexpected Error" });
    }
};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;

    try {
        const booking = await Booking.findByIdAndRemove(id).populate("user movie");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        await booking.user.booking.pull(booking);
        await booking.movie.booking.pull(booking);
        await booking.movie.save({ session });

        session.commitTransaction();

        return res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting the booking" });
    }
};
