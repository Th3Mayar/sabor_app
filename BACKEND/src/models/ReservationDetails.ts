interface ReservationDetails {
  date: string; 
  time: string; 
  table_number: number;
  guest_count: number;
  special_requests?: string; 
  occasion?: string; 
  dishes?: {
    dish_id: number;
    quantity: number;
  }[];
}
