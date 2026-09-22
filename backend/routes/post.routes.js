import express from "express";

import protectRoute from "../middlewares/protectRoute.js";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/createpost", protectRoute, createPost);
router.get("/getposts", protectRoute, getPosts);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);
export default router;
