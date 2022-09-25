import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: string,
      trim: true,
    },
    note: {
      type: string,
      trim: true,
    },
    label: {
      type: string,
    },
    background: {
      type: string,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
