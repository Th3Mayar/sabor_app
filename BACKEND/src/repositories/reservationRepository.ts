import pool from "../config/db.js";

export interface Reservation {
  client_id: any;
  table_id: any;
  time: any;
  date: any;
  reservation_id: number;
  user_id: number;
  reservation_details: object;
  state_id: number;
  creation_date: Date;
}

export async function getAllReservations(): Promise<Reservation[]> {
  const result = await pool.query<Reservation>("SELECT * FROM reservations");
  return result.rows;
}

export async function getReservationById(
  reservation_id: number
): Promise<Reservation | null> {
  const result = await pool.query<Reservation>(
    "SELECT * FROM reservations WHERE reservation_id = $1",
    [reservation_id]
  );
  return result.rows[0] || null;
}

export async function createReservation(
  reservation: Omit<Reservation, "reservation_id" | "creation_date">
): Promise<Reservation> {
  const result = await pool.query<Reservation>(
    "INSERT INTO reservations (user_id, reservation_details, state_id) VALUES ($1, $2, $3) RETURNING *",
    [reservation.user_id, reservation.reservation_details, reservation.state_id]
  );
  return result.rows[0];
}

export async function updateReservation(
  reservation_id: number,
  reservation: Partial<Omit<Reservation, "reservation_id" | "creation_date">>
): Promise<Reservation | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (reservation.user_id) {
    fields.push(`user_id = $${index++}`);
    values.push(reservation.user_id);
  }
  if (reservation.reservation_details) {
    fields.push(`reservation_details = $${index++}`);
    values.push(reservation.reservation_details);
  }
  if (reservation.state_id) {
    fields.push(`state_id = $${index++}`);
    values.push(reservation.state_id);
  }

  if (fields.length === 0) return null;

  values.push(reservation_id);

  const result = await pool.query<Reservation>(
    `UPDATE reservations SET ${fields.join(
      ", "
    )} WHERE reservation_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteReservation(
  reservation_id: number
): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM reservations WHERE reservation_id = $1",
    [reservation_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
