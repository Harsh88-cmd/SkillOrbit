import express from "express";
import { getAllStudents, getUserById } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/search", getAllStudents);
router.get("/:id", getUserById);

export default router;