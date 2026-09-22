import express from "express";

import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/createpost");

export default router;
