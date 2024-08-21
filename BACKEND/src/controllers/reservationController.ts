import { Request, Response } from "express";
import {
  findAllReservations,
  findReservationById,
  addReservation,
  modifyReservation,
  removeReservation,
} from "../services/reservationService.js";

export async function getAllReservations(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reservations = await findAllReservations();

    const columns = [
      { headerName: "ID Ticket", field: "id", type: "text", filterable: true },
      { headerName: "Fecha", field: "fecha", type: "text", filterable: true },
      { headerName: "Horario", field: "horario", type: "text", filterable: true },
      {
        headerName: "N° Personas",
        field: "numPersonas",
        type: "text",
        filterable: true,
      },
      {
        headerName: "Estado",
        field: "status",
        type: "select",
        filterable: true,
        options: ["Pendiente", "Asistio", "Cancelado"],
      },
    ];

    const rows = reservations.map((reservation: any) => ({
      id: reservation.reservation_id,
      fecha: reservation.reservation_details.reservation_date || reservation.reservation_details.date,
      horario: reservation.reservation_details.time,
      numPersonas: reservation.reservation_details.people_count || reservation.reservation_details.guest_count,
      status: mapStatus(reservation.state_id),
    }));

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
      return "Asistio";
    case 3:
      return "Cancelado";
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