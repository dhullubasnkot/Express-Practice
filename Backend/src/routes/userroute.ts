import express from "express";
import { getAllUsers, CreateUsers } from "../controllers/user-controller";
// import { getUserNameAndPassword } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers); // works as /users when mounted
router.post("/", CreateUsers);
// router.get("/username", getUserNameAndPassword);
export default router;
