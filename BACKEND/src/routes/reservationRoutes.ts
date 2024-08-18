import { Router } from "express";
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController";

const router = Router();

router.get("/reservations", getAllReservations);
router.get("/reservations/:id", getReservationById);
router.post("/reservations", createReservation);
router.put("/reservations/:id", updateReservation);
router.delete("/reservations/:id", deleteReservation);

export default router;