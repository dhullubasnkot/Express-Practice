import { Request, Response } from "express";
import { SqlLoginModel } from "../sql-models/login-sql-model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await SqlLoginModel.getUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const CreateUsers = (req: Request, res: Response) => {
  const { username, name, email, address, phone, password } = req.body;

  SqlLoginModel.createUser({
    username,
    name,
    email,
    address,
    phone,
    password,
  })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error: any) => {
      console.error("Create user error:", error.message || error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};
// export const getUserNameAndPassword = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   try {
//     const user = await SqlLoginModel.getUserNameAndPassword(username, password);
//     res.status(200).json(user);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Login error:", error.message);
//     } else {
//       console.error("Login error:", error);
//     }
//     res.status(401).json({ error: "Invalid username or password" });
//   }
// };
