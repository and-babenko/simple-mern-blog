import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, `${JWT_SECRET}`);
      req.userId = decoded.id;
      console.log(token, decoded, decoded.id);

      next();
    } catch (error) {
      return res.json({
        message: "Access denied",
      });
    }
  } else {
    return res.json({
      message: "Access denied",
    });
  }
};
