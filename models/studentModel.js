import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const StudentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },

    indexNumber: {
      type: Number,
      unique: [true, "Index number already exists"],
    },

    departmentCode: {
      type: String,
    },

    level: {
      type: Number,
      enum: [100, 200, 300, 400, 500, 600],
    },

    password: {
      type: String,
    },
  },
  { timestamps: true },
);

StudentSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

StudentSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Student", StudentSchema);
