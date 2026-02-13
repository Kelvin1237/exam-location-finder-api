import { Router } from "express";
import { getCurrentStaff } from "../controllers/staffController.js";
import {
  getAllPostedExams,
  getSingleExam,
  createExam,
  updatePostedExam,
  deletePostedExam,
} from "../controllers/examsController.js";
import {
  validateIdParam,
  validateExamInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/current").get(getCurrentStaff);
router
  .route("/exams")
  .get(getAllPostedExams)
  .post(validateExamInput, createExam);
router
  .route("/exams/:id")
  .get(validateIdParam, getSingleExam)
  .patch(validateIdParam, validateExamInput, updatePostedExam)
  .delete(validateIdParam, deletePostedExam);

export default router;
