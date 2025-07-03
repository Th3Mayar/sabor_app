import { ReservationDetails } from "./index";

export interface Reservation {
  reservation_id: number;
  user_id: number;
  reservation_details: ReservationDetails;
  state_id: number;
  creation_date: Date;
}