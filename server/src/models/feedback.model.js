import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

export const Feedback = mongoose.model("feedback", feedbackSchema);
