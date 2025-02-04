import express from "express";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", addComment);
router.put("/update", updateComment);
router.delete("/delete/:commentId", deleteComment);

export default router;
