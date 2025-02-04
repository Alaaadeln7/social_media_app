import { ERROR } from "../config/statusText.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";

const validatePostData = (data) => {
  const { content, author } = data;
  if (!content || !author) {
    return "Content and author are required.";
  }
  return null;
};

export const createPost = async (req, res) => {
  const validationError = validatePostData(req.body);
  const { content, author, image } = req.body;
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
      imageUrl = uploadResponse.secure_url;
    }
    const newPost = new Post({ content, author, image: imageUrl });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .populate("author", "fullName avatar")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "fullName avatar" },
      })
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit) 
      .exec();
  return res.status(200).json({posts , hasMore: page * limit < totalPosts});
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getPostsByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({ error: "User not found." });
    }

    const posts = await Post.find({ author: userId })
      .populate("likes", "userId")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "fullName avatar" },
      });
    return res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updatePost = async (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content) {
    return res.status(400).json({ error: "Post ID and content are required." });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );
    if (updatedPost) {
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json({ error: "Post not found." });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (deletedPost) {
      return res.status(200).json({ message: "Post deleted successfully." });
    } else {
      return res.status(404).json({ error: "Post not found." });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
