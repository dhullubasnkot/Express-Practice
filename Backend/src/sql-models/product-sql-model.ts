import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";
export const SqlProductModel = {
  // get all products
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },
  // get products by id
  async getById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    return rows[0];
  },
  //delete product by id
  async DeleteById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);

    console.log(`Product with id ${id} deleted successfully`);
    return;
  },
  //update product by id
  async UpdateProduct(
    id: number,
    p0: {
      name: any;
      price: any;
      description: any;
      stock_quantity: any;
      image?: string;
    }
  ) {
    try {
      console.log("Checking if product exists with id:", id);
      const [rows] = await pool.query<any[]>(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        throw new Error(`Product with id ${id} not found`);
      }

      // Prepare updated product data by merging existing row and new data
      const updatedProduct = {
        ...rows[0],
        name: p0.name,
        description: p0.description,
        price: p0.price,
        stock_quantity: p0.stock_quantity,
        image: p0.image !== undefined ? p0.image : rows[0].image,
      };

      console.log("Updating product with data:", updatedProduct);

      // Build SQL and params conditionally to include image only if provided
      if (p0.image !== undefined) {
        await pool.query(
          "UPDATE products SET name=?, description=?, price=?, stock_quantity=?, image=? WHERE id = ?",
          [p0.name, p0.description, p0.price, p0.stock_quantity, p0.image, id]
        );
      } else {
        await pool.query(
          "UPDATE products SET name=?, description=?, price=?, stock_quantity=? WHERE id = ?",
          [p0.name, p0.description, p0.price, p0.stock_quantity, id]
        );
      }

      console.log(`Product with id ${id} updated successfully`);

      return updatedProduct;
    } catch (error) {
      console.error("SQL error:", error);
      throw error;
    }
  },
  //Create New Product
  async createProductDetails(p0: {
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
    image?: string;
  }) {
    const { name, price, description, stock_quantity, image } = p0;

    const [result] = await pool.query<any>(
      "INSERT INTO products (name, price, description, stock_quantity, image) VALUES (?, ?, ?, ?, ?)",
      [name, price, description, stock_quantity, image || null]
    );

    const newProductId = result.insertId;

    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [newProductId]
    );

    return rows[0];
  },
};
