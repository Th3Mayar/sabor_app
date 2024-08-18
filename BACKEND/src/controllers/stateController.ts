import { Request, Response } from "express";
import {
  findAllStates,
  findStateById,
  addState,
  modifyState,
  removeState,
} from "../services/stateService";

export async function getAllStates(req: Request, res: Response): Promise<void> {
  try {
    const states = await findAllStates();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve states", error });
  }
}

export async function getStateById(req: Request, res: Response): Promise<void> {
  try {
    const state = await findStateById(Number(req.params.id));
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve state", error });
  }
}

export async function createState(req: Request, res: Response): Promise<void> {
  try {
    const state = await addState(req.body);
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: "Failed to create state", error });
  }
}

export async function updateState(req: Request, res: Response): Promise<void> {
  try {
    const state = await modifyState(Number(req.params.id), req.body);
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update state", error });
  }
}

export async function deleteState(req: Request, res: Response): Promise<void> {
  try {
    const success = await removeState(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "State deleted" });
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete state", error });
  }
}