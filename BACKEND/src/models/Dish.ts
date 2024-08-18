export interface Dish {
  dish_id: number;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  section: string;
}
