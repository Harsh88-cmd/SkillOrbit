import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { createComment, deleteComment, getComment, updateComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/posts/:postId/createComments", protectRoute, createComment);
router.get("/posts/:postId/getComments", protectRoute, getComment);
router.delete("/posts/:postId/comments/:id", protectRoute, deleteComment);
router.put("/posts/:postId/comments/:id",protectRoute,updateComment);

export default router;