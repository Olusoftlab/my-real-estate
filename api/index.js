import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { createRouteHandler } from "uploadthing/express";
import authRouter from "./routes/authRouter.js";
import { uploadRouter } from "./routes/uploadRoute.js";
import userRouter from "./routes/userRouter.js";


dotenv.config();


const app=express();
app.use(cors({origin:"http://localhost:5173", credentials:true    }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/uploadthing", createRouteHandler({router:uploadRouter}))


app.use((err,req,res,next)=>{
   

    if (err){
          const message=err.message
          const statusCode=err.statusCode || 500
          const success=false
         
         return res.status(statusCode).json({message, statusCode, success  });

    }
 
});



mongoose.connect(process.env.DATABASE_URL).then(()=>{

   console.log("Succcessfully connected database");

   app.listen(5000, ()=>{

       console.log("Server running on port 5000");
   })

}).catch((err)=>{

      console.error(err);
})




