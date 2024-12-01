import express from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
const router = express.Router();

router.post("/login", AuthController.login);

// router.get("/:id", UserController.getById);
// router.get("/", UserController.getAll);

export { router as authRouter }