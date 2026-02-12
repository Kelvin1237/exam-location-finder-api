import { Router } from "express";
import { getCurrentStaff } from "../controllers/staffController.js";
const router = Router();

router.route("/current").get(getCurrentStaff);

export default router;
