"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const subjectController_1 = require("../controllers/subjectController");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
exports.subjectRouter = router;
router.post("/", isAdmin_1.isAdmin, subjectController_1.SubjectController.create);
router.get("/:id", subjectController_1.SubjectController.getById);
router.get("/", subjectController_1.SubjectController.getAll);
