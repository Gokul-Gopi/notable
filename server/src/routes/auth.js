import express from "express";
import {
  checkApiKey,
  loginUser,
  signupUser,
} from "../controllers/auth.controllers.js";
const router = express.Router();

router.route("/signup").post(checkApiKey, signupUser);
router.route("/login").post(checkApiKey, loginUser);

export default router;
