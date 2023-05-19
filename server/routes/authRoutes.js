import { Router } from "express";
import multer from "multer";

import {
  getUser,
  login,
  register,
  uploadAvatar,
} from "../controllers/authControllers.js";
import { checkAuth } from "../utils/checkAuth.js";
import handleValidation, {
  registrationValidation,
  loginValidation,
} from "../utils/validations.js";

const router = Router();

// Uploads
const userAvatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/userAvatars/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const userAvatarUpload = multer({ storage: userAvatarStorage });

// Routes
router.post("/register", registrationValidation, handleValidation, register);
router.post("/login", loginValidation, handleValidation, login);
router.get("/getuser", checkAuth, getUser);

router.post(
  "/avatar/upload",
  checkAuth,
  userAvatarUpload.single("avatar"),
  uploadAvatar
);


export default router;
