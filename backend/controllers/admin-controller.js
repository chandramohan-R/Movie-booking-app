import Admin from "../models/Admin";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Correct the condition for checking empty email and password
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (err) {
        console.error("Error finding admin:", err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }

    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    let admin;

    const hashedPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password: hashedPassword });
        admin = await admin.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to store admin" });
    }

    if (!admin) {
        return res.status(500).json({ message: "Unable to store admin" });
    }

    return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || email.trim() === "" || !password || password.trim() === "") {
            return res.status(422).json({ message: "Invalid Inputs" });
        }

        let existingAdmin;

        try {
            existingAdmin = await Admin.findOne({ email });
        } catch (err) {
            console.error("Error finding admin:", err);
            return res.status(500).json({ message: "Unexpected error occurred" });
        }

        if (!existingAdmin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY);

        return res.status(200).json({ message: "Authentication Complete", token, id: existingAdmin._id });
    } catch (error) {
        console.error("Error in adminLogin:", error);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
};

export const getAdmins = async (req, res, next) => {
    let admins;
    try {
        admins = await Admin.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }

    if (!admins) {
        return res.status(500).json({ message: "Unable to fetch admins" });
    }

    return res.status(200).json({ admins });
};


export const getAdminById = async (req, res, next) => {
  try {
    const adminId = req.params.id;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    console.error("Error in getAdminById:", error);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
};
