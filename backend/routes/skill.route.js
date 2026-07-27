import express from "express";
import {addTeachSkill,addLearnSkill,getSkills,deleteTeachSkill,deleteLearnSkill} from "../controllers/myskills.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/teach",protectRoute,addTeachSkill);

router.post("/learn",protectRoute,addLearnSkill);

router.get("/get",protectRoute,getSkills);

router.delete("/teach",protectRoute,deleteTeachSkill);

router.delete("/learn",protectRoute,deleteLearnSkill);

export default router;