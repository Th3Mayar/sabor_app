import pool from "../config/db";

export interface ReservationSchedule {
  schedule_id: number;
  date: Date;
  time: string; 
  table_count: number;
}

export async function getAllReservationSchedules(): Promise<
  ReservationSchedule[]
> {
  const result = await pool.query<ReservationSchedule>(
    "SELECT * FROM reservation_schedules"
  );
  return result.rows;
}

export async function getReservationScheduleById(
  schedule_id: number
): Promise<ReservationSchedule | null> {
  const result = await pool.query<ReservationSchedule>(
    "SELECT * FROM reservation_schedules WHERE schedule_id = $1",
    [schedule_id]
  );
  return result.rows[0] || null;
}

export async function createReservationSchedule(
  schedule: Omit<ReservationSchedule, "schedule_id">
): Promise<ReservationSchedule> {
  const result = await pool.query<ReservationSchedule>(
    "INSERT INTO reservation_schedules (date, time, table_count) VALUES ($1, $2, $3) RETURNING *",
    [schedule.date, schedule.time, schedule.table_count]
  );
  return result.rows[0];
}

export async function updateReservationSchedule(
  schedule_id: number,
  schedule: Partial<Omit<ReservationSchedule, "schedule_id">>
): Promise<ReservationSchedule | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (schedule.date) {
    fields.push(`date = $${index++}`);
    values.push(schedule.date);
  }
  if (schedule.time) {
    fields.push(`time = $${index++}`);
    values.push(schedule.time);
  }
  if (schedule.table_count !== undefined) {
    fields.push(`table_count = $${index++}`);
    values.push(schedule.table_count);
  }

  if (fields.length === 0) return null;

  values.push(schedule_id);

  const result = await pool.query<ReservationSchedule>(
    `UPDATE reservation_schedules SET ${fields.join(
      ", "
    )} WHERE schedule_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteReservationSchedule(
  schedule_id: number
): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM reservation_schedules WHERE schedule_id = $1",
    [schedule_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
