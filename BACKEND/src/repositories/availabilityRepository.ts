import pool from "../config/db.js";

export interface Availability {
  availability_id: number;
  date: Date;
  time: string; 
  table_count: number;
}

export async function getAllAvailability(): Promise<Availability[]> {
  const result = await pool.query<Availability>("SELECT * FROM availability");
  return result.rows;
}

export async function getAvailabilityById(
  availability_id: number
): Promise<Availability | null> {
  const result = await pool.query<Availability>(
    "SELECT * FROM availability WHERE availability_id = $1",
    [availability_id]
  );
  return result.rows[0] || null;
}

export async function createAvailability(
  availability: Omit<Availability, "availability_id">
): Promise<Availability> {
  const result = await pool.query<Availability>(
    "INSERT INTO availability (date, time, table_count) VALUES ($1, $2, $3) RETURNING *",
    [availability.date, availability.time, availability.table_count]
  );
  return result.rows[0];
}

export async function updateAvailability(
  availability_id: number,
  availability: Partial<Omit<Availability, "availability_id">>
): Promise<Availability | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (availability.date) {
    fields.push(`date = $${index++}`);
    values.push(availability.date);
  }
  if (availability.time) {
    fields.push(`time = $${index++}`);
    values.push(availability.time);
  }
  if (availability.table_count !== undefined) {
    fields.push(`table_count = $${index++}`);
    values.push(availability.table_count);
  }

  if (fields.length === 0) return null;

  values.push(availability_id);

  const result = await pool.query<Availability>(
    `UPDATE availability SET ${fields.join(
      ", "
    )} WHERE availability_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteAvailability(
  availability_id: number
): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM availability WHERE availability_id = $1",
    [availability_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
