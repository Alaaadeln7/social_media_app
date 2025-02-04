import User from "../models/user.model.js";

export const toggleFollowUser = async (req, res) => {
  try {
    const { receiverFollowingId } = req.body;
    const user = req.user;
    const receiverFollowing = await User.findById(receiverFollowingId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!receiverFollowing) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const isFollowing = receiverFollowing.followers.includes(user._id);

    if (isFollowing) {
      await receiverFollowing.updateOne({ $pull: { followers: user._id } });
      await user.updateOne({ $pull: { following: receiverFollowingId } });
      return res.status(200).json({ message: "Unfollowed successfully", follow: false });
    } else {
      await receiverFollowing.updateOne({ $push: { followers: user._id } });
      await user.updateOne({ $push: { following: receiverFollowingId } });
      return res.status(200).json({ message: "Followed successfully", follow: true });
    }
  } catch (error) {
    console.error(`Error in toggleFollowUser: ${error}`);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user or receiverFollowingId" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const checkFollowing = async (req, res) => {
  try {
    const {receiverFollowingId} = req.params;
    const user = req.user;
    const receiverFollowing = await User.findById(receiverFollowingId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!receiverFollowing) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    const isFollowing = receiverFollowing.followers.includes(user._id);
    res.status(200).json({ following: isFollowing });
  } catch (error) {
    console.error(`Error in checkFollowing: ${error}`);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user or receiverFollowingId" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};