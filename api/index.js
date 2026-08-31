import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();


const app=express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);




mongoose.connect(process.env.DATABASE_URL).then(()=>{

   console.log("Succcessfully connected database");

   app.listen(5000, ()=>{

       console.log("Server running on port 5000");
   })

}).catch((err)=>{

      console.error(err);
})




