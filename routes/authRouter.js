import { Router } from "express";
const router = Router();
import {
  registerStudent,
  registerStaff,
  studentLogin,
  staffLogin,
  logout,
} from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import {
  validateRegisterStudentInput,
  validateRegisterStaffInput,
  validateLoginStudentInput,
  validateLoginStaffInput,
} from "../middleware/validationMiddleware.js";

const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 15,
  max: 15,
  message: {
    msg: "IP rate limit exceeded, retry in 15 minutes",
  },
});

router
  .route("/register")
  .post(apiLimiter, validateRegisterStudentInput, registerStudent);
router
  .route("/staff/register")
  .post(apiLimiter, validateRegisterStaffInput, registerStaff);
router
  .route("/login")
  .post(apiLimiter, validateLoginStudentInput, studentLogin);
router
  .route("/staff/login")
  .post(apiLimiter, validateLoginStaffInput, staffLogin);
router.route("/logout").get(logout);
router.route("/staff/logout").get(logout);

export default router;
