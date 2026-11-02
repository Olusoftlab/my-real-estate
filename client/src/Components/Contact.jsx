import { useEffect, useState } from "react"

function Contact({listing}) {

    const [userData, setUserData]=useState(null)
    const [message,setMessage]=useState("")

    const handleChange=(e)=>{

        setMessage(e.target.value)

    }

    useEffect(()=>{
     
       const getUser=async ()=>{
          try {
             
             const user=await fetch(`/api/user/getuser/${listing.userRef}`)
             const data=await user.json()
             setUserData(data)  
          } catch (error) {
             console.log(error)
          }

       }     
 
        getUser()
    },[listing.userRef])


    return (
    <div>
         {

            userData && <div className="flex flex-col gap-2">
                
                 <p>Contact: <span  className="font-semibold w-[50%] " >{userData?.username}</span> for <span className="font-semibold" >{listing.name}</span></p>
                 <textarea  className="border w-full p-2"   value={message} id="message" onChange={handleChange}  rows={3}  />
                 <a  href={`mailto:${userData?.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}  className="cursor-pointer rounded-lg uppercase hover:opacity-95  bg-slate-700 w-full  p-3 text-white text-center text-sm sm "  to={`mailto:${userData?.email} subject=Regarding ${listing.name}&body=${message}`}>
                     Send message
                 </a>
            </div>
         }
         
    
    </div>
  )
}

export default Contact
