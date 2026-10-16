import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUploadThing } from "../uploading";

function CreateListing() {

      const {currentUser}=useSelector((state)=> state.user);
      const [files, setFiles]=useState([])
      const [uploadImage, setUploadImage]=useState(null);
      const [errorUpload,setErrorUpload]=useState(false)
      const [formData, setFormData]=useState({imageUrls:[],  userRef: currentUser.rest.username })
      const [fileNumberError, setFileNumberError]=useState(false)
      const [loading,setLoading]=useState(false)
      const [listError,setListError]=useState(null)     
      const [listPayload, setListPayload]=useState(null)
      const navigate=useNavigate()

      const {startUpload, isUploading}=useUploadThing("imageUploader", {

           onUploadProgress:(p)=>{
               
                console.log("upload is " + p + " % done" );

           },
           
           onClientUploadComplete:(res)=>{

                setUploadImage(res[0].ufsUrl);
           },

           onUploadError:(e)=>{

                setErrorUpload(true);
           }


      })

        
      const handleDeleteImage=(e)=>{
               
           if (e.target){
    
                const filteredImage=formData.imageUrls.filter(item=>parseInt(e.target.id) !== formData.imageUrls.indexOf(item)   )
                setFormData({...formData, imageUrls:filteredImage});
           }

      }




      const handleSubmitImage= async ()=>{
            
          if (files.length >0 && files.length < 7){

                 const resImage=[]

              for (let i=0; i < files.length; i++){

                    resImage.push(await callUploadedImage(files[i]));

              }
           
               setFormData({...formData, imageUrls:formData.imageUrls.concat(resImage)})
               setErrorUpload(true);
               setFileNumberError(false) 
          }else{

              setFileNumberError(true)

          }
      
          
      }

    const callUploadedImage=async (uploadedFile)=>{

          try{

               const res=await startUpload([uploadedFile]) 
               
               if (!res) return 

               return res[0].ufsUrl;

          }catch(error){
 
               console.error(error.message);
          }
     
    }

     const handleUncheck=(e)=>{

          setFormData({...formData, [e.target.id]:e.target.value  })
     }

    const handleCheck=(e)=>{

       setFormData({...formData, [e.target.id]:e.target.checked? true:false  })
    }

    const handleUncheckNum=(e)=>{

         setFormData({...formData, [e.target.id]:parseInt(e.target.value)})  
      
    }


 


    const handleCreateList=async (e)=>{

       e.preventDefault();
     


        try{
           
          setLoading(true)
           const res=await fetch("/api/listing/create", 

                 {
                    method:"POST",
                    credentials:"include",
                    headers:{
                       "Content-Type":"application/json",
                    },
                   
                    body:JSON.stringify(formData)

                 }
           )

           const data=await res.json()

            if (data.success === false){

                 setListError(data.message)
                 return;
            }

             console.log(formData);
            setListPayload(data);
            navigate(`/listing//${data._id}`)  
        }catch(error){
           
            console.log(error)

        }finally{
        
            setLoading(false)             
        
        }

    }











  return (
      <main  className="p-3 max-w-4xl mx-auto" >
           <h1  className="text-3xl font-semibold text-center my-7"  >Create a Listing</h1>
           <form className="flex flex-col sm:flex-row gap-3" >
             
                <div className="flex flex-col gap-4 flex-1">

                     <input  id="name"   onChange={handleUncheck}  type="text" placeholder="Name" required  maxLength={"62"} minLength={"10"}  className="border rounded-lg p-3" />
                     <textarea  id="description"   onChange={handleUncheck}  required type="text" placeholder="Description" className="border rounded-lg p-3" />
                     <input   onChange={handleUncheck}    id="address" type="text" placeholder="Address" required  className="border rounded-lg p-3" />
                     <div className="flex gap-5 flex-wrap">
                          <div className="flex gap-2 items-center "> 
                               <input   onChange={handleCheck}   type="checkbox" id="sale" className="w-5"  />
                               <span >Sale</span>
                          </div>

                          <div className="flex gap-2   items-center "> 
                               <input   onChange={handleCheck}   type="checkbox" id="rent" className="w-5"  />
                               <span >Rent</span>
                          </div>

                          <div className="flex gap-2 items-center "> 
                               <input  onChange={handleCheck}   type="checkbox" id="parking" className="w-5"  />
                               <span >Parking spot</span>
                          </div>

                          <div className="flex gap-2 items-center "> 
                               <input  onChange={handleCheck}  type="checkbox" id="furnished" className="w-5"  />
                               <span >Furnished</span>
                          </div>

                          <div className="flex gap-2 items-center"> 
                               <input  onChange={handleCheck}   type="checkbox" id="offer" className="w-5"  />
                               <span >Offer</span>
                          </div>

                     </div>
                     
                     <div className="flex gap-5 flex-wrap ">
                              <div className="flex gap-2 items-center">
                                  <input  onChange={handleUncheckNum}   type="number" min="1" max="10" required id="bathrooms"  className="border rounded-lg border-gray-300  p-1" />
                                  <span>Baths</span>
                              </div> 

                              <div className="flex gap-2 items-center">
                                  <input  onChange={handleUncheckNum}    type="number" id="bedrooms"  required   min="1" max="10"  className="border rounded-lg p-1 border-gray-300 " />
                                  <span>Beds</span>
                              </div> 

                              <div className="flex gap-2 items-center">
                                  <input  onChange={handleUncheckNum}    type="number" id="regularPrice"  required   min="1" max="10"  className=" rounded-lg border p-1 border-gray-300 " />
                                  <div className="flex flex-col items-center ">
                                      <p>Regular price</p>
                                      <span className="text-xs" >$/month</span>
                                  </div>
                              </div> 
                              

                              
                              <div className="flex gap-2 items-center">
                                  <input onChange={handleUncheckNum}   type="number" id="discountPrice"  required   min="1" max="10"  className=" rounded-lg border p-1 border-gray-300 " />
                                  <div className="flex flex-col items-center ">
                                      <p>Discounted price</p>
                                      <span className="text-xs" >$/month</span>
                                  </div>
                              </div>           
                     </div>

                </div> 
               
                <div  className=" flex flex-col  flex-1  gap-4">
                    <p  className="font-semibold"  >Images: 
                       <span  className="font-normal text-gray-700"  >The first image will be the cover max(6)</span>   
                    </p>
                    
                    <div  className="flex gap-4" >
                         <input onChange={(e)=>setFiles(e.target.files) }   className="p-3 w-full border-gray-300 border rounded"   type="file" multiple  accept="image/*" id="files"  />
                         <button  type="button" onClick={handleSubmitImage}  disabled={isUploading}   className="p-3  cursor-pointer    text-green-700 border border-green-700 disabled:opacity-80  uppercase hover:shadow-lg rounded"  >{isUploading? "uploading....": "upload"}</button>
                    </div>
                    <p className="text-sm text-red-500"  >{fileNumberError&& "You ca only upload 6 files" }</p>
                    
                    {
                      
                       formData.imageUrls.length > 0 && formData.imageUrls.map((url)=>(
                          
                           <div  className="flex items-center justify-between p-2" key={formData.imageUrls.indexOf(url)} >

                                <img  src={url}   className="w-20 h-20 object-cover rounded-lg"  alt="listing-image"    /> 
                                <div>
                                    <button id={`${formData.imageUrls.indexOf(url)}`}     onClick={handleDeleteImage}   className="border text-sm cursor-pointer hover:bg-red-700 hover:text-white  hover:opacity-90 rounded-lg uppercase text-red-700 p-1 px-2"  >delete</button> 
                                </div>
                           </div>

                       ))

                    }

                    <button   onClick={handleCreateList}  disabled={loading}  className="p-3 cursor-pointer  bg-slate-700 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"  >
                        
                         {loading? "Creating Listing...": "Create List"}
                    
                    </button>
                </div>
               
              
           </form>
 


        
      </main>
  )
}

export default CreateListing
