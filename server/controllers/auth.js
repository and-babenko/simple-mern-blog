import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (request, response) => {
  try {
    const { userName, password } = request.body;

    const isTaken = await User.findOne({ userName });
    if (isTaken) {
      return response.status(402).json({
        message: "Current username is already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      userName,
      password: hash,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );

    response.json({
      user,
      token,
      message: "Registration was successful",
    });
    console.log("Registration successful");
  } catch (error) {
    console.log("Registration error", error);
  }
};

export const login = async (request, response) => {
  try {
    const { userName, password } = request.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return response.status(402).json({
        message: "Current user does not exist",
      });
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return response.status(402).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );

    response.json({
      token,
      user,
      message: "Logging is successful",
    });

    console.log("Logging is successful");
  } catch (error) {
    console.log("Login error", error);
  }
};

// Get user, всегда при обновлении страницы.
export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      return response.status(402).json({
        message: "User does not exist",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      `${JWT_SECRET}`,
      {
        expiresIn: "30d",
      }
    );

    response.json({
      token,
      user,
      message: "Relogging is successful",
    });
  } catch (error) {
    console.log("No access", error);
  }
};
