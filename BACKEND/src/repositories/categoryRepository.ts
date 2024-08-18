import pool from '../config/db.js';

export const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

export const createCategory = async (name: string) => {
  const result = await pool.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

export const getCategoryById = async (id: number) => {
  const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
  return result.rows[0];
};

export const updateCategory = async (id: number, name: string) => {
  const result = await pool.query(
    'UPDATE categories SET name = $1 WHERE category_id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

export const deleteCategory = async (id: number) => {
  const result = await pool.query('DELETE FROM categories WHERE category_id = $1 RETURNING *', [id]);
  return result.rowCount !== null && result.rowCount > 0;
};
