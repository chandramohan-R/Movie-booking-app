import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helper';

function HomePage() {
  const [movies,setMovies] = useState([]);
 useEffect(() => {
  getAllMovies()
    .then((data) => {
      console.log(data); // Log the data to check what you are receiving
      setMovies(data.movies || []);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <>        <Box width={"100%"} height="100%" margin="auto" marginTop={2} >
            <Box margin={"auto"} width="60%" height={"40vh"} padding={2}>
                <img src="https://occ-0-2086-2186.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABaK42iN_y5WwNhqXbdBdRXSdRpgFbll2cI5ev3vbPmdBGPYZojVBKBGWo154i1Mx2qjDih1xRvC2fRFNXBQR8YDT17d2ERbpKFj9Q3VA2mRE0yV_wMiVQprO7x9A-Pfpaf4U.jpg?r=3db" alt="" 
                width={"100%"}
                height={"100%"}
                />
            </Box>
        </Box>
        <Box padding={5} margin="auto">
            <Typography variant='h4' textAlign={"center"} >
                Latest Releases

            </Typography>
        </Box>
        <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} alignItems="center" flexWrap={"wrap"}>
  {movies && 
    movies.slice(0, 4).map((movie, index) => (
      <MovieItem 
        id={movie.id} 
        title={movie.title} 
        posterUrl={movie.posterUrl} 
        releaseDate={movie.releaseDate}
        key={index}
      />
    ))}  
</Box>

        <Box display="flex" padding={5} margin="auto">
          <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{ margin: "auto", color: "#2b2d42" }}>
        view All Movies
          </Button>


        </Box>
        </>

    
  )
}

export default HomePage