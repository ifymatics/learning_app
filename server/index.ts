import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser"
import helmet from "helmet"
import { appRouter } from "./routes";
import { createTables } from "./database";
import { isLoggedIn } from "./middlewares/isLoggedIn";

const corsOptions = {
    origin: function (origin: string, callback: any) {
        if (["http://localhost:3000"].indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {

            callback(null, true);
        }
    },
};
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

helmet({ contentSecurityPolicy: false });
app.use((req: Request, res: Response, next: NextFunction) => {

    res.header("Access-Control-Allow-Credentials", "true");

    next();
});
app.use(cors(corsOptions as CorsOptions));

app.use("/api", isLoggedIn, appRouter);
app.listen(5000, async () => {
    await createTables();
    console.log("listening on port 5000")
})