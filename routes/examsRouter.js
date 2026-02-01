import { Router } from "express";
const router = Router();
import {
  getAllExams,
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
import {
  authenticateStudent,
  authenticateStaff,
} from "../middleware/authMiddleware.js";

router.route("/").get(authenticateStudent, getAllExams);
router
  .route("/staff")
  .get(authenticateStaff, getAllPostedExams)
  .post(authenticateStaff, validateExamInput, createExam);
router
  .route("/staff/:id")
  .get(authenticateStaff, validateIdParam, getSingleExam)
  .patch(
    authenticateStaff,
    validateIdParam,
    validateExamInput,
    updatePostedExam,
  )
  .delete(authenticateStaff, validateIdParam, deletePostedExam);

export default router;
