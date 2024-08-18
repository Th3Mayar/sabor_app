import { Request, Response } from "express";
import {
  findAllReservations,
  findReservationById,
  addReservation,
  modifyReservation,
  removeReservation,
} from "../services/reservationService";

export async function getAllReservations(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservations = await findAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservations", error });
  }
}

export async function getReservationById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await findReservationById(Number(req.params.id));
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservation", error });
  }
}

export async function createReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await addReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create reservation", error });
  }
}

export async function updateReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await modifyReservation(
      Number(req.params.id),
      req.body
    );
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update reservation", error });
  }
}

export async function deleteReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeReservation(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reservation", error });
  }
}