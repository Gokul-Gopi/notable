import mongoose from "mongoose";
import { labelSchema } from "./user.model.js";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    label: {
      type: labelSchema,
    },
    background: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("note", noteSchema);
