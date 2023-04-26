import { Router } from "express";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updateById,
} from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/", checkAuth, createPost);

router.get("/getAll", getAll);

router.get("/:id", getById);

router.put("/:id", checkAuth, updateById);

router.get("/user/me", checkAuth, getMyPosts);

router.delete("/:id", checkAuth, removePost);

export default router;
