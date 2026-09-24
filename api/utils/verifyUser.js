import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const  verifyUser=(req,res,next)=>{

       let token=req.headers.authorization.startsWith("Bearer") || req.cookies.access_token  

       if (!token)return next(errorHandler(401,"unauthorised"))

       token=req.headers.authorization.split(" ")[1] || req.cookis.access_token

       jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{

            if (err)return next(errorHandler(403,"forbidden"))

            req.user=user

            next();

       })
   
}