import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  registerUser,
  modifyUser,
  removeUser,
} from "../services/userService.js";

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

export async function getUserById(req: Request, res: Response): Promise<void> {
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
