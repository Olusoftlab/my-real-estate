import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const testApi=(req,res)=>{

   res.json({message:"Api routes is working"});

}

export const updateUserController=async (req,res,next)=>{
   

    if (req.user.id !== req.params.id)return next(errorHandler(401,"cannot update another person info"))
 
    try {
 
        const updates={}
        
        const assignAll=req.body.password || req.body.email || req.body.avatar || req.body.username

       if (assignAll){
           
           updates.password=bcrypt.hashSync(req.body.password, 10)
           updates.email=req.body.email
           updates.username=req.body.username
           updates.avatar=req.body.avatar  
       }
 
   

       const updateUser=await User.findByIdAndUpdate(req.user.id, {

             $set:updates

       },{new:true}) 


       const {password, ...rest}=updateUser._doc

        return res.status(200).json({
 
            success:true,
            message:"updated successfully",
            rest
        })

    } catch (error) {
        next(error)
    }



}