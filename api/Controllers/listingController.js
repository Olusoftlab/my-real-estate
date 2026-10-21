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
     
     await ListingModel.findByIdAndUpdate(req.params.id, {$set:{
           
          name:req.body.name,
          description:req.body.description,
          address:req.body.address,
          regularPrice:req.body.regularPrice,
          discountPrice:req.body.discountPrice,
          bathrooms:req.body.bathrooms,
          bedrooms:req.body.bedrooms,
          furnished:req.body.furnished,
          parking:req.body.parking,
          offer:req.body.offer,
          imageUrls:req.body.imageUrls
          
     }}  )
   
     console.log(parking);
    return res.status(200).json({message:"Successfully update list"})

  }catch(error){

     next(error);

  }


}
