import { Router } from "express";
import {
  getAllAvailability,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityController.js";

const router = Router();

router.get("/availability", getAllAvailability);
router.get("/availability/:id", getAvailabilityById);
router.post("/availability", createAvailability);
router.put("/availability/:id", updateAvailability);
router.delete("/availability/:id", deleteAvailability);

export default router;