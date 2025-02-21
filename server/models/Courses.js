import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdBy: {
    type: String,
    required: [true, "Created By is required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [1, "Duration must be at least 1 week"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});
// Optimizing the Pipeline
courseSchema.index({ duration: 1 });

// Compound Index
courseSchema.index({ title: 1, createdBy: -1 });

// Text Index
courseSchema.index({ title: "text", description: "text" });

export const Courses = mongoose.model("Courses", courseSchema);