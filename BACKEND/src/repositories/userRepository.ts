import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export interface User {
  resetPasswordExpires: number;
  user_id: number;
  full_name: string;
  contact_phone: string | null;
  email: string;
  password: string;
  role_id: number | null;
  token?: string;
}

const defaultColumnOrder = [
  { type: "text", field: "id", filterable: true, headerName: "ID" },
  { type: "text", field: "fullName", filterable: true, headerName: "Nombre" },
  { type: "text", field: "fecha", filterable: true, headerName: "Fecha" },
  { type: "text", field: "horario", filterable: true, headerName: "Horario" },
  {
    type: "text",
    field: "numPersonas",
    filterable: true,
    headerName: "N° Personas",
  },
  { type: "text", field: "phone", filterable: true, headerName: "Teléfono" },
  { type: "text", field: "email", filterable: true, headerName: "Email" },
  {
    type: "select",
    field: "status",
    options: ["Pendiente", "Asistio", "Cancelado"],
    filterable: true,
    headerName: "Estado",
  },
];

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
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userResult = await client.query<User>(
      "INSERT INTO users (full_name, contact_phone, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        user.full_name,
        user.contact_phone,
        user.email,
        user.password,
        user.role_id,
      ]
    );

    const newUser = userResult.rows[0];

    await client.query(
      "INSERT INTO user_column_order (user_id, column_order) VALUES ($1, $2)",
      [newUser.user_id, JSON.stringify(defaultColumnOrder)]
    );

    const token = jwt.sign(
      { user_id: newUser.user_id, email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    await client.query("COMMIT");

    return { ...newUser, token };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error en createUser:", error);
    throw error;
  } finally {
    client.release();
  }
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
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};
