// movie-routes.js

import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controller";
import express from "express";

const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

export default movieRouter;
