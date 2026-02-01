import Student from "../models/studentModel.js";
import Staff from "../models/staffModel.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentStudent = async (req, res) => {
  const student = await Student.findOne({ _id: req.user.userId });

  const studentWithoutPassword = student.toJSON();

  res.status(StatusCodes.OK).json({ student: studentWithoutPassword });
};

export const getCurrentStaff = async (req, res) => {
  const staff = await Staff.findOne({ _id: req.user.userId });

  const staffWithoutPassword = staff.toJSON();

  res.status(StatusCodes.OK).json({ staff: staffWithoutPassword });
};

export const updateStudent = async (req, res) => {
  const { password, indexNumber, departmentCode, level } = req.body;

  if (password !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Password cannot be updated here" });
  }
  if (indexNumber !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Index number cannot be updated here" });
  }
  if (departmentCode !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Department code cannot be updated here" });
  }
  if (level !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Level cannot be updated here" });
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "user updated successfully", user: updatedUser });
};
