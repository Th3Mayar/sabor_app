import { Request, Response } from "express";
import {
  findAllDishes,
  findDishById,
  addDish,
  modifyDish,
  removeDish,
} from "../services/index.js";

export async function getAllDishes(req: Request, res: Response): Promise<void> {
  try {
    const dishes = await findAllDishes();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve dishes", error });
  }
}

export async function getDishById(req: Request, res: Response): Promise<void> {
  try {
    const dish = await findDishById(Number(req.params.id));
    if (dish) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve dish", error });
  }
}

export async function createDish(req: Request, res: Response): Promise<void> {
  try {
    const dish = await addDish(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Failed to create dish", error });
  }
}

export async function updateDish(req: Request, res: Response): Promise<void> {
  try {
    const dish = await modifyDish(Number(req.params.id), req.body);
    if (dish) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update dish", error });
  }
}

export async function deleteDish(req: Request, res: Response): Promise<void> {
  try {
    const success = await removeDish(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Dish deleted" });
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dish", error });
  }
}
