import pool from '../config/db.js';

export interface Role {
  role_id: number;
  name: string;
}

export async function getAllRoles(): Promise<Role[]> {
  const result = await pool.query<Role>('SELECT * FROM roles');
  return result.rows;
}

export async function getRoleById(role_id: number): Promise<Role | null> {
  const result = await pool.query<Role>('SELECT * FROM roles WHERE role_id = $1', [role_id]);
  return result.rows[0] || null;
}

export async function createRole(name: string): Promise<Role> {
  const result = await pool.query<Role>(
    'INSERT INTO roles (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
}

export async function updateRole(role_id: number, name: string): Promise<Role | null> {
  const result = await pool.query<Role>(
    'UPDATE roles SET name = $1 WHERE role_id = $2 RETURNING *',
    [name, role_id]
  );
  return result.rows[0] || null;
}

export async function deleteRole(role_id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM roles WHERE role_id = $1', [role_id]);
  return result.rowCount !== null && result.rowCount > 0;
}
