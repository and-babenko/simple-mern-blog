import { body } from "express-validator";
import { validationResult } from "express-validator";

export default (request, response, next) => {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    const errorMessage = validationErrors.errors
      .map((error) => error.msg)
      .join(" ");
    return response.status(400).json({ message: errorMessage });
  }
  next();
};

export const registrationValidation = [
  body("email", "Incorrect email format.").isEmail(),
  body("password", "Password must be longer than 5 characters.")
    .isLength({
      min: 5,
    })
    .isString(),
  body("userName", "Name must be longer then 2 characters.")
    .isLength({ min: 2 })
    .isString(),
  body("avatarUrl", "Incorrect avatar link.").optional().isURL(),
];

export const loginValidation = [
  body("email", "Incorrect mail format").isEmail(),
  body("password", "Pasword is required").isString(),
];

export const createPostValidation = [
  body("title", "Enter the title that more than 3 letters")
    .isLength({
      min: 3,
    })
    .isString(),

  body("text", "Enter text that more than 10 letters")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Incorrect tag format (array needed)").optional().isArray(),
  body("imgUrl", "Incorrect img link format").optional().isString(),
];
