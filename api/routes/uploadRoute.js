import { createUploadthing } from "uploadthing/express";

const f=createUploadthing();

export const uploadRouter={

   imageUploader:f({image:{

      maxFileSize:"4MB", maxFileCount:1

   }}).onUploadComplete(async({file})=>{

        console.log("file successfully uploaded", file.ufsUrl) 

   })

}