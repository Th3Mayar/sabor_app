import pool from '../config/db';

export interface Dish {
  dish_id: number;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  section: string;
}

export async function getAllDishes(): Promise<Dish[]> {
  const result = await pool.query<Dish>('SELECT * FROM dishes');
  return result.rows;
}

export async function getDishById(dish_id: number): Promise<Dish | null> {
  const result = await pool.query<Dish>('SELECT * FROM dishes WHERE dish_id = $1', [dish_id]);
  return result.rows[0] || null;
}

export async function createDish(dish: Omit<Dish, 'dish_id'>): Promise<Dish> {
  const result = await pool.query<Dish>(
    'INSERT INTO dishes (name, description, image, price, section) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [dish.name, dish.description, dish.image, dish.price, dish.section]
  );
  return result.rows[0];
}

export async function updateDish(dish_id: number, dish: Partial<Omit<Dish, 'dish_id'>>): Promise<Dish | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (dish.name) {
    fields.push(`name = $${index++}`);
    values.push(dish.name);
  }
  if (dish.description) {
    fields.push(`description = $${index++}`);
    values.push(dish.description);
  }
  if (dish.image) {
    fields.push(`image = $${index++}`);
    values.push(dish.image);
  }
  if (dish.price !== undefined) {
    fields.push(`price = $${index++}`);
    values.push(dish.price);
  }
  if (dish.section) {
    fields.push(`section = $${index++}`);
    values.push(dish.section);
  }

  if (fields.length === 0) return null;

  values.push(dish_id);

  const result = await pool.query<Dish>(
    `UPDATE dishes SET ${fields.join(', ')} WHERE dish_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteDish(dish_id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM dishes WHERE dish_id = $1', [dish_id]);
  return result.rowCount !== null && result.rowCount > 0;
}
