import { Request, Response } from "express";
import {
  findAllConfigurations,
  findConfigurationById,
  addConfiguration,
  modifyConfiguration,
  removeConfiguration,
} from "../services/index.js";

export async function getAllConfigurations(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const configurations = await findAllConfigurations();
    res.status(200).json(configurations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve configurations", error });
  }
}

export async function getConfigurationById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const configuration = await findConfigurationById(Number(req.params.id));
    if (configuration) {
      res.status(200).json(configuration);
    } else {
      res.status(404).json({ message: "Configuration not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve configuration", error });
  }
}

export async function createConfiguration(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const configuration = await addConfiguration(req.body);
    res.status(201).json(configuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to create configuration", error });
  }
}

export async function updateConfiguration(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const configuration = await modifyConfiguration(
      Number(req.params.id),
      req.body
    );
    if (configuration) {
      res.status(200).json(configuration);
    } else {
      res.status(404).json({ message: "Configuration not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update configuration", error });
  }
}

export async function deleteConfiguration(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeConfiguration(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Configuration deleted" });
    } else {
      res.status(404).json({ message: "Configuration not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete configuration", error });
  }
}