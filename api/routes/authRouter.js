import express from "express";
import { googleController, signInController, signOutController, signUpController } from "../Controllers/authContrllers.js";
import { verifyUser } from "../utils/verifyUser.js";
const router=express.Router();

router.post("/sign-up", signUpController);
router.post("/sign-in",signInController);
router.post("/my-google", googleController);
router.get("/signout/:id", verifyUser, signOutController)

export default router;