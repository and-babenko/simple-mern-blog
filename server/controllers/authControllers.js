import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { baseUrl } from "../config.js";
import UserModel from "../models/UserModel.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (request, response) => {
  try {
    const { email, userName, password, avatarUrl } = request.body;

    const isTaken = await UserModel.findOne({ email });

    if (isTaken) {
      console.log("Current email is already taken");
      return response.status(400).json({
        message: "Current email is already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new UserModel({
      userName,
      email,
      passwordHash: hash,
      avatarUrl,
    });

    await userInstance.save();

    const token = jwt.sign(
      {
        id: userInstance._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...newUserData } = userInstance._doc;

    return response.json({
      user: newUserData,
      token,
      message: "Registration successful",
    });
  } catch (error) {
    console.log("Registration error", error);
    return response.status(500).json({
      message: "Registration error",
    });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const userInstance = await UserModel.findOne({ email });

    if (!userInstance) {
      console.log("Current user does not exist");
      return response.status(401).json({
        message: "User was not found",
      });
    }

    const isPassCorrect = await bcrypt.compare(
      password,
      userInstance.passwordHash
    );

    if (!isPassCorrect) {
      console.log("Password is wrong");

      return response.status(401).json({
        message: "User was not found",
      });
    }

    const token = jwt.sign(
      {
        id: userInstance._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = userInstance._doc;

    return response.json({
      user: userData,
      token,
      message: "Logging is successful",
    });
  } catch (error) {
    console.log("Login error", error);
    return response.status(500).json({
      message: "Login error",
    });
  }
};

export const getUser = async (request, response) => {
  try {
    const userInstance = await UserModel.findById(request.userId);

    if (!userInstance) {
      return response.status(402).json({
        message: "User does not exist",
      });
    }

    const token = jwt.sign(
      {
        id: userInstance._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = userInstance._doc;
    response.json({
      token,
      user: userData,
      message: "Relogging is successful",
    });
  } catch (error) {
    console.log("Login error", error);
    return response.status(500).json({
      message: "No Access",
    });
  }
};

export const uploadAvatar = (request, response) => {
  try {
    const imagePath = `${baseUrl}uploads/userAvatars/${request.file.filename}`;
    response.status(200).json(imagePath);
  } catch (error) {
    console.log("Avatar Upload Error", error);
    return response.status(500).json({
      message: "Avatar Upload Error",
    });
  }
};
