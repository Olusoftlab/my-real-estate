import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies?.access_token;

  if (!token) return next(errorHandler(401, "unauthorised"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "forbidden"));

    req.user = user;
    next();
  });
};