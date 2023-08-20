import { Product } from "../types/Product";

const getFilteredList = (products: Product[], search: string) => {
  if (search !== "") {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
  }
  return [];
};

export default getFilteredList;
