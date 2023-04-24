import { Router } from "express";
import { createPost } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/", checkAuth, createPost);

export default router;
