import mongoose from "mongoose";

export const jobSchema = new mongoose.Schema(
  {
    title: String,
    department: String,
    company: String,
    jobPageLink: String,
    jobDescription: {},
    jobId: String,
    usersWhoLiked: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);
