import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice"
import { useUploadThing } from "../uploading"

export default function Profile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null)
  const [progress, setProgress]=useState(0)
  const [value,setValue]=useState({}) 
  const [url,setUrl]=useState(null)   
  const {currentUser,loading, error}=useSelector((state)=> state.user)
  const [imageError, setError]=useState(null)
  const [clear, setClear]=useState(false);
  const [showDeleteInfo, setShowDeleteInfo]=useState(false)
  const navigate=useNavigate()



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





   const handleSubmit=async (e)=>{

         e.preventDefault()
        
         try{
           dispatch(updateUserStart()) 
         
          const res= await fetch(`/api/user/update/`, 

            {

                method:"POST",
                credentials:"include",
                headers:{
                   
                   "Content-Type":"application/json"
               
                },

                body:JSON.stringify(value)

            }

          )
 
              const data=await res.json()
             
             if (data.success === false){

                 dispatch(updateUserFailure(data.message))
                 return
             }

             dispatch(updateUserSuccess(data)) 
             

         }catch(error){
           
             dispatch(updateUserFailure(error.message))

         }

   }

     const handleDelete=async ()=>{
        
           try{
              dispatch(deleteUserStart());

              const res=await fetch(`/api/user/delete/${currentUser.rest._id}`,  

                {method:"DELETE"}
              
              )

             const data=await res.json();
             
             if (data.success === false){

                 dispatch(deleteUserFailure(data.message));
                 return;
             }
            
             dispatch(deleteUserSuccess(data));

           }catch(error){

              dispatch(deleteUserFailure(error.message));
            
           } 

     }
 



   const clearMessage=()=>{

         setTimeout(()=>{

            setClear(true);
         },20000)
   }


  clearMessage();


  


  return (
    <div>
         <h1 className="font-semiboldbold text-3xl text-center mt-8 ">Profile</h1>
         <div className="my-4 flex justify-center ">
             <img  src={currentUser?   url || currentUser.rest?.avatar:null }  onClick={()=>fileRef.current.click()   }   className=" w-20 h-20 object-cover   rounded-full cursor-pointer"   alt="profile-pic" />           
         </div>
         <div  className="flex flex-col items-center max-w-40 mx-auto gap-2 mt-4">
             { isUploading &&  <progress   className="rounded-lg w-45 h-2"   max="100"  value={progress}  />}
             {isUploading && <p className="text-green-600 text-[0.82rem]"   >Uploading {progress === 100 ? "Completed": ""}{progress}%</p>}
             {imageError && <p  className="text-red-600"  >{imageError}</p>}
             {currentUser.message.charAt(0)==="u" ? <p     className="text-green-600"  >{currentUser.message}</p> :
              error? <p    className="text-red-600"  >{error}</p>: null  }
         </div>
         <form     onSubmit={handleSubmit}  className="flex flex-col p-3 gap-4 max-w-lg mx-auto ">
              <input  onChange={handleFileChange}     type="file" ref={fileRef} hidden accept="image/*"  />    
              <input  defaultValue={currentUser.rest?.username}   type="text"   onChange={handleChange}  id="username"  className="border outline-none  bg-white  rounded-lg p-2"   />
              <input   defaultValue={currentUser.rest?.email}    onChange={handleChange}  id="email"  type="email"   className="border bg-white  outline-none  p-2 rounded-lg"  />     
              <input  type="password" onChange={handleChange} id="password"   placeholder="password" className="border bg-white  outline-none  p-1 h-10 rounded-lg"   />
              <button     className=" dark-blue p-2 cursor-pointer uppercase hover:opacity-90 rounded-lg text-white"  >{loading? "updating":"update"  }</button>
              <button  className="bg-green-600 p-2 text-white  rounded-lg  hover:opacity-90 uppercase"  >Create listings</button>
          </form>  
          <div className=" flex justify-between max-w-lg mx-auto px-4">
             <span  onClick={handleDelete}   className="text-red-700 text-sm hover:underline cursor-pointer"  >Delete account</span>
             <span className="text-red-700 text-sm hover:underline cursor-pointer"  >Sign out</span>
          </div>    
          <p  className="text-green-400 text-center mt-3 hover:underline cursor-pointer"  >Show listings</p>
    </div>
  )
}
