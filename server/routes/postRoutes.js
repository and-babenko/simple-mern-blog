import { Router } from "express";
import multer from "multer";

import {
  createPost,
  getAllPosts,
  getOnePost,
  getPostsByUser,
  removePost,
  updatePost,
  getPopularPosts,
  uploadImage,
} from "../controllers/postControllers.js";

import { checkAuth } from "../utils/checkAuth.js";

import handleValidation, {
  createPostValidation,
} from "../utils/validations.js";

const router = Router();

// Uploads
const postImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/postImages/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const postImageUpload = multer({ storage: postImageStorage });

// Routes
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.post("/", checkAuth, createPostValidation, handleValidation, createPost);
router.patch("/:id", checkAuth, updatePost);
router.delete("/:id", checkAuth, removePost);

router.post(
  "/image/upload",
  checkAuth,
  postImageUpload.single("image"),
  uploadImage
);

router.get("/popular/:number", getPopularPosts);
router.get("/user/me", checkAuth, getPostsByUser);

export default router;
