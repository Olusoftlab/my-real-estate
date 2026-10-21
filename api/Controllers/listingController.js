import ListingModel from "../models/listingModel.js";
import {errorHandler} from "../utils/errorHandler.js";

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