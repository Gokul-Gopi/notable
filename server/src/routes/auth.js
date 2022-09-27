import express from "express";
import {
  changePassword,
  checkApiKey,
  isAuthenticatedUser,
  loginUser,
  signupUser,
} from "../controllers/auth.controllers.js";
const router = express.Router();

router.route("/signup").post(checkApiKey, signupUser);
router.route("/login").post(checkApiKey, loginUser);
router
  .route("/changepassword")
  .put(checkApiKey, isAuthenticatedUser, changePassword);

export default router;
