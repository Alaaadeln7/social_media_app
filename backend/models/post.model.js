import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "Share" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
