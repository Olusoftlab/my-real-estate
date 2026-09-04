import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signUpController=async(req,res,next)=>{

    const {username, email, password}=req.body;
    
     try {
         
        const hashPass=bcrypt.hashSync(password,10)
        const user=new User({username,email,password:hashPass});
        const userInfo=await user.save();
       
        return  res.status(200).json({message:"user succssfully created",

            data:userInfo
        })


     } catch (error) {
         
          next(error);
     }
 


}


export const signInController=async(req,res,next)=>{

    const {email,password}=req.body

    try{
         
         const validUser=await User.findOne({email})

         if (!validUser){

           return next(errorHandler(404, "user not found"));
         }

         const validPass=await bcrypt.compare(password, validUser.password);

         if(!validPass){

             return next(errorHandler(401, "user unauthorised: invalid credentials"));
         }

       const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET, {expiresIn:"2d"});
       const {password:pass, ...rest}=validUser._doc;


       res.cookie("access_token", token, {httpOnly:true, maxAge:2 * 24 * 60 * 60 * 1000}).status(200).json({message:"user signed in successfully",data:rest});   
         

    }catch(error){

       next(error);

    }



}