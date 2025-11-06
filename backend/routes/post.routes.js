import { Router } from "express";
import { applyValidations } from "../middlewares/validator.js";
import { createPost, getAllPosts, getPostById, createComment, toggleLike, deletePost } from "../controllers/post.controllers.js";
import { createPostValidator, createCommentValidator, validatePostById } from "../middlewares/validations/post.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const postRoutes = Router();
postRoutes.post("/posts", authMiddleware, createPostValidator, applyValidations, createPost);
postRoutes.get("/posts", getAllPosts);
postRoutes.get("/posts/:id", validatePostById, applyValidations, getPostById);
postRoutes.post("/posts/:id/comments", authMiddleware, validatePostById, createCommentValidator, applyValidations, createComment);
postRoutes.put("/posts/:id/toggle-like", authMiddleware, validatePostById, applyValidations, toggleLike);
postRoutes.delete("/posts/:id", validatePostById, authMiddleware, applyValidations, deletePost);