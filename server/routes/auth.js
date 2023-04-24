import { Router } from "express";
import { getUser, login, register } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getuser", checkAuth, getUser);

export default router;
