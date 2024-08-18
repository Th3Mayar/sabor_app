import {
  ReservationSchedule,
  getAllReservationSchedules,
  getReservationScheduleById,
  createReservationSchedule,
  updateReservationSchedule,
  deleteReservationSchedule,
} from "../repositories/reservationScheduleRepository.js";

export async function findAllReservationSchedules(): Promise<
  ReservationSchedule[]
> {
  return getAllReservationSchedules();
}

export async function findReservationScheduleById(
  schedule_id: number
): Promise<ReservationSchedule | null> {
  return getReservationScheduleById(schedule_id);
}

export async function addReservationSchedule(
  schedule: Omit<ReservationSchedule, "schedule_id">
): Promise<ReservationSchedule> {
  return createReservationSchedule(schedule);
}

export async function modifyReservationSchedule(
  schedule_id: number,
  schedule: Partial<Omit<ReservationSchedule, "schedule_id">>
): Promise<ReservationSchedule | null> {
  return updateReservationSchedule(schedule_id, schedule);
}

export async function removeReservationSchedule(
  schedule_id: number
): Promise<boolean> {
  return deleteReservationSchedule(schedule_id);
}
