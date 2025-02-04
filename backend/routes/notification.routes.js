import express from "express";
import {
  getNotifications,
  updateNotificationStatus,
  createNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", createNotification);

router.get("/:userId", getNotifications);

router.put("/:notificationId", updateNotificationStatus);

export default router;
