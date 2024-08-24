import pool from "../config/db.js";

export async function saveUserColumnOrder(
  user_id: number,
  columns: any[]
): Promise<void> {
  if (!columns || columns.length === 0) {
    throw new Error("No columns provided to save");
  }

  const query = `
        INSERT INTO user_column_order (user_id, column_order)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO UPDATE
        SET column_order = COALESCE($2, user_column_order.column_order);
      `;

  try {
    await pool.query(query, [user_id, JSON.stringify(columns)]);
  } catch (error) {
    throw new Error(`Failed to save column order: ${error}`);
  }
}

export async function getUserColumnOrder(user_id: number): Promise<any[]> {
  const result = await pool.query(
    "SELECT column_order FROM user_column_order WHERE user_id = $1",
    [user_id]
  );
  return result.rows[0] ? result.rows[0].column_order : null;
}
