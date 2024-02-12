import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Movie from '../models/Movie'; // Import the Movie model
import Admin from '../models/Admin'; // Import other necessary models

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(' ')[1];

  if (!extractedToken || extractedToken.trim() === '') {
    return res.status(404).json({ message: 'Token not Found' });
  }

  let adminId;

  // Verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

if (!title || title.trim() === "" || !description || description.trim() === "" || !posterUrl || posterUrl.trim() === "" || !actors || actors.length === 0) {
  return res.status(422).json({ message: "Invalid Inputs" });
}

  let movie;

  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);

    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Request Failed' });
  }

  if (!movie) {
    return res.status(500).json({ message: 'Request Failed' });
  }

  return res.status(201).json({ message: 'Movie added successfully', movie });
};


export const getAllMovies = async (req, res, next) => {
  try {
      const movies = await Movie.find();

      if (!movies || movies.length === 0) {
          return res.status(404).json({ message: 'No movies found' });
      }

      return res.status(200).json({ message: 'Movies retrieved successfully', movies });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMovieById = async (req,res,next)=>{
   const id =req.params.id;
   let movie;
   try{
      movie = await Movie.findById(id)
   }catch(err){
      return console.log(err)
   }
   if (!movie){
      return res.status(404).json({message:" Invalid Movie ID"})

   }
   return res.status(200).json({ movie })
}