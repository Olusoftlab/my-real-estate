import express from "express";
import { testApi } from "../Controllers/userController.js";

const router=express.Router();

router.get("/test",testApi);

export default router;