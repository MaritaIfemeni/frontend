export interface NewProduct {
  productName: string;
  price: number;
  stock: number;
  description: string;
  productImages: {
    link: string;
  }[];
}
