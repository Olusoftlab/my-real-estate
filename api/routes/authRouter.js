import express from "express";
import { signUpController } from "../Controllers/authContrllers.js";

const router=express.Router();

router.post("/sign-up", signUpController);

export default router;