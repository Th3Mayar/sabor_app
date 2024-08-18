import pool from "../config/db";

export interface User {
  user_id: number;
  full_name: string;
  contact_phone: string | null;
  email: string;
  password: string;
  role_id: number | null;
}

export async function getAllUsers(): Promise<User[]> {
  const result = await pool.query<User>("SELECT * FROM users");
  return result.rows;
}

export async function getUserById(user_id: number): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id]
  );
  return result.rows[0] || null;
}

export async function createUser(user: Omit<User, "user_id">): Promise<User> {
  const result = await pool.query<User>(
    "INSERT INTO users (full_name, contact_phone, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      user.full_name,
      user.contact_phone,
      user.email,
      user.password,
      user.role_id,
    ]
  );
  return result.rows[0];
}

export async function updateUser(
  user_id: number,
  user: Partial<Omit<User, "user_id">>
): Promise<User | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (user.full_name) {
    fields.push(`full_name = $${index++}`);
    values.push(user.full_name);
  }
  if (user.contact_phone) {
    fields.push(`contact_phone = $${index++}`);
    values.push(user.contact_phone);
  }
  if (user.email) {
    fields.push(`email = $${index++}`);
    values.push(user.email);
  }
  if (user.password) {
    fields.push(`password = $${index++}`);
    values.push(user.password);
  }
  if (user.role_id !== undefined) {
    fields.push(`role_id = $${index++}`);
    values.push(user.role_id);
  }

  if (fields.length === 0) return null;

  values.push(user_id);

  const result = await pool.query<User>(
    `UPDATE users SET ${fields.join(
      ", "
    )} WHERE user_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteUser(user_id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM users WHERE user_id = $1", [
    user_id,
  ]);
  return result.rowCount !== null && result.rowCount > 0;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};
