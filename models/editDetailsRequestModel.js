import mongoose from "mongoose";

const EditDetailsRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    newIndexNumber: {
      type: Number,
    },

    newDepartmentCode: {
      type: String,
    },

    newLevel: {
      type: Number,
      enum: [100, 200, 300, 400, 500, 600],
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("EditDetailsRequest", EditDetailsRequestSchema);
