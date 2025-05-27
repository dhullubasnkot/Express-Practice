import express, { Request, Response, NextFunction } from "express";
import Linking from "./routes/productsroutes";
import productsroutes from "./routes/productsroutes";
import { error } from "console";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productsroutes);

// const lock = "ram";
// app.get(
//   "/",
//   (req: Request, res: Response, next: NextFunction) => {
//     const lock = req.query.name;

//     if (lock === "ram") {
//       next();
//     } else {
//       res.send("Access Denied");
//     }
//   },
//   (req: Request, res: Response) => {
//     res.send("Hello World!");
//   }
// );
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   res.status(500).send("Internal Server Error");
// });
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Received", error);
  if (error.status === 404 || error.status === 400 || error.status === 403) {
    res.status(error.status).json({ error });
    return;
  }
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
app.use("/products", productsroutes);
// app.use("/productss", productsroutes);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
