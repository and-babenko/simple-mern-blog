import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createComment, getCommentsByPosts } from "../controllers/commentControllers.js";

const router = new Router();

// TODO Редактирование комментов. Сделать.

router.post("/:id", checkAuth, createComment);

router.get("/post/:id", getCommentsByPosts);

export default router;
