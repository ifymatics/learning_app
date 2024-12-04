"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// export * from "./user.routes"
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./user.routes");
const subject_routes_1 = require("./subject.routes");
const topic_routes_1 = require("./topic.routes");
const rank_routes_1 = require("./rank.routes");
const auth_routes_1 = require("./auth.routes");
const router = express_1.default.Router();
exports.appRouter = router;
router.use("/users", user_routes_1.userRouter);
router.use("/subjects", subject_routes_1.subjectRouter);
router.use("/topics", topic_routes_1.topicRouter);
router.use("/ranks", rank_routes_1.rankRouter);
router.use("/users", user_routes_1.userRouter);
router.use("/auth", auth_routes_1.authRouter);
