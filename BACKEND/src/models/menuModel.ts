export interface Menu {
  menu_id: number;
  name: string;
  description: string;
  image: string;
  state_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface MenuDish {
  menu_dish_id: number;
  menu_id: number;
  dish_id: number;
  price: number;
}
