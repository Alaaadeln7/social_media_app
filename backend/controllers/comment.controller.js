import { SUCCESS } from "../config/statusText.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const addComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    if (!content || !postId || !userId) {
      return res
        .status(400)
        .json({ error: "Content, postId, and author are required." });
    }

    const comment = new Comment({ content, postId, userId });
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    if (!commentId) {
      return res.status(400).json({ error: "Comment ID is required." });
    }
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (deleteComment) {
      return res
        .status(200)
        .json({ status: SUCCESS, message: "Comment deleted" });
    } else {
      return res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
export const updateComment = async (req, res) => {
  const { commentId, content } = req.body;
  try {
    if (!commentId || !content) {
      return res
        .status(400)
        .json({ error: "Comment ID and content are required." });
    }
    const updateComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (updateComment) {
      return res.status(200).json({ status: SUCCESS, data: updateComment });
    } else {
      return res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
export const getCommentstoPost = async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ error: "Post ID is required." });
  }
  try {
    const comments = await Comment.find({ postId });
    if (comments) {
      return res.status(200).json({ status: SUCCESS, data: comments });
    } else {
      return res.status(404).json({ error: "Comments not found." });
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
