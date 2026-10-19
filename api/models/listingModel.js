import mongoose from "mongoose";
                    
const listingSchema=new mongoose.Schema({

      name:{
          type:String,
          required:true
      },

      description:{
          type:String,
          required:true
      }
,
     
     address:{
        
          type:String,
          required:true
     } 
,
     regularPrice:{
         type:Number,
         required:true
     }
,
    discountPrice:{
       type:Number,
    
    }

,
    bathrooms:{
        type:Number,
        required:true
    }
,
   
   bedrooms:{
        
        type:Number,
        required:true
       
   } 
,

   furnished:{
       type:Boolean,
    
   }
,
   
   parking:{
      
        type:Boolean

   }
 ,

   sale:{
      type:Boolean,
    
   }
,
  rent:{
      type:Boolean,
      
  } 
 ,  
   offer:{
       type:Boolean,
       
   }
 ,

   imageUrls:{
      type:Array,
   } 
,

  userRef:{
     
     type:String,
     required:true
     
  } 

}, {timestamps:true} )

const ListingModel=mongoose.model("Listing", listingSchema);

export default ListingModel
