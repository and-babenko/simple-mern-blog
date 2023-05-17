import { Router } from "express";
import { getUser, login, register } from "../controllers/authControllers.js";
import { checkAuth } from "../utils/checkAuth.js";
import handleValidation, {
  registrationValidation,
  loginValidation,
} from "../utils/validations.js";

const router = Router();

router.post("/register", registrationValidation, handleValidation, register);

router.post("/login", loginValidation, handleValidation, login);

router.get("/getuser", checkAuth, getUser);

export default router;
