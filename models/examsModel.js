import mongoose from "mongoose";
import { EXAM_STATUS, LEVELS } from "../utils/constants.js";

const ExamSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
    },

    courseTitle: {
      type: String,
    },

    roomAllocations: [
      {
        startIndexNumber: {
          type: Number,
        },
        endIndexNumber: {
          type: Number,
        },
        roomAllocated: {
          type: String,
        },
        roomLocation: {
          type: String,
        },
      },
    ],

    startDate: {
      type: Date,
    },

    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },

    departmentCode: {
      type: String,
    },

    level: {
      type: Number,
      enum: [100, 200, 300, 400, 500, 600],
    },

    view: {
      type: String,
      enum: ["today", "all"],
    },

    examStatus: {
      type: String,
      enum: Object.values(EXAM_STATUS),
      default: EXAM_STATUS.UPCOMING,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Exam", ExamSchema);
