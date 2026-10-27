import express from "express";
import { createListingController, deleteController, getListingController, updateController } from "../Controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();


router.post("/create",verifyUser,createListingController);

router.delete("/delete/:id", verifyUser, deleteController)

router.post("/update/:id", verifyUser, updateController)

router.get("/getlisting/:id",  getListingController )
export default router;