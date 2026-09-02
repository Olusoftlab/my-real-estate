import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
     
   const [formData, setFormData]=useState({});
   
   const [error, setError]=useState(null);
 
   const [loading, setLoading]=useState(false);

   const navigate=useNavigate()
  

 const handleChange=(e)=>{

     setFormData({...formData,[e.target.id]:e.target.value });


 }



  

  const handleSubmit=async (e)=>{

     e.preventDefault()
            
      
        setLoading(true);
       try {
                       
               const res=await fetch("/api/auth/sign-up",

              {
                  method:"POST",
                  headers:{

                    "Content-Type":"application/json"
                  },  
                  body:JSON.stringify(formData)
              }

            )
            
          const result=await res.json();
          
          if (result.success === false){
                
             setError(result.message)
             setLoading(false);
             return
          }
          
          setLoading(false);
          setTimeout(()=> setError(null), 5000); 
          navigate("/sign-in");
       }catch(err){
          
           console.log(err.message);
           setLoading(false);
           
       } 
 
    
  }








  return (
    <div className="p-3 max-w-lg mx-auto ">
         
         <h1  className="text-3xl text-center font-semibold my-7" >Sign up</h1>
          {error && <p   className="text-red-600" >user already exist</p>}
         <form   onSubmit={handleSubmit}  className="flex flex-col gap-4">
              <input  type="text" placeholder="username" id="username"   onChange={handleChange}   className="border p-3 rounded-lg bg-white"    />
              <input  type="email" placeholder="email"  onChange={handleChange}   id="email" className="border p-3 rounded-lg  bg-white"    />
              <input  type="password" placeholder="password"   onChange={handleChange}  id="password"   className="border p-3 rounded-lg  bg-white"    />
              <button  disabled={loading}  className="bg-slate-700 text-white p-3 cursor-pointer
              rounded-lg uppercase hover:opacity-95 disabled:opacity-80"  >{loading? "Loading...": "Sign up"  }</button>
             
         </form>
         <div className="mt-5 flex gap-2">
               <p>Have an account?</p>
               <Link to={"/sign-in"}>
                   <span className="text-blue-700 hover:underline" >Sign in</span>
               </Link> 
         </div>
    </div>
  )
}
