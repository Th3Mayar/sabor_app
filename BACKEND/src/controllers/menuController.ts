import { Request, Response } from "express";
import * as menuService from "../services/index.js";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, image, state_id, dishes } = req.body;
    const menu = await menuService.createMenuWithDishes(
      name,
      description,
      image,
      state_id,
      dishes
    );
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu", error });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const menu = await menuService.getMenuById(Number(req.params.id));
    if (menu.length) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error });
  }
};

export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const menus = await menuService.getAllMenus();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menus", error });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, image, state_id, dishes } = req.body;
    const menu = await menuService.updateMenuWithDishes(
      Number(req.params.id),
      name,
      description,
      image,
      state_id,
      dishes
    );
    if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating menu", error });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const success = await menuService.deleteMenuWithDishes(
      Number(req.params.id)
    );
    if (success) {
      res.status(200).json({ message: "Menu deleted" });
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu", error });
  }
};
