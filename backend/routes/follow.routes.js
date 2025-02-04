import express from "express";
import { checkFollowing, toggleFollowUser } from "../controllers/follow.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute,toggleFollowUser);
router.get("/:receiverFollowingId", protectRoute,checkFollowing);
export default router;
