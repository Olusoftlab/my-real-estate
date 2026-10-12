import express from "express";
import { createListingController } from "../Controllers/createListingController.js";


const router=express.Router();


router.post("/create",createListingController);

export default router;