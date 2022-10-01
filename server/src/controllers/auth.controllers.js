import { getErrorCodeAndMessage, validateBody } from "../utils/helpers.js";
import {
  changePasswordSchema,
  loginSchema,
  signupSchema,
} from "../validations/user.validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const loginUser = async (req, res) => {
  try {
    await validateBody(loginSchema, req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw {
        status_code: 401,
        message: "Invalid email/password",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      throw {
        status_code: 401,
        message: "Invalid email/password",
      };
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    return res.status(200).json({ status: true, token });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const signupUser = async (req, res) => {
  try {
    await validateBody(signupSchema, req.body);
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

    return res.status(201).json({ status: true, token });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const checkApiKey = (req, res, next) => {
  try {
    const apiKey = req?.headers["api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw {
        status_code: 403,
        message: "Access denied",
      };
    }
    next();
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded?.id);
    req.user = user;
    return next();
  } catch (error) {
    // console.log(error);
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const changePassword = async (req, res) => {
  const user = req.user;
  try {
    await validateBody(changePasswordSchema, req.body);
    const { oldPassword, newPassword } = req.body;

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      throw {
        status_code: 401,
        message: "Incorrect password",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res
      .status(200)
      .json({ status: true, message: "Password changed successfully" });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};
