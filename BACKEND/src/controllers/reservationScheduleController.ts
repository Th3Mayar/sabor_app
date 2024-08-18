import { Request, Response } from "express";
import {
  findAllReservationSchedules,
  findReservationScheduleById,
  addReservationSchedule,
  modifyReservationSchedule,
  removeReservationSchedule,
} from "../services/reservationScheduleService.js";

export async function getAllReservationSchedules(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const schedules = await findAllReservationSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve reservation schedules", error });
  }
}

export async function getReservationScheduleById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const schedule = await findReservationScheduleById(Number(req.params.id));
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: "Reservation schedule not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve reservation schedule", error });
  }
}

export async function createReservationSchedule(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const schedule = await addReservationSchedule(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create reservation schedule", error });
  }
}

export async function updateReservationSchedule(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const schedule = await modifyReservationSchedule(
      Number(req.params.id),
      req.body
    );
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: "Reservation schedule not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update reservation schedule", error });
  }
}

export async function deleteReservationSchedule(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeReservationSchedule(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Reservation schedule deleted" });
    } else {
      res.status(404).json({ message: "Reservation schedule not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete reservation schedule", error });
  }
}