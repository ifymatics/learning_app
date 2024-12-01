// export * from "./user.routes"
import express from "express";
import { userRouter } from "./user.routes";
import { subjectRouter } from "./subject.routes";
import { topicRouter } from "./topic.routes";
import { rankRouter } from "./rank.routes";
import { authRouter } from "./auth.routes";

const router = express.Router();
router.use("/users", userRouter);
router.use("/subjects", subjectRouter);
router.use("/topics", topicRouter);
router.use("/ranks", rankRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export { router as appRouter }
