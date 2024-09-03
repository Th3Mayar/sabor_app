import {
  Reservation,
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../repositories/reservationRepository.js";

export async function findAllReservations(
  limit: number,
  offset: number
): Promise<{ reservations: Reservation[]; totalCount: number }> {
  return getAllReservations(limit, offset);
}

export async function findReservationById(
  reservation_id: number
): Promise<Reservation | null> {
  return getReservationById(reservation_id);
}

export async function addReservation(
  reservation: Omit<Reservation, "reservation_id" | "creation_date">
): Promise<Reservation> {
  return createReservation(reservation);
}

export async function modifyReservation(
  reservation_id: number,
  reservation: Partial<Omit<Reservation, "reservation_id" | "creation_date">>
): Promise<Reservation | null> {
  return updateReservation(reservation_id, reservation);
}

export async function removeReservation(
  reservation_id: number
): Promise<boolean> {
  return deleteReservation(reservation_id);
}
