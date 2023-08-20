import { Product } from "./Product";

export interface CartItem extends Product {
  total: number;
  sum: number;
  cartId: string;
}
