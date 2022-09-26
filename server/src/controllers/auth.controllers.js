import { getErrorCodeAndMessage, validateBody } from "../utils/helpers.js";
import { loginSchema, signupSchema } from "../validations/user.validation.js";
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

    return res
      .status(200)
      .json({ status: false, message: "Logged in successfully" });
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
