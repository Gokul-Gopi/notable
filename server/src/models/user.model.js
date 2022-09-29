import mongoose from "mongoose";
import { DEFAULT_LABELS } from "../utils/constants.js";
const { Schema } = mongoose;

export const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  background: {
    type: String,
    required: true,
    trim: true,
  },
});

const userSchema = new Schema({
  email: {
    unique: true,
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  labels: {
    type: [labelSchema],
    default: DEFAULT_LABELS,
  },
});

export const User = mongoose.model("user", userSchema);
