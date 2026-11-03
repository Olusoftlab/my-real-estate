import ListingModel from "../models/listingModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListingController=async(req, res, next)=>{
 
    

      try {
        
          const listing=await ListingModel.create(req.body);
          return res.status(201).json(listing)

      } catch (error) {

          next(error);

      }
  
}


export const deleteController=async (req,res,next)=>{
    const listing=await ListingModel.findById(req.params.id)

    if (!listing)return next(errorHandler(404, "listing not found"))
 
    if (req.user.id !== listing.userRef)return next(errorHandler(401, "not authorised to delete another user listing"))
    
    try{
         
         await ListingModel.findByIdAndDelete(req.params.id)
         return res.status(200).json({message:"Successfully delted the listing"})    
    }catch(error){
 
        next(error) 

    }    


}

export const updateController=async (req,res,next)=>{

  const {parking}=req.body

  const findListing=await ListingModel.findById(req.params.id)
 
  if (!findListing)return next(errorHandler(404, "listing not found"))
 
  if (req.user.id !== findListing.userRef)return next(errorHandler(401, "unauthorised to update other user listing"));

  try{
     
     const updatedList=await ListingModel.findByIdAndUpdate(req.params.id, {$set: req.body}  )
   
    return res.status(200).json(updatedList)

  }catch(error){

     next(error);

  }


}


export const getListingController=async (req,res,next)=>{

    try {
      
         const listing=await ListingModel.findById(req.params.id)
         
         if(!listing)return next(errorHandler(404, "listing not found"))

        return res.status(200).json(listing)    


    } catch (error) {
        
        next(error)
    } 

}

export const getAllListing=async (req,res, next)=>{

   try{

       const limit=parseInt(req.query.limit) || 9
       const startIndex=parseInt(req.query.startIndex) || 0

    let filter={}

       let offer=req.query.offer

       if (offer === "true")filter.offer=true 



       let furnished=req.query.furnished

       if (furnished === "true")filter.furnished=true

      let parking=req.query.parking

      if (parking === "true")filter.parking=true


     let rent=req.query.rent

     if (rent === "true")filter.rent=true

 
    let sale=req.query.sale
    
    if (sale === "true")filter.sale=true 
 

   const searchTerm=req.query.searchTerm || ""

   const sort=req.query.sort || "createdAt"

   const order=req.query.order || "desc"

  
   if (searchTerm){
      filter.name={$regex:searchTerm, $options:"i"}
   }

   const listings=await ListingModel.find(filter).sort({[sort]: order}).limit(limit).skip(startIndex)


  return res.status(200).json(listings)



   }catch(error){
  
      next(error)

   }


}