import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signUpController=async(req,res,next)=>{

    const {username, email, password}=req.body;
    
     try {
         
        const hashPass=bcrypt.hashSync(password,10)
        const user=new User({username,email,password:hashPass});
        const userInfo=await user.save();
       
        res.status(200).json({message:"user succssfully created",

            data:userInfo
        })


     } catch (error) {
         
          console.log(error);
          res.status(500).json({mssage:"internal server error"});
     }
 


}