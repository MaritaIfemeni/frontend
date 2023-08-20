export interface Product {
  id: string;
  productName: string;
  price: number;
  description: string;
  productImages: {
    link: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
