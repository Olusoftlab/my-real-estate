import express from "express";
import { deleteUserController, testApi, updateUserController } from "../Controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();

router.get("/test",testApi);
router.post("/update/:id",verifyUser, updateUserController)
router.delete("/delete/:id", verifyUser, deleteUserController)

export default router;