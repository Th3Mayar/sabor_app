import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  registerUser,
  modifyUser,
  removeUser,
} from "../services/userService.js";

import {
  saveUserColumnOrderService,
  getUserColumnOrderService,
} from "../services/columnOrderService.js";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await findUserById(Number(req.params.id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await modifyUser(Number(req.params.id), req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const success = await removeUser(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
}

export async function saveColumnOrder(req: Request, res: Response): Promise<Response> {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { columns } = req.body;

    if (!columns || columns.length === 0) {
      return res.status(400).json({ message: "No columns provided to save" });
    }

    await saveUserColumnOrderService(user_id, columns);
    return res.status(200).json({ message: "Column order saved successfully" });
  } catch (error) {
    console.error("Error saving column order:", error);
    return res.status(500).json({ message: "Failed to save column order", error });
  }
}

export async function getColumnOrder(req: Request, res: Response): Promise<void> {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const columns = await getUserColumnOrderService(user_id);
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).json({ message: "Failed to load column order", error });
  }
}