
function Search() {
  return (
        
        <main>

             <div className="p-8 flex gap-4 flex-col sm:flex-row items-start" >

                  <div className="flex-1 " >

                        <form className="flex flex-col gap-2" >
                               <div className="flex gap-1 items-center my-3">                              
                                    <label  htmlFor="search-term"  >Search Term</label>
                                    <input  className="border p-1 outline-none bg-white"    type="text" name="search-term" id="search-term"  />                
                               </div>
                               
                               <div className="flex flex-col gap-6">

                                        <div className="flex gap-2 flex-wrap " >
                                                    <div  className="flex gap-1 items-center" >                
                                                        <label htmlFor="sale"  >Sale</label>      
                                                        <input  type="checkbox" id="rent" name="rent"  />
                                                    </div>                             
                                                    <div className="flex gap-1 items-center" >                
                                                        <label htmlFor="rent"  >Rent</label>      
                                                        <input  type="checkbox" id="rent" name="rent"  />
                                                    </div>                             
                                                    
                                                    <div  className="flex gap-1 items-center" >                
                                                        <label htmlFor="offer"  >Offer</label>      
                                                        <input  type="checkbox" id="sale" name="sale"  />
                                                    </div>  
                                                    
                                                    <div  className="flex gap-1" >
                                                            <span>Amenities:</span>
                                                            <div className="flex gap-1 items-center">
                                                                 <label htmlFor="parking"  >Parking</label>      
                                                                 <input  type="checkbox" id="parking" name="parking"  />
                                                            </div>

                                                            <div className="flex gap-1 items-center">
                                                                 <label htmlFor="furnished"  >Furnished</label>      
                                                                 <input  type="checkbox" id="furnished" name="furnished"  />
                                                            </div>                    
                                                            
                                                    </div>  
                                                    
                                         </div> 

                                         <div className="flex gap-1" >
                                              <label htmlFor="sort" >Sort:</label>
                                              <select  className="border w-1/2 bg-white outline-none"  id="sort"   name="sort" >
                                                   <option value="latest"   >Latst</option>
                                                   <option  value="low to high" >Low to High</option>
                                                   <option value="high to low"  >High to Low</option>
                                              </select>

                                         </div>   
                                        <button  className="p-2 cursor-pointer uppercase text-white hover:opacity-95 rounded-lg bg-slate-700  "  >Search</button>
                               </div>

                        </form>

                  </div>


                  <div className="flex-3 p-5" >
                      
                       <h1  className="font-semi-bold text-4xl"  >Listing result....</h1>

                  </div>

             </div>


        </main>

  )
}

export default Search
