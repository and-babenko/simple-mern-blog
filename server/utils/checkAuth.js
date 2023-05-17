import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, `${JWT_SECRET}`);
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.log("Token decoding or finding user in DB error", error);
      return res.status(403).json({
        message: "User does not exist",
      });
    }
  } else {
    console.log("No token");
    return res.status(403).json({
      message: "User does not exist",
    });
  }
};
