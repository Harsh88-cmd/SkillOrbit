import express from "express";
import protectRoute from "../middleware/auth.middleware.js"; // your existing auth guard
import { getMessages, sendMessage,getConversations} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;