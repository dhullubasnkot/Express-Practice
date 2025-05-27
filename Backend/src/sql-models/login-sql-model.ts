import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";
export const SqlLoginModel = {
  async getUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },
  async createUser(user: {
    username: string;
    name: string;
    email: string;
    address: string;
    password: string;
    phone: string;
  }) {
    const { username, name, email, address, password, phone } = user;
    const [result] = await pool.query(
      "INSERT INTO users (username, name, email, address, password, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [username, name, email, address, password, phone]
    );
    const insertId = (result as any).insertId;
    return {
      id: insertId,
      username,
      name,
      email,
      address,
      phone,
      password,
    };
  },
  //   async getUserNameAndPassword(username: string, password: string) {
  //     const [rows] = await pool.query<any[]>(
  //       "SELECT * FROM users WHERE username = ? AND password = ?",
  //       [username, password]
  //     );
  //     if (rows.length === 0) {
  //       throw new Error("Invalid username or password");
  //     }
  //     return rows[0];
  //   },
};
