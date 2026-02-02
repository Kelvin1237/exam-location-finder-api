import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel.js";
import Staff from "../models/staffModel.js";
import { createJWT } from "../utils/tokenUtils.js";

export const registerStudent = async (req, res) => {
  const { indexNumber } = req.body;

  const studentAlreadyExists = await Student.findOne({ indexNumber });

  if (studentAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Index number already exists" });
  }

  const student = await Student.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};
export const registerStaff = async (req, res) => {
  const { staffID } = req.body;

  const staffAlreadyExists = await Staff.findOne({ staffID });

  if (staffAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Staff id already exists" });
  }

  const staff = await Staff.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const studentLogin = async (req, res) => {
  const { indexNumber, password } = req.body;

  const student = await Student.findOne({ indexNumber });

  if (!student) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await student.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const payload = {
    userId: student._id,
    indexNumber: student.indexNumber,
    departmentCode: student.departmentCode,
    level: student.level,
    role: "student",
  };

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login successful" });
};

export const staffLogin = async (req, res) => {
  const { staffID, password } = req.body;

  const staff = await Staff.findOne({ staffID });

  if (!staff) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await staff.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const payload = {
    userId: staff._id,
    staffID: staff.staffID,
    role: "staff",
  };

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login successful" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
