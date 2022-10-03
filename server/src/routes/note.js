import express from "express";
import {
  checkApiKey,
  isAuthenticatedUser,
} from "../controllers/auth.controllers.js";
import {
  createNote,
  deleteNote,
  getUserNotes,
  pinUnpinNote,
  updateNote,
} from "../controllers/note.controllers.js";
const router = express.Router();

router
  .route("/")
  .get(checkApiKey, isAuthenticatedUser, getUserNotes)
  .post(checkApiKey, isAuthenticatedUser, createNote);

router
  .route("/:noteId")
  .put(checkApiKey, isAuthenticatedUser, updateNote)
  .delete(checkApiKey, isAuthenticatedUser, deleteNote);

router
  .route("/pin/:noteId")
  .put(checkApiKey, isAuthenticatedUser, pinUnpinNote);

export default router;
