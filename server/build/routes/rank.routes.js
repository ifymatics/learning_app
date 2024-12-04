"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankRouter = void 0;
const express_1 = __importDefault(require("express"));
const rankController_1 = require("../controllers/rankController");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
exports.rankRouter = router;
router.post("/", rankController_1.RankController.create);
router.patch("/", isAdmin_1.isAdmin, rankController_1.RankController.update);
router.get("/subject/:subjectId", rankController_1.RankController.getBySubject);
router.get("/:id", rankController_1.RankController.getById);
router.get("/", rankController_1.RankController.getAll);
