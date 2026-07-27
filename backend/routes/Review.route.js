import express from "express";
import { createReview, deleteReview, getUserReview } from "../controllers/review.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createReview", protectRoute, createReview);
router.get("/user/:userId", protectRoute, getUserReview);
router.delete("/deleteReview/:reviewId",protectRoute,deleteReview);

export default router;