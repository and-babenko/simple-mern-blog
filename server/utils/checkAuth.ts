import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req: any, res: any, next: any) => {
  const token = (req.headers.autorization || "").replase(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded: any = jwt.verify(token, `${JWT_SECRET}`);
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
