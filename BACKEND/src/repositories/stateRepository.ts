import pool from "../config/db.js";

export interface State {
  state_id: number;
  name: string;
  description: string | null;
}

export async function getAllStates(): Promise<State[]> {
  const result = await pool.query<State>("SELECT * FROM states");
  return result.rows;
}

export async function getStateById(state_id: number): Promise<State | null> {
  const result = await pool.query<State>(
    "SELECT * FROM states WHERE state_id = $1",
    [state_id]
  );
  return result.rows[0] || null;
}

export async function createState(
  state: Omit<State, "state_id">
): Promise<State> {
  const result = await pool.query<State>(
    "INSERT INTO states (name, description) VALUES ($1, $2) RETURNING *",
    [state.name, state.description]
  );
  return result.rows[0];
}

export async function updateState(
  state_id: number,
  state: Partial<Omit<State, "state_id">>
): Promise<State | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (state.name) {
    fields.push(`name = $${index++}`);
    values.push(state.name);
  }
  if (state.description) {
    fields.push(`description = $${index++}`);
    values.push(state.description);
  }

  if (fields.length === 0) return null;

  values.push(state_id);

  const result = await pool.query<State>(
    `UPDATE states SET ${fields.join(
      ", "
    )} WHERE state_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteState(state_id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM states WHERE state_id = $1", [
    state_id,
  ]);
  return result.rowCount !== null && result.rowCount > 0;
}
