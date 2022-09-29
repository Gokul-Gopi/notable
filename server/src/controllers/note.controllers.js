import { getErrorCodeAndMessage, validateBody } from "../utils/helpers.js";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validations/note.validation.js";
import { Note } from "../models/note.model.js";

export const getUserNotes = async (req, res) => {
  const user = req.user;
  try {
    const userNotes = await Note.find({ userId: user?._id });

    res.status(200).json({ status: 200, data: userNotes });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const createNote = async (req, res) => {
  const user = req.user;
  try {
    await validateBody(createNoteSchema, req.body);
    const { labelId, ...rest } = req.body;
    const label = user?.labels.find((e) => e._id.toString() === labelId);

    const newNote = new Note({
      userId: user?._id,
      label,
      ...rest,
    });
    await newNote.save();

    res.status(201).json({ status: 200, data: newNote });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const updateNote = async (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  let detailsToUpdate = req.body;

  try {
    await validateBody(updateNoteSchema, detailsToUpdate);

    if (detailsToUpdate?.labelId) {
      const label = user?.labels.find(
        (e) => e._id.toString() === detailsToUpdate?.labelId
      );
      delete detailsToUpdate.labelId;
      detailsToUpdate = { ...detailsToUpdate, label };
    }

    await Note.updateOne({ _id: noteId }, detailsToUpdate);
    await res.status(200).json({ status: 200, message: "Note updated" });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const deleteNote = async (req, res) => {
  const noteId = req.params?.noteId;
  try {
    await Note.deleteOne({ _id: noteId });
    res.status(200).json({ status: 200, message: "Note deleted" });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};
