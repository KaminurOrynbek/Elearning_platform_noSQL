import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  video: {
    type: String,
    required: [true, "Video URL is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: [true, "Course ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lecture = mongoose.model("Lecture", schema);