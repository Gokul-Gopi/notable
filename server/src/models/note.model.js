import mongoose from "mongoose";
import { labelSchema } from "./user.model";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: string,
      trim: true,
      required: true,
    },
    note: {
      type: string,
      trim: true,
      required: true,
    },
    label: {
      type: labelSchema,
    },
    background: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("note", noteSchema);
