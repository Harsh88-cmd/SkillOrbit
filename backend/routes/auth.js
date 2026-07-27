import express from "express";
import {register,login,logout, updateProfile,getMe,updateProfile2} from "../controllers/authController.js";
import protectRoute from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register",register);

router.post("/login",login);

router.post("/logout",logout);
router.get("/me", protectRoute, getMe);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

router.put("/update-profile2", protectRoute, updateProfile2);


export default router;