import express from "express";
import { googleController, signInController, signUpController } from "../Controllers/authContrllers.js";

const router=express.Router();

router.post("/sign-up", signUpController);
router.post("/sign-in",signInController);
router.post("/my-google", googleController);


export default router;