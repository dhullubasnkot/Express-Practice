import { error } from "console";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [];
export default products;

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export function createProductDetails(input: Omit<Product, "id">): Product {
  const newProduct: Product = {
    id: products.length + 1,
    ...input,
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProductDetails(id: number, input: Omit<Product, "id">) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...input };
  return products[index];
}

export function deleteProductById(id: number) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    error("not found");
  }

  const deleted = products.splice(index, 1)[0];
  return deleted;
}
