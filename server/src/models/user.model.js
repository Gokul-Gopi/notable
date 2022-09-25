import mongoose from "mongoose";
import { DEFAULT_LABELS } from "../utils/constants";
const { Schema } = mongoose;

const labelSchema = new Schema({
  name: {
    type: string,
    trim: true,
  },
  background: {
    type: string,
    trim: true,
  },
});

const userSchema = new Schema({
  notes: {
    type: string,
  },
  emailId: {
    unique: true,
    type: string,
    trim: true,
  },
  password: {
    type: string,
  },
  labels: {
    type: [labelSchema],
    default: DEFAULT_LABELS,
  },
});

export const User = mongoose.model("user", userSchema);
