import { useEffect, useState } from 'react'
import { FaArrowRight, FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import SwiperCore from "swiper"
import "swiper/css/bundle"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


function Listing() {
    
    SwiperCore.use(Navigation);

    const {id}=useParams()

    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)

    useEffect(()=>{
       
        const fetchListing=async ()=>{
           
               try {
                        
                            
                              const res=await fetch(`/api/listing/getlisting/${id }`)
                              
                              const data=await res.json()
                              
                              if (data.success === false){
                                  setError(true)
                                 return;
                              }

                              setListing(data)
                              setError(false) 

                      } catch (error) {
                          setError(true)
                      }finally{
                          
                          setLoading(false)

                      }
 

        }

        fetchListing()
    }, [id])


    

  return (
      <main>
          
            {loading && <p  className='text-2xl text-center my-7 '   >Loading....</p>}

            {error && <p  className='text-3xl text-center my-7 text-red-600 ' >Error loading page</p>} 
          
             {
                 listing && !loading && !error && 

                 <>
                    <Swiper navigation  >

                              {listing.imageUrls.map((url) =>(
                                
                                <SwiperSlide  key={url}  >   
                                      
                                        <div  style={{background:`url(${url}) center no-repeat`,  position:"relative" ,   height:"550px", backgroundSize:"cover"  }} >
                                  

                                            <div  className='flex justify-end p-3 ' >
                                                <div  className="w-15 h-15 bg-white rounded-full ">
                                                     <Link     to={`/listing/${listing._id}`} >
                                                         <div className='flex justify-center p-5 ' >
                                                             <FaArrowRight  className='w-10' />  
                                                         </div>  
                                                     </Link>
                                                </div>
                                            </div>
                                        </div>
                                        
                                </SwiperSlide>)
                            
                            
                            )}

                    </Swiper>
                 </>
             }
        <div  className='max-w-4xl mx-40'>
                                
                     {listing && <h2  className="font-semibold mt-7 text-2xl p-3" >{listing.name}- $ {listing.regularPrice}/month</h2>}

                    {listing && <div  className="flex items-center  gap-2 px-2 mt-7" >
                        
                        <FaMapMarkerAlt  className="text-green-700"  />
                        <p>{listing.address}</p>
                        
                    </div>}
                    
                    <div  className='flex px-2 gap-2 mt-7 '>
                            
                            {listing && <p className='text-center text-white bg-red-700 px-15 rounded-md  py-1'  >{listing.sale? "sale":"rent" }</p>}
                            {listing?.offer && <p  className='text-center text-white bg-green-700 px-15 py-1 rounded-md'  >${+listing.regularPrice- (+listing.discountPrice)}</p>}

                    </div>
                    

                    {listing && <p className='px-2 mt-5 text-slate-700' ><b>Description</b>: {listing.description}</p>}

                    <ul  className="mt-5 px-2  text-green-900 text-sm font-semibold items-center flex flex-wrap flex gap-4 sm:gap-6">
                        
                        <li  className='flex items-center gap-1 whitespace-nowrap' >
                            <FaBed   className='text-xl' />
                            {listing && listing.bedrooms > 1 ? <span>{listing?.bedrooms}beds</span>: <span>{listing?.bedrooms}bed</span>  }
                        </li>

                        <li  className='flex items-center gap-1 whitespace-nowrap' >
                            <FaBath   className='text-xl' />
                            {listing && listing.bathrooms > 1 ? <span>{listing?.bathrooms}baths</span>: <span>{listing?.bathrooms}bath</span>  }
                        </li>          

                        <li  className='flex items-center gap-1 whitespace-nowrap' >
                            <FaParking   className='text-xl' />
                            {listing?.parking? "parking spot": "No parking"  }
                        </li>           

                        <li  className='flex items-center gap-1 whitespace-nowrap' >
                            <FaChair  className='text-xl' />
                            {listing?.furnished ? "furnished": "Not furnished"  }
                        </li>


                    </ul>

        </div>
      

      </main>
  )
}  

export default Listing
