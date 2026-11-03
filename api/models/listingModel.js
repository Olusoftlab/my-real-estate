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
       default:false
   }
,
   
   parking:{
      
        type:Boolean,
        default:false
   } 
 ,

   sale:{
      type:Boolean,
      default:false
   }
,
  rent:{
      type:Boolean,
      default:false
  } 
 ,  
   offer:{
       type:Boolean,
       default:false       
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
