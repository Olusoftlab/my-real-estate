import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {
     
     const [formData, setFormData]=useState({});
     const {loading,error}=useSelector((state)=>state.user);
     const navigate=useNavigate();
     const dispatch=useDispatch();

     const handleChange=(e)=>{

       setFormData({...formData, [e.target.id]:e.target.value})
    }

    const handleSubmit=async (e)=>{

          e.preventDefault();

          dispatch(signInStart());
          try {
            
              const res=await fetch("/api/auth/sign-in",{

                method:"POST",                
                headers:{
                   
                   "Content-Type":"application/json"

                }
              ,
                 body:JSON.stringify(formData)
      
              })

             const result=await res.json();
              
             if (result.success === false){
                dispatch(signInFailure(result.message));
                return;
             }



             dispatch(signInSuccess(result));
             navigate("/");
          } catch (error) { 
               
             dispatch(signInFailure(error.message))

          }


    }





 

  return (
    <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-2xl font-bold text-center my-4" >Sign in</h1>
         {error && <i className="text-red-600 px-3 text-sm" >{error}</i>}
         <form   onSubmit={handleSubmit}   className='flex flex-col gap-3 mt-0  p-2 '>

               <input  type="email" placeholder="email"   onChange={handleChange}  id="email"  className="border p-2 rounded-lg"  />        
               <input  type="password" placeholder="password" onChange={handleChange}  id="password"  className="border p-2 rounded-lg"  />
               <button  disabled={loading}  className="bg-slate-700 text-white  hover:opacity-95  p-2 rounded-lg uppercase cursor-pointer ">
                  {loading? "loading...": "Sign in"}
                </button> 
         </form>
         <div className="flex px-3.5  gap-3">
             <p >Dont have an account?</p>
             <Link  to="/sign-up">
                 <span className="text-blue-600 hover:underline text-sm" >Sign up</span> 
             </Link>
         </div>
    </div>
  )
}
