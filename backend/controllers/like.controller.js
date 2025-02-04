import Post from "../models/post.model.js";
import { SUCCESS } from "../config/statusText.js";
import Like from "../models/like.model.js";

export const toggleLike = async (req, res) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required." });
  }

  try {
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      const removeLike = await Like.findOneAndDelete({ userId, postId });
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: removeLike._id },
      });
      return res
        .status(200)
        .json({ message: "Like removed successfully.", like: false });
    } else {
      const like = new Like({ userId, postId });

      const newLike = await like.save();
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: newLike._id },
      });
      return res
        .status(201)
        .json({ status: SUCCESS, message: "like added", like: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
