import { CartItem } from "./CartItem";

export interface CartType {
  items: CartItem[];
  totalSum: number;
  totalProducts: number;
}
