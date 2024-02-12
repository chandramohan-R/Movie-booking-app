import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; 
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import bookingRouter from "./routes/booking-routes";
import movieRouter from "./routes/movie-routes";


dotenv.config();

const app= express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/booking",bookingRouter);
app.use('/movie', movieRouter);


mongoose.connect(`mongodb+srv://chandrucse419420:${process.env.MONGODB_PASSWORD}@cluster0.csssczw.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>app.listen(5000,()=>
console.log(`database connected sucessfully && server running port ${5000}`)
)
)
.catch((e)=>console.log(error))
        









//chandrucse419420
//S3ry9bijDIFi6YEf
//mongodb+srv://chandrucse419420:<password>@cluster0.csssczw.mongodb.net/?retryWrites=true&w=majority