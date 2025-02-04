import express from "express";
const router = express.Router();
import { getMessages, sendMessage } from "../controllers/chat.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.get("/:receiverId",protectRoute, getMessages);
router.post("/send/:receiverId",protectRoute, sendMessage);

export default router;
