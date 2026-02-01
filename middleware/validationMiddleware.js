import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { LEVELS, EXAM_STATUS } from "../utils/constants.js";

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
  body("staffId")
    .trim()
    .notEmpty()
    .withMessage("Staff id is required")
    .isAlphanumeric()
    .withMessage("Staff id must contain only letters and numbers"),
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
  body("staffId")
    .trim()
    .notEmpty()
    .withMessage("Staff id is required")
    .isAlphanumeric()
    .withMessage("Staff id must contain only letters and numbers"),
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
    .notEmpty()
    .withMessage("Course code is required")
    .isAlphanumeric()
    .withMessage("Course code must contain only letters and numbers"),
  body("courseTitle").trim().notEmpty().withMessage("Course title is required"),
  body("roomAllocations")
    .isArray({ min: 1 })
    .withMessage("At least one room allocation is required"),
  body("roomAllocations.*.startIndexNumber")
    .trim()
    .notEmpty()
    .withMessage("Start index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Start index number must be a 7-digit number"),
  body("roomAllocations.*.endIndexNumber")
    .trim()
    .notEmpty()
    .withMessage("End index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("End index number must be a 7-digit number"),
  body("roomAllocations.*.examRoom")
    .trim()
    .notEmpty()
    .withMessage("Exam room is required"),
  body("roomAllocations.*.roomLocation")
    .trim()
    .notEmpty()
    .withMessage("Room location is required"),
  body("startDate")
    .trim()
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be in the format YYYY-MM-DD"),
  body("startTime")
    .trim()
    .notEmpty()
    .withMessage("Start time is required")
    .isTime()
    .withMessage("Start time must be in valid 24-hour format HH:MM"),
  body("endTime")
    .trim()
    .notEmpty()
    .withMessage("End time is required")
    .isTime()
    .withMessage("End time must be in valid 24-hour format HH:MM"),
  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("level")
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("examStatus")
    .optional()
    .isIn(Object.values(EXAM_STATUS))
    .withMessage("Invalid exam status"),
]);
