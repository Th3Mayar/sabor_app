import { Router } from "express";
import {
  getAllReservationSchedules,
  getReservationScheduleById,
  createReservationSchedule,
  updateReservationSchedule,
  deleteReservationSchedule,
} from "../controllers/reservationScheduleController.js";

const router = Router();

router.get("/reservation-schedules", getAllReservationSchedules);
router.get("/reservation-schedules/:id", getReservationScheduleById);
router.post("/reservation-schedules", createReservationSchedule);
router.put("/reservation-schedules/:id", updateReservationSchedule);
router.delete("/reservation-schedules/:id", deleteReservationSchedule);

export default router;