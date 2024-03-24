import HttpError from "../helpers/HttpError.js";
import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import crypto from "node:crypto";
import * as path from "node:path";
import { transport } from "../nodemailer/transporter.js";
import { message } from "../nodemailer/message.js";

// ----------------------------------------------------------------------//

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizeEmail = email.toLowerCase();
    const avatar = gravatar.url(normalizeEmail);
    const verificationToken = crypto.randomUUID();
    const user = await User.findOne({ email: normalizeEmail });
    if (user !== null) {
      throw HttpError(409, "User already registered");
    }
    const passwordHash = await bcrypt.hash(password, 10);
   const newUser =  await User.create({
      email: normalizeEmail,
      password: passwordHash,
      avatarURL: avatar,
      verificationToken,
    });

    const sendMessage = await transport.sendMail(message(email, newUser.verificationToken));
    if (!sendMessage) {
      throw HttpError(400, "Cannot send message");
    }

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  ``;
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
    if (user.verify === false) {
      throw HttpError(401, "Not Verify");
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
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (user === null) {
      throw HttpError(401);
    }
    await User.findByIdAndUpdate(id, { token: null });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (user === null) {
      throw HttpError(401);
    }
    const { email, subscription } = user;
    res.send({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  const { id } = req.user;

  try {
    if (req.file === undefined) {
      throw HttpError(404);
    }
    const filePath = path.join(process.cwd(), "public/avatars", `${id}${req.file.originalname}`);
    const img = await Jimp.read(req.file.path);
    img.resize(250, 250);
    await img.writeAsync(filePath);
    const user = await User.findByIdAndUpdate(
      id,
      { avatarURL: filePath },
      {
        new: true,
      }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};
export const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null },
      { new: true }
    );
    if (user === null) {
      throw HttpError(404);
    }

    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
export const verifyByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const { verify, verificationToken } = user;
    if (user === null) {
      throw HttpError(404);
    }
    if (email === null) {
      throw HttpError(400, "missing required field email");
    }
    if (verify === true) {
      throw HttpError(400, "Verification has already been passed");
    }
    const sendMessage = await transport.sendMail(message(email, verificationToken));
    if (!sendMessage) {
      throw HttpError(400, "Cannot send message");
    }
    res.send({ message: "Check ur email" }).status(200);
  } catch (error) {
    next(error);
  }
};
