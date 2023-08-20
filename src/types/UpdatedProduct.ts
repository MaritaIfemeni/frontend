export interface UpdatedProduct {
  id: string;
  data: {
    productName: string;
    price: number;
    stock: number;
    description: string;
    productImages: {
      link: string;
    }[];
  };
}
