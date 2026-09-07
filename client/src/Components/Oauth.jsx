import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";



export default function Oauth() {
  
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const handleGoogleClick=async ()=>{

         try {
            
               const provider=new GoogleAuthProvider();
               const auth=getAuth(app);
               const result=await signInWithPopup(auth,provider);
               
               const res=await fetch("/api/auth/my-google",{

                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                       
                         name:result.user.displayName ,
                         email:result.user.email,
                         photo:result.user.photoURL 

                    })

               })
            
               const data=await res.json();
               dispatch(signInSuccess(data));        
              navigate("/");
         } catch (error) {
             console.log("could not authenticate with google", error);
         }

     }
  
      
    return (
     <button   onClick={handleGoogleClick}  type="button"  className="bg-red-700 p-3  cursor-pointer rounded-lg uppercase text-white hover:opacity-80 "  >  
         Continue with google
     </button>
  )
}
