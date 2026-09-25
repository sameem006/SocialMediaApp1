import express from "express";
import { checkAuth, getMe, login, logout, signUp } from "../controllers/authController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
router.get("/check", protectRoute, checkAuth);
export default router;
