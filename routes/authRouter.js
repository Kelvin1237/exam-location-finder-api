import { Router } from "express";
const router = Router();
import {
  registerStudent,
  registerStaff,
  registerAdmin,
  studentLogin,
  staffLogin,
  adminLogin,
  logout,
} from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import {
  validateRegisterStudentInput,
  validateRegisterStaffInput,
  validateLoginStudentInput,
  validateLoginStaffInput,
  validateRegisterLoginAdminInput,
} from "../middleware/validationMiddleware.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

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
  .post(
    authenticateAdmin,
    apiLimiter,
    validateRegisterStaffInput,
    registerStaff,
  );
router
  .route("/admin/register")
  .post(apiLimiter, validateRegisterLoginAdminInput, registerAdmin);
router
  .route("/login")
  .post(apiLimiter, validateLoginStudentInput, studentLogin);
router
  .route("/staff/login")
  .post(apiLimiter, validateLoginStaffInput, staffLogin);
router
  .route("/admin/login")
  .post(apiLimiter, validateRegisterLoginAdminInput, adminLogin);
router.route("/logout").get(logout);
router.route("/staff/logout").get(logout);
router.route("/admin/logout").get(logout);

export default router;
