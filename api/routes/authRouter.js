import express from "express";
import { signInController, signUpController } from "../Controllers/authContrllers.js";

const router=express.Router();

router.post("/sign-up", signUpController);
router.post("/sign-in",signInController);

export default router;