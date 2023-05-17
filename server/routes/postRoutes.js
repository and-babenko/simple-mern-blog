import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getOnePost,
  getPostsByUser,
  removePost,
  updatePost,
  getPopularPosts,
} from "../controllers/postControllers.js";
import { checkAuth } from "../utils/checkAuth.js";
import handleValidation, {
  createPostValidation,
} from "../utils/validations.js";

const router = Router();

// router.get("/getAll", getAll);
// router.put("/:id", checkAuth, updatePost);

router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.post("/", checkAuth, createPostValidation, handleValidation, createPost);
router.patch("/:id", checkAuth, updatePost);
router.delete("/:id", checkAuth, removePost);

router.get("/popular/:number", getPopularPosts);
router.get("/user/me", checkAuth, getPostsByUser);

export default router;
