import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const [listArr, setLitArr]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)     
  const [searchParams]=useSearchParams()
  const navigate=useNavigate()   
  const [sideBarData, setSideBarData]=useState({

      searchTerm:"",
      offer:false,
      rent:false,
      sale:false,
      parking:false,
      furnished:false,
      sort:"created_at",
      order:"desc"
  })
    





  const handleChange=(e)=>{

      if (e.target.name === "searchTerm"){

             setSideBarData({...sideBarData, searchTerm:e.target.value })
      }


      if (e.target.name === "sale" || e.target.name === "offer" || e.target.name === "rent" || e.target.name === "parking" || e.target.name === "furnished"){
          
           setSideBarData({...sideBarData, [e.target.name]:e.target.checked || e.target.checked ==="true"? true:false })

      }


    if (e.target.id === "sort_order"){

          const sort=e.target.value.split("_").includes("at")? "created_at" : "regularPrice"
          
          const order=e.target.value.split("_").includes("at")?  e.target.value.split("_")[2] :  e.target.value.split("_")[1]

          setSideBarData({...sideBarData, sort, order })

    }

  }


      const handleSubmit=(e)=>{

         e.preventDefault()
         
          searchParams.set("searchTerm", sideBarData.searchTerm)
          searchParams.set("offer", sideBarData.offer)
          searchParams.set("rent", sideBarData.rent)
          searchParams.set("sale", sideBarData.sale)
          searchParams.set("parking", sideBarData.parking)
          searchParams.set("sort", sideBarData.sort)
          searchParams.set("order", sideBarData.order) 
          searchParams.set("furnished",sideBarData.furnished )
          const searchQuery=searchParams.toString() 
         
          navigate(`/search?${searchQuery}`)


      }

      useEffect(()=>{

          const searchTerm=searchParams.get("searchTerm")
          const offer=searchParams.get("offer")
          const rent=searchParams.get("rent")
          const sale= searchParams.get("sale")
          const parking=searchParams.get("parking")
          const furnished=searchParams.get("furnished")
          const sort=searchParams.get("sort")
          const order=searchParams.get("order")
         
       if (searchTerm || offer || rent || sale

          || parking || furnished || sort || order
       ){

            setSideBarData({...sideBarData, searchTerm:searchTerm || "",

                    offer:offer === "true"? true:false,
                    sale:sale === "true"? true :false,
                    parking: parking === "true"? true:false,
                    furnished:furnished === "true"?true:false,
                    sort:sort || "created_at",
                    order:order || "desc",
                    rent:rent === "true"?true:false

            })

       }

      
       const fetchListing=async()=>{
             setLoading(true)
             const searchQuery=searchParams.toString()  
             

            try {
               
                 const getList=await fetch(`/api/listing/get?${searchQuery}`)
                 const data=await getList.json()
                 
                 if (data.success === false){
                      setError(true)              
                      setLoading(false)
                      return;
                 }
 

               console.log(data)  
               setListArr(data)
               setLoading(false)
     
            } catch (error) {
                  
                 setError(true)
            }

       }

 
      fetchListing()


      }, [searchParams])



     



  return (
        
        <main>

             <div className="p-8 flex gap-4 flex-col sm:flex-row items-start" >

                  <div className="flex-1 " >

                        <form   onSubmit={handleSubmit}  className="flex flex-col gap-2" >
                               <div className="flex gap-1 items-center my-3">                              
                                    <label  className="whitespace-nowrap font-semibold"   htmlFor="search-term"  >Search Term</label>
                                    <input   onChange={handleChange} value={sideBarData.searchTerm}    placeholder="Search...."   className="border p-2 outline-none bg-white"    type="text" name="searchTerm" id="searchTerm"  />                
                               </div>
                               
                               <div className="flex flex-col gap-6">

                                        <div className="flex gap-2 flex-wrap " >
                                                    <div  className="flex gap-1 items-center" >                
                                                        <label   className="whitespace-nowrap font-semibold"  htmlFor="sale"  >Sale</label>      
                                                        <input  checked={sideBarData.sale}      onChange={handleChange}    type="checkbox" id="sale" name="sale"  />
                                                    </div>                             
                                                    <div className="flex gap-1 items-center" >                
                                                        <label className="whitespace-nowrap font-semibold" htmlFor="rent"  >Rent</label>      
                                                        <input  checked={sideBarData.rent}    onChange={handleChange}    type="checkbox" id="rent" name="rent"  />
                                                    </div>                             
                                                    
                                                    <div  className="flex gap-1 items-center" >                
                                                        <label  className="whitespace-nowrap font-semibold" htmlFor="offer"  >Offer</label>      
                                                        <input   checked={sideBarData.offer}   onChange={handleChange}  type="checkbox" id="offer" name="offer"  />
                                                    </div>  
                                                    
                                                    <div  className="flex gap-1" >
                                                            <span  className="font-semibold"  >Amenities:</span>
                                                            <div className="flex gap-1 items-center">
                                                                 <label  className="whitespace-nowrap font-semibold"  htmlFor="parking"  >Parking</label>      
                                                                 <input   checked={sideBarData.parking}    onChange={handleChange}   type="checkbox" id="parking" name="parking"  />
                                                            </div>

                                                            <div className="flex gap-1 items-center">
                                                                 <label  className="whitespace-nowrap font-semibold"  htmlFor="furnished"  >Furnished</label>      
                                                                 <input  checked={sideBarData.furnished}   onChange={handleChange}  type="checkbox" id="furnished" name="furnished"  />
                                                            </div>                    
                                                            
                                                    </div>  
                                                    
                                         </div> 

                                         <div className="flex gap-1" >
                                              <label className="font-semibold whitespace-nowrap"   htmlFor="sort_order" >Sort:</label>
                                              <select  defaultValue={"created_at_desc"} onChange={handleChange}   className="border w-1/2 bg-white outline-none"  id="sort_order"   name="sort_order" >
                                                   <option value="created_at_desc"   >Latest</option>
                                                   <option  value="regularPrice_asc" >Price Low to High</option>
                                                   <option value="regularPrice_desc"  >Price High to Low</option>
                                                   <option  value="created_at_asc"  >Oldest</option>
                                              </select>

                                         </div>   
                                        <button  className="p-2 cursor-pointer uppercase text-white hover:opacity-95 rounded-lg bg-slate-700  "  >Search</button>
                               </div>

                        </form>

                  </div>


                  <div className="flex-3 p-5" >
                      
                       <h1  className="font-semibold text-4xl text-slate-700 "  >Listing result....</h1>
                       <div className= "flex gap-4 flex-wrap"    >

                            
                        
                       </div>

                  </div>

             </div>


        </main>

  )
}

export default Search
