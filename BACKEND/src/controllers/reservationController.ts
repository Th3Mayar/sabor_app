import { Request, Response } from "express";
import {
  findAllReservations,
  findReservationById,
  addReservation,
  modifyReservation,
  removeReservation,
} from "../services/reservationService.js";
import { getUserColumnOrder } from "../repositories/columnOrderRepository.js";

export async function getAllReservations(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservations = await findAllReservations();

    const columns = await getUserColumnOrder(
      Number(req.user ? req.user.id : 0)
    );

    const rows = reservations.map((reservation: any) => {
      const { reservation_details } = reservation;

      return {
        id: reservation.reservation_id,
        fecha: reservation_details.reservation_date || reservation_details.date,
        horario: reservation_details.time,
        numPersonas:
          reservation_details.people_count || reservation_details.guest_count,
        status: mapStatus(reservation.state_id),
        email: reservation_details.email,
        phone: reservation_details.phone,
        fullName: reservation_details.fullName,
        additional_comments: reservation_details.additional_comments,
      };
    });

    res.status(200).json({ columns, rows });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservations", error });
  }
}

function mapStatus(state_id: number): string {
  switch (state_id) {
    case 1:
      return "Pendiente";
    case 2:
      return "Atendido";
    case 3:
      return "Cancelado";
    case 4:
      return "Activo";
    case 5:
      return "Inactivo";
    case 6:
      "En revisión";
    default:
      return "Desconocido";
  }
}

export async function getReservationById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await findReservationById(Number(req.params.id));
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservation", error });
  }
}

export async function createReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await addReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create reservation", error });
  }
}

export async function updateReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservation = await modifyReservation(
      Number(req.params.id),
      req.body
    );
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update reservation", error });
  }
}

export async function deleteReservation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeReservation(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reservation", error });
  }
}
