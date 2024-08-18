import pool from '../config/db.js';

export const createMenu = async (
  name: string,
  description: string,
  image: string,
  state_id: number
) => {
  const result = await pool.query(
    'INSERT INTO menus (name, description, image, state_id, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
    [name, description, image, state_id]
  );
  return result.rows[0];
};

export const addDishToMenu = async (menu_id: number, dish_id: number, price: number) => {
  const result = await pool.query(
    'INSERT INTO menu_dishes (menu_id, dish_id, price) VALUES ($1, $2, $3) RETURNING *',
    [menu_id, dish_id, price]
  );
  return result.rows[0];
};

export const getMenuById = async (menu_id: number) => {
  const result = await pool.query(`
    SELECT 
      m.menu_id, 
      m.name as menu_name, 
      m.description as menu_description, 
      m.image as menu_image,
      m.created_at,
      m.updated_at,
      s.name as state_name,
      s.description as state_description,
      array_agg(json_build_object('dish_id', d.dish_id, 'name', d.name, 'description', d.description, 'price', md.price)) as dishes
    FROM menus m
    LEFT JOIN menu_dishes md ON m.menu_id = md.menu_id
    LEFT JOIN dishes d ON md.dish_id = d.dish_id
    LEFT JOIN states s ON m.state_id = s.state_id
    WHERE m.menu_id = $1
    GROUP BY m.menu_id, s.name, s.description
  `, [menu_id]);

  return result.rows;
};

export const getAllMenus = async () => {
  const result = await pool.query(`
    SELECT 
      m.menu_id, 
      m.name as menu_name, 
      m.description as menu_description, 
      m.image as menu_image,
      m.created_at,
      m.updated_at,
      s.name as state_name,
      s.description as state_description,
      array_agg(json_build_object('dish_id', d.dish_id, 'name', d.name, 'description', d.description, 'price', md.price)) as dishes
    FROM menus m
    LEFT JOIN menu_dishes md ON m.menu_id = md.menu_id
    LEFT JOIN dishes d ON md.dish_id = d.dish_id
    LEFT JOIN states s ON m.state_id = s.state_id
    GROUP BY m.menu_id, s.name, s.description
  `);

  return result.rows;
};

export const updateMenu = async (
  menu_id: number,
  name: string,
  description: string,
  image: string,
  state_id: number
) => {
  const result = await pool.query(
    'UPDATE menus SET name = $1, description = $2, image = $3, state_id = $4, updated_at = CURRENT_TIMESTAMP WHERE menu_id = $5 RETURNING *',
    [name, description, image, state_id, menu_id]
  );
  return result.rows[0];
};

export const deleteMenu = async (menu_id: number) => {
  const result = await pool.query(
    'DELETE FROM menus WHERE menu_id = $1 RETURNING *',
    [menu_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
};

export const deleteMenuWithDishes = async (menu_id: number) => {
  await pool.query('DELETE FROM menu_dishes WHERE menu_id = $1', [menu_id]);
  
  const result = await pool.query('DELETE FROM menus WHERE menu_id = $1 RETURNING *', [menu_id]);
  return result.rowCount !== null && result.rowCount > 0;
};