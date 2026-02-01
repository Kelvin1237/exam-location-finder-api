import { Router } from "express";
import {
  getCurrentStaff,
  getCurrentStudent,
  updateStudent,
} from "../controllers/userController.js";
const router = Router();
import { validateUpdateStudentInput } from "../middleware/validationMiddleware.js";
import {
  authenticateStudent,
  authenticateStaff,
} from "../middleware/authMiddleware.js";

router.route("/current").get(authenticateStudent, getCurrentStudent);
router.route("/staff/current").get(authenticateStaff, getCurrentStaff);
router
  .route("/update-student")
  .patch(validateUpdateStudentInput, updateStudent);

export default router;
