import Notification from "../models/notification.model.js";

export const createNotification = async (userId, message) => {
  try {
    const newNotification = new Notification({
      userId,
      message,
    });
    await newNotification.save();
  } catch (err) {
    console.error(`Error creating notification: ${err}`);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({
      timestamp: -1,
    });
    res.json(notifications);
  } catch (err) {
    console.error(`Error fetching notifications: ${err}`);
    res.status(500).send("Error fetching notifications");
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification) return res.status(404).send("Notification not found");

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(`Error updating notification: ${err}`);
    res.status(500).send("Error updating notification");
  }
};
