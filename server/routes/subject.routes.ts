import express from "express";
import { SubjectController } from "../controllers/subjectController";
import { isAdmin } from "../middlewares/isAdmin";
const router = express.Router();

router.post("/", isAdmin, SubjectController.create);
router.get("/:id", SubjectController.getById);
router.get("/", SubjectController.getAll);
export { router as subjectRouter }