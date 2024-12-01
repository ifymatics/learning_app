import express from "express";
import { RankController } from "../controllers/rankController";
import { isAdmin } from "../middlewares/isAdmin";
const router = express.Router();

router.post("/", RankController.create);
router.patch("/", isAdmin, RankController.update);
router.get("/subject/:subjectId", RankController.getBySubject);
router.get("/:id", RankController.getById);
router.get("/", RankController.getAll);
export { router as rankRouter }