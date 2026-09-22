import express from "express";

import protectRoute from "../middlewares/protectRoute.js";
import { createPost, getPosts, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/createpost", protectRoute, createPost);
router.get("/getposts", protectRoute, getPosts);
router.put("/:id", protectRoute, updatePost);
export default router;
