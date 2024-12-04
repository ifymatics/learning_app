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
exports.isLoggedIn = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_generator_1 = require("../utils/jwt-generator");
dotenv_1.default.config();
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "OPTIONS") {
        next();
    }
    if (!req.headers.cookie) {
        return next();
    }
    else {
        try {
            const UserToken = req.headers.cookie.split("=")[1]; //req.headers.cookie.split(",")[1];
            const { aud } = (yield (0, jwt_generator_1.verifyJwtToken)(UserToken));
            req.currentUserId = aud;
        }
        catch (error) {
            console.log(error.message);
        }
    }
    next();
});
exports.isLoggedIn = isLoggedIn;
