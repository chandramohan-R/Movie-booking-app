import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../api-helpers/api-helper';
import MovieItem from './MovieItem';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={4}>
      <Typography
        margin="auto"
        variant="h4"
        padding={2}
        width="40%"
        bgcolor="blue"
        color="white"
        textAlign="center"
      >
        All Movies
      </Typography>
      <Box
        width="100%"
        margin="auto"
        marginTop={5}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
      >
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No movies available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Movies;
