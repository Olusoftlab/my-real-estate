import express from "express";
import { createListingController, deleteController } from "../Controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();


router.post("/create",verifyUser,createListingController);

router.delete("/delete/:id", verifyUser, deleteController)

export default router;