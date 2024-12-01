import express from "express";
import { TopicController } from "../controllers/topicController";
import { isAdmin } from "../middlewares/isAdmin";
const router = express.Router();

router.post("/", isAdmin, TopicController.create);
router.get("/subject/:subjectId", TopicController.getBySubjectId);
router.get("/:id", TopicController.getById);
router.get("/", TopicController.getAll);

export { router as topicRouter }