
function CreateListing() {
  return (
      <main  className="p-3 max-w-4xl mx-auto" >
           <h1  className="text-3xl font-semibold text-center my-7"  >Create a Listing</h1>
           <form className="flex flex-col sm:flex-row gap-3" >
             
                <div className="flex flex-col gap-4 flex-1">

                     <input  id="name" type="text" placeholder="Name" required  maxLength={"62"} minLength={"10"}  className="border rounded-lg p-3" />
                     <textarea  id="description" required type="text" placeholder="Description" className="border rounded-lg p-3" />
                     <input  id="address" type="text" placeholder="Address" required  className="border rounded-lg p-3" />
                     <div className="flex gap-5 flex-wrap">
                          <div className="flex gap-2items-center "> 
                               <input type="checkbox" id="sale" className="w-5"  />
                               <span >Sell</span>
                          </div>

                          <div className="flex gap-2   items-center "> 
                               <input type="checkbox" id="rent" className="w-5"  />
                               <span >Rent</span>
                          </div>

                          <div className="flex gap-2 items-center "> 
                               <input type="checkbox" id="parking" className="w-5"  />
                               <span >Parking spot</span>
                          </div>

                          <div className="flex gap-2 items-center "> 
                               <input type="checkbox" id="furnished" className="w-5"  />
                               <span >Furnished</span>
                          </div>

                          <div className="flex gap-2 items-center"> 
                               <input type="checkbox" id="offer" className="w-5"  />
                               <span >Offer</span>
                          </div>

                     </div>
                     
                     <div className="flex gap-5 flex-wrap ">
                              <div className="flex gap-2 items-center">
                                  <input type="number" min="1" max="10" required id="bathrooms"  className="border rounded-lg border-gray-300  p-1" />
                                  <span>Baths</span>
                              </div> 

                              <div className="flex gap-2 items-center">
                                  <input type="number" id="bedrooms"  required   min="1" max="10"  className="border rounded-lg p-1 border-gray-300 " />
                                  <span>Beds</span>
                              </div> 

                              <div className="flex gap-2 items-center">
                                  <input type="number" id="bedrooms"  required   min="1" max="10"  className=" rounded-lg border p-1 border-gray-300 " />
                                  <div className="flex flex-col items-center ">
                                      <p>Regular price</p>
                                      <span className="text-xs" >$/month</span>
                                  </div>
                              </div> 
                              

                              
                              <div className="flex gap-2 items-center">
                                  <input type="number" id="bedrooms"  required   min="1" max="10"  className=" rounded-lg border p-1 border-gray-300 " />
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
                         <input  className="p-3 w-full border-gray-300 border rounded"   type="file" multiple accept="image/*" id="files"  />
                         <button className="p-3  cursor-pointer  text-green-700 border border-green-700 disabled:opacity-80  uppercase hover:shadow-lg rounded"  >Upload</button>
                    </div>
                    
                    <button className="p-3 cursor-pointer  bg-slate-700 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"  >Create Listing</button>
                </div>
               
              
           </form>
 


        
      </main>
  )
}

export default CreateListing
