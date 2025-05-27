import { getProductById } from "../model/product";
import pool from "./mysql-client";
export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  //get by id
  async getProductById(id: number) {
    const [rows] = (await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ])) as [any[], any];
    if ((rows as any[]).length === 0) {
      throw new Error(`Product with the ${id} not Found`);
    }
    return rows[0];
  },
};
