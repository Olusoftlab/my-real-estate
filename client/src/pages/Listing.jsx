import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
                                
                                  <div  style={{background:`url(${url}) center no-repeat`,  height:"600px", backgroundSize:"cover"  }} >
                             


                                  </div>

                           </SwiperSlide>)
                      
                      
                      )}




                    </Swiper>
                 
                 
                 </>
               
             }

      </main>
  )
}

export default Listing
