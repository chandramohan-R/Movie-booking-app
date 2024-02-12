import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helper";
import { Box, Typography, TextField, FormLabel, Button } from "@mui/material";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [input, setInput] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    newBooking({ ...input, movie: movie?._id })
        .then((res) => {
            console.log(res);
            // Handle success, redirect or show a success message if needed
        })
        .catch((err) => {
            console.error("Error in newBooking:", err);
            if (err.response && err.response.status === 400) {
                console.error("Server responded with a Bad Request:", err.response.data);
                // Handle 400 Bad Request, show an error message to the user
            } else {
                console.error("Unexpected error:", err.message);
                // Handle other errors, show a generic error message to the user
            }
        });
};

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie: {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"BOX"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer: {movie.actors.map((actor) => "" + actor + "")}
                </Typography>
                <Typography>
                  <Typography fontWeight={"bold"} marginTop={1}>
                    Release Date:{" "}
                    {new Date(movie.releasedate).toDateString()}
                  </Typography>
                </Typography>
              </Box>
            </Box>

            <Box width="50%" paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin="auto"
                  display="flex"
                  flexDirection="column"
                >
                  <FormLabel variant="h6">Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={input.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel variant="h6">Booking Date</FormLabel>
                  <TextField
                    value={input.date}
                    onChange={handleChange}
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                  />

                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
