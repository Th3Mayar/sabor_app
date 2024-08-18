import { Request, Response } from "express";
import {
  findAllRoles,
  findRoleById,
  addRole,
  modifyRole,
  removeRole,
} from "../services/roleService.js";

export async function getAllRoles(req: Request, res: Response): Promise<void> {
  try {
    const roles = await findAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve roles", error });
  }
}

export async function getRoleById(req: Request, res: Response): Promise<void> {
  try {
    const role = await findRoleById(Number(req.params.id));
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve role", error });
  }
}

export async function createRole(req: Request, res: Response): Promise<void> {
  try {
    const role = await addRole(req.body.name);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Failed to create role", error });
  }
}

export async function updateRole(req: Request, res: Response): Promise<void> {
  try {
    const role = await modifyRole(Number(req.params.id), req.body.name);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error });
  }
}

export async function deleteRole(req: Request, res: Response): Promise<void> {
  try {
    const success = await removeRole(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Role deleted" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete role", error });
  }
}