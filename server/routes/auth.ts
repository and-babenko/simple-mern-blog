import { Router } from "express";
import { getUser, login, register } from "../controllers/auth";
import { checkAuth } from "../utils/checkAuth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getuser", checkAuth, getUser);

export default router;
