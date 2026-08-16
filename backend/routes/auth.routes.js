import express from "express";
import { signUp } from "../controllers/authController";

const router = express.Routes();

router.post("/signup", signUp);

export default router;
