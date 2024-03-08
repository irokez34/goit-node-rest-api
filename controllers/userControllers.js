import HttpError from "../helpers/HttpError.js";
import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const normalizeEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizeEmail });
    if (user !== null) {
      throw HttpError(409, "User already registered");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      email: normalizeEmail,
      password: passwordHash,
    });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizeEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizeEmail });
    if (user === null) {
      throw HttpError(401, "Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      throw HttpError(401, "Email or password is incorrect");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.send({ token });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  console.log(req.user);
  res.send("work");
};
