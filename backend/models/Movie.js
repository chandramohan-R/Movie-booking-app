import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true,

    },
    description: {
        type: String,
        required: true,

    },
    actors: {
        type: [String],
        required: true,
        sparse: true,
      },
      
    releaseDate: {
        type: Date,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,

    },
    featured: {
        type: Boolean,

    },

    booking:[{ type: mongoose.Types.ObjectId,
    ref:"Booking"}],
    admin: {
         type: mongoose.Types.ObjectId,
         ref:"Abmin",
        required: true,
    }


})

export default mongoose.model("Movie",movieSchema);
