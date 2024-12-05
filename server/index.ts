import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser"
import helmet from "helmet"
import path from "path";
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
app.use(express.static(path.join("public")));
app.use(cors(corsOptions as CorsOptions));

app.use("/api", isLoggedIn, appRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, async () => {
    await createTables();
    console.log(`listening on port ${PORT}`)
})