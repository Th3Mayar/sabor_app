import {
  Dish,
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from "../repositories/dishRepository";

export async function findAllDishes(): Promise<Dish[]> {
  return getAllDishes();
}

export async function findDishById(dish_id: number): Promise<Dish | null> {
  return getDishById(dish_id);
}

export async function addDish(dish: Omit<Dish, "dish_id">): Promise<Dish> {
  return createDish(dish);
}

export async function modifyDish(
  dish_id: number,
  dish: Partial<Omit<Dish, "dish_id">>
): Promise<Dish | null> {
  return updateDish(dish_id, dish);
}

export async function removeDish(dish_id: number): Promise<boolean> {
  return deleteDish(dish_id);
}
