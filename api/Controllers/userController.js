import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const testApi=(req,res)=>{

   res.json({message:"Api routes is working"});

}

export const updateUserController=async (req,res,next)=>{
   

    if (req.user.id != req.params.id)return next(errorHandler(401,"unauthorised"))
 
    try {

       if (req.body.password){
           
           req.body.password=bcrypt.hashSync(req.body.password, 10)
       }
 
       const updateUser=await User.findByIdAndUpdate(req.user.id, {

             $set:{

                  username:req.body.username,
                  email:req.body.email,
                  password:req.body.password,
                  avatar:req.body.avatar
             }

       },{new:true}) 

       const {password, ...rest}=updateUser._doc

        res.status(200).json({
 
            success:true,
            message:"updated successfully",
            data:rest
        })

    } catch (error) {
        next(error)
    }



}