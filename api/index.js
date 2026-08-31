import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

dotenv.config();


const app=express();

app.use("/api/user", userRouter);





mongoose.connect(process.env.DATABASE_URL).then(()=>{

   console.log("Succcessfully connected database");

   app.listen(5000, ()=>{

       console.log("Server running on port 5000");
   })

}).catch((err)=>{

      console.error(err);
})




