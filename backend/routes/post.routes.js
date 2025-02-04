import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsByUserId,
  updatePost,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:userId", getPostsByUserId);
router.post("/create", createPost);
router.put("/update", updatePost);
router.delete("/delete/:postId", deletePost);

export default router;
