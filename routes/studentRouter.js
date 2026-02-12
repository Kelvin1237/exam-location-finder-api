import { Router } from "express";
import {
  getCurrentStudent,
  updateStudent,
  sendEditDetailsRequest,
} from "../controllers/studentController.js";
const router = Router();
import {
  validateEditStudentDetailsInput,
  validateUpdateStudentInput,
} from "../middleware/validationMiddleware.js";

router.route("/current").get(getCurrentStudent);
router
  .route("/update-student")
  .patch(validateUpdateStudentInput, updateStudent);
router
  .route("/request-edit")
  .post(validateEditStudentDetailsInput, sendEditDetailsRequest);

export default router;
