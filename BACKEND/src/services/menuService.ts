import * as menuRepository from '../repositories/menuRepository.js';

export const createMenuWithDishes = async (
  name: string,
  description: string,
  image: string,
  stateId: number,
  dishes: { dish_id: number; price: number }[]
) => {
  const menu = await menuRepository.createMenu(name, description, image, stateId);

  for (const dish of dishes) {
    await menuRepository.addDishToMenu(menu.menu_id, dish.dish_id, dish.price);
  }

  return menu;
};

export const getMenuById = async (id: number) => {
  return await menuRepository.getMenuById(id);
};

export const getAllMenus = async () => {
  return await menuRepository.getAllMenus();
};

export const updateMenuWithDishes = async (
  id: number,
  name: string,
  description: string,
  image: string,
  stateId: number,
  dishes: { dish_id: number; price: number }[]
) => {
  const menu = await menuRepository.updateMenu(id, name, description, image, stateId);
  return menu;
};

export const deleteMenu = async (id: number) => {
  return await menuRepository.deleteMenu(id);
};

export const deleteMenuWithDishes = async (id: number) => {
  return await menuRepository.deleteMenuWithDishes(id);
};