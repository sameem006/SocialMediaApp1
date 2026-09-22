import express from "express";

import protectRoute from "../middlewares/protectRoute.js";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/createpost", protectRoute, createPost);
router.get("/getposts", protectRoute, getPosts);

export default router;
