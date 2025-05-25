import express, { Request, Response, NextFunction } from "express";
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productscontroller";
// import { firstMiddleware } from "../middlaware/first-middleware";

const router = express.Router();

// router.get("/first", firstMiddleware);
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.post(
  "/",
  // (req: Request, res: Response, next: NextFunction) => {
  //   const role = req.query.role;
  //   if (role === "admin") {
  //     next();
  //   } else {
  //     next({ error: "Access Denied", status: 403 });
  //   }
  // },
  createProductController
);
router.put("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;
