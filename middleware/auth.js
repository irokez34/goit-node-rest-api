import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../schemas/userSchema.js";
export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (typeof authHeader === "undefined") {
      throw HttpError(401);
    }
    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer" || token === null) {
      throw HttpError(401, "Invalid token");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      throw HttpError(401, "Invalid Token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
