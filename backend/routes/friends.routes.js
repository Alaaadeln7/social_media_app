// routes/friendRoutes.js
import express from "express";
import {
  sendFriendRequest,
  getFriends,
  updateFriendStatus,
  removeFriend,
  // checkFriendRequest,
  getFriendRequests,
  getSuggestions,
} from "../controllers/friends.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/addFriend", protectRoute, sendFriendRequest);
router.get("/", protectRoute, getFriends);
router.put("/updateStatus", protectRoute, updateFriendStatus);
router.delete("/:friendId", protectRoute, removeFriend);
router.get("/getFriendRequests", protectRoute, getFriendRequests);
router.get("/getSuggestions", protectRoute, getSuggestions);
export default router;
