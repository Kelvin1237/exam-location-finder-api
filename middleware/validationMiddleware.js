import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { LEVELS, EXAM_STATUS, PROGRAMS } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: errorMessages });
      }
      next();
    },
  ];
};

export const validateRegisterStudentInput = withValidationErrors([
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("indexNumber")
    .trim()
    .notEmpty()
    .withMessage("Index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Index number must be a 7-digit number"),
  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("program")
    .optional()
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("level")
    .trim()
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateRegisterStaffInput = withValidationErrors([
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("staffID")
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateLoginStudentInput = withValidationErrors([
  body("indexNumber")
    .trim()
    .notEmpty()
    .withMessage("Index number is required")
    .isLength({ min: 7, max: 7 })
    .withMessage("Index number must be 7 digits")
    .isNumeric()
    .withMessage("Index number must contain only digits"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateLoginStaffInput = withValidationErrors([
  body("staffID")
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateRegisterLoginAdminInput = withValidationErrors([
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom((value) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) {
      throw new Error("invalid mongodb id");
    }
    return true;
  }),
]);

export const validateUpdateStudentInput = withValidationErrors([
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
]);

export const validateExamInput = withValidationErrors([
  body("courseCode")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Course code is required")
    .isAlphanumeric()
    .withMessage("Course code must contain only letters and numbers"),
  body("courseTitle")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course title is required"),
  body("roomAllocations")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one room allocation is required"),
  body("roomAllocations.*.startIndexNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Start index number must be a 7-digit number"),
  body("roomAllocations.*.endIndexNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("End index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("End index number must be a 7-digit number"),
  body("roomAllocations.*.roomAllocated")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Room allocated is required"),
  body("roomAllocations.*.roomLocation")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Room location is required"),
  body("startDate")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be in the format YYYY-MM-DD"),
  body("startTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start time is required")
    .isTime()
    .withMessage("Start time must be in valid 24-hour format HH:MM"),
  body("endTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("End time is required")
    .isTime()
    .withMessage("End time must be in valid 24-hour format HH:MM"),
  body("departmentCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("program")
    .optional()
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("level")
    .optional()
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("examStatus")
    .optional()
    .optional()
    .isIn(Object.values(EXAM_STATUS))
    .withMessage("Invalid exam status"),
]);

export const validateUpdateStaffInput = withValidationErrors([
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),
  body("staffID")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
]);

export const validateEditStudentDetailsInput = withValidationErrors([
  body("newIndexNumber")
    .trim()
    .optional()
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Index number must be a 7-digit number"),
  body("newDepartmentCode")
    .trim()
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("newProgram")
    .optional()
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("newLevel")
    .trim()
    .optional()
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason for edit request is required"),
]);
