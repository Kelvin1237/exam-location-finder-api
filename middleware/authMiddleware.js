import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateStudent = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const student = verifyJWT(token);

    if (student.userType !== "student") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Student access only" });
    }

    const { userId, indexNumber, departmentCode, level } = student;
    req.user = {
      userId,
      indexNumber,
      departmentCode,
      level,
    };

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};

export const authenticateStaff = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const staff = verifyJWT(token);

    if (staff.userType !== "staff") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Staff access only" });
    }

    const { userId, staffId } = staff;
    req.user = {
      userId,
      staffId,
    };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};
