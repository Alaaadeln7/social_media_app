import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectionDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/post.routes.js";
import commentsRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import followRoutes from "./routes/follow.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import friendsRoutes from "./routes/friends.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from"./config/socket.js";
config();
const port = process.env.PORT || 8080;
const frontend = "http://localhost:5173";
app.use(
  cors({
    origin: frontend,
    credentials: true,
  })
);


app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(cookieParser());
connectionDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/noties", notificationRoutes);
app.use("/api/friends", friendsRoutes);








server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
