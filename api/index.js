import express from "express";


const app=express();

app.get("/", (req,res)=>{

     res.send("hello");
})

app.listen(6000, ()=>{

     

     console.log("server running on port 6000");
})