import express from "express";
import { createListingController, deleteController, getListingController, updateController, getAllListing } from "../Controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();


router.post("/create",verifyUser,createListingController);

router.delete("/delete/:id", verifyUser, deleteController)

router.post("/update/:id", verifyUser, updateController)

router.get("/getlisting/:id",  getListingController )

router.get("/get",  getAllListing )
export default router;