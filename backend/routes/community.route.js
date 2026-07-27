import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.get("/getPost",protectRoute,getPosts);
router.delete("/posts/:id",protectRoute,deletePost);
router.put("/posts/:id",protectRoute,updatePost);
router.get("/getSinglePost/:id",protectRoute,getSinglePost);


export default router;