import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { toggleLike } from "../controllers/like.controller.js";

const router = express.Router();
router.post("/posts/:postId/like", protectRoute, toggleLike);
export default router;