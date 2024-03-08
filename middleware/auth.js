import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    throw HttpError(401);
  }
  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    throw HttpError(401, "Invalid token");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw HttpError(401, "Token expired");
      }
      throw HttpError(401, "Invalid token");
    }

    req.user = {
      id: decode.id,
      email: decode.email,
    };
  });

  next();
}
