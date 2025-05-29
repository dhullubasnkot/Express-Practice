import express, { Request, Response, NextFunction } from "express";
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productscontroller";
import { upload } from "../middlaware/multer";

const router = express.Router();
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.post(
  "/",
  upload.single("image"),

  createProductController
);
router.put("/:id", upload.single("image"), updateProductController);

router.delete("/:id", deleteProductController);

export default router;
