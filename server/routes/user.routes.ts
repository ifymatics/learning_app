import express from "express";
import { UserController } from "../controllers/userController";
const router = express.Router();

router.post("/", UserController.create);

router.get("/:id", UserController.getById);
router.get("/", UserController.getAll);

export { router as userRouter }