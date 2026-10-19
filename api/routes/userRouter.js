import express from "express";
import { deleteUserController, updateUserController, userListingController } from "../Controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();

router.get("/userlisting/:id", verifyUser, userListingController);
router.post("/update/:id",verifyUser, updateUserController)
router.delete("/delete/:id", verifyUser, deleteUserController)


export default router;