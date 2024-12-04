"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const database_1 = require("./database");
const isLoggedIn_1 = require("./middlewares/isLoggedIn");
const corsOptions = {
    origin: function (origin, callback) {
        if (["http://localhost:3000"].indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
};
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, helmet_1.default)({ contentSecurityPolicy: false });
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.static(path_1.default.join("public")));
app.use((0, cors_1.default)(corsOptions));
app.use("/api", isLoggedIn_1.isLoggedIn, routes_1.appRouter);
app.use((req, res, next) => {
    res.sendFile(path_1.default.resolve(__dirname, "public", "index.html"));
});
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.createTables)();
    console.log("listening on port 5000");
}));
