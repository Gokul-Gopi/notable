import { validateBody } from "../utils/helpers.js";
import { createNoteSchema } from "../validations/note.validation.js";
import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  const user = req.user;
  try {
    await validateBody(createNoteSchema, req.body);
    const { labelId, ...rest } = req.body;
    const newNote = new Note({
      userId: user?._id,
      ...rest,
    });
    await newNote.save();
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};
