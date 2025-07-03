import { Request, Response } from "express";
import {
  findAllAvailability,
  findAvailabilityById,
  addAvailability,
  modifyAvailability,
  removeAvailability,
} from "../services/index.js";

export async function getAllAvailability(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const availability = await findAllAvailability();
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve availability", error });
  }
}

export async function getAvailabilityById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const availability = await findAvailabilityById(Number(req.params.id));
    if (availability) {
      res.status(200).json(availability);
    } else {
      res.status(404).json({ message: "Availability not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve availability", error });
  }
}

export async function createAvailability(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const availability = await addAvailability(req.body);
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: "Failed to create availability", error });
  }
}

export async function updateAvailability(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const availability = await modifyAvailability(
      Number(req.params.id),
      req.body
    );
    if (availability) {
      res.status(200).json(availability);
    } else {
      res.status(404).json({ message: "Availability not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update availability", error });
  }
}

export async function deleteAvailability(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeAvailability(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Availability deleted" });
    } else {
      res.status(404).json({ message: "Availability not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete availability", error });
  }
}
