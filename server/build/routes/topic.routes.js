"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRouter = void 0;
const express_1 = __importDefault(require("express"));
const topicController_1 = require("../controllers/topicController");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
exports.topicRouter = router;
router.post("/", isAdmin_1.isAdmin, topicController_1.TopicController.create);
router.get("/subject/:subjectId", topicController_1.TopicController.getBySubjectId);
router.get("/:id", topicController_1.TopicController.getById);
router.get("/", topicController_1.TopicController.getAll);
