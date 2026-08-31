import bcrypt from "bcryptjs";
import User from "../models/user.model.js";


export const signUpController=async(req,res)=>{

    const {username, email, password}=req.body;
    
     try {
         
        const hashPass=bcrypt.hashSync(password,10)
        const user=new User({username,email,password:hashPass});
        const userInfo=await user.save();
       
        res.status(200).json({message:"user succssfully created",

            data:userInfo
        })


     } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
     }
 


}