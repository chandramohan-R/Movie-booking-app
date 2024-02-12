import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api-helpers/api-helper'

const labelProbs = {
  mt: 1,
  mb: 1,
}

function AddMovie() {
  const [actors, setActors] = useState([])
  const [actor, setActor] = useState("")

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false

  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInputs = { ...inputs, actors };  // Include actors in the inputs object
    console.log(updatedInputs);
  
    addMovie(updatedInputs)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width="50%"
          padding={10}
          margin="auto"
          display="flex"
          flexDirection="column"
          boxShadow="10px 10px 20px #ccc"
        >
          <Typography textAlign="center" variant="h5" fontFamily="verdana">
            Add New Movie
          </Typography>
          <FormLabel sx={labelProbs}>
            Title</FormLabel>
          <TextField value={inputs.title} onChange={handleChange} name="title" variant="standard" margin="normal" />

          <FormLabel sx={labelProbs}
          >Description</FormLabel>
          <TextField value={inputs.description} onChange={handleChange} name="description" variant="standard" margin="normal" />

          <FormLabel sx={labelProbs}
          >Poster URL</FormLabel>
          <TextField value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant="standard" margin="normal" />

          <FormLabel sx={labelProbs}
          >Release Date</FormLabel>
          <TextField type="date" value={inputs.releaseDate} onChange={handleChange} name="releaseDate" variant="standard" margin="normal" />

          <FormLabel sx={labelProbs}
          >Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value="actor"
              onChange={(e) => setActor(e.target.value)}
              name="actor"
              variant="standard"
              margin="normal" />
            <Button
              onClick={() => {
                setActors([...actors, actor])
                setActor("")
              }}
            >Add</Button>
          </Box>
          <FormLabel sx={labelProbs}
          >Featured</FormLabel>
          <Checkbox name="featured"
            onClick={(e) => setInputs((prevState) => (
              { ...prevState, featured: e.target.checked, }))}
            checked={inputs.featured}
            sx={{ mr: "auto" }} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: 'auto',
              bgcolor: "#2b2d42",
              "&:hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default AddMovie
