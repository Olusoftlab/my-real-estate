import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useUploadThing } from "../uploading"


export default function Profile() {
    
  const {currentUser}=useSelector((state)=>state.user)
  const fileRef=useRef(null)
  const [value, setValue]=useState({username: currentUser.username, email:currentUser.email, password:"",  avatar:currentUser.avatar  })
  const[progress, setProgress]=useState(0)
  const [url, setUrl]=useState(null)
  const [error, setError]=useState(null)



  const {startUpload, isUploading}=useUploadThing("imageUploader",{

    onUploadProgress:(p)=>setProgress(p),
    onClientUploadComplete:(res)=>{
         
         setUrl(res[0].ufsUrl)
         setValue({...value, avatar:res[0].ufsUrl  })
    },    
    onUploadError:(e)=>setError(e.message)

  })




   const handleChange=(e)=>{

       setValue({...value, [e.target.id]:e.target.value})

      
   }



  const handleFileChange=async(e)=>{

     const files=e.target.files?.[0]
    
     if (!files)return
     setError(null)
     setUrl(null)
    await startUpload([files]) 
  }





   const handleSubmit=(e)=>{

         e.preventDefault();

        console.log(value);
   }




  return (
    <div>
         <h1 className="font-semiboldbold text-3xl text-center mt-8 ">Profile</h1>
         <div className="my-4 flex justify-center ">
             <img  src={currentUser?   url || currentUser.avatar:null }  onClick={()=>fileRef.current.click()   }   className=" w-20 h-20 object-cover   rounded-full cursor-pointer"   alt="profile-pic" />           
         </div>
         <div  className="flex flex-col items-center max-w-40 mx-auto gap-2 mt-4">
             { isUploading &&  <progress   className="rounded-lg w-45 h-2"   max="100"  value={progress}  />}
             {isUploading && <p className="text-green-600 text-[0.82rem]"   >Uploading {progress === 100 ? "Completed": ""}{progress}%</p>}
             {error && <p  className="text-red-600"  >{error}</p>}
         </div>
         <form   onSubmit={handleSubmit}  className="flex flex-col p-3 gap-4 max-w-lg mx-auto ">
              <input  onChange={handleFileChange}     type="file" ref={fileRef} hidden accept="image/*"  />    
              <input type="text"   onChange={handleChange}  id="username"  value={value.username}   className="border outline-none  bg-white  rounded-lg p-2"   />
              <input   onChange={handleChange} value={value.email} id="email"  type="email"   className="border bg-white  outline-none  p-2 rounded-lg"  />     
              <input  type="password" onChange={handleChange} id="password"  value={value.password}   placeholder="password" className="border bg-white  outline-none  p-1 h-10 rounded-lg"   />
              <button  className=" dark-blue p-2 cursor-pointer uppercase hover:opacity-90 rounded-lg text-white"  >Update</button>
              <button  className="bg-green-600 p-2 text-white  rounded-lg  hover:opacity-90 uppercase"  >Create listings</button>
          </form>  
          <div className=" flex justify-between max-w-lg mx-auto px-4">
             <span className="text-red-700 text-sm hover:underline cursor-pointer"  >Delete account</span>
             <span className="text-red-700 text-sm hover:underline cursor-pointer"  >Sign out</span>
          </div>    
          <p  className="text-green-400 text-center mt-3 hover:underline cursor-pointer"  >Show listings</p>
    </div>
  )
}
