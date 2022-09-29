import express from "express";
import {
  checkApiKey,
  isAuthenticatedUser,
} from "../controllers/auth.controllers.js";
import {
  createLabel,
  deleteLabel,
  getAllLabels,
} from "../controllers/user.controllers.js";

const router = express.Router();

router
  .route("/label")
  .get(checkApiKey, isAuthenticatedUser, getAllLabels)
  .post(checkApiKey, isAuthenticatedUser, createLabel);

router
  .route("/label/:labelId")
  .delete(checkApiKey, isAuthenticatedUser, deleteLabel);

export default router;
