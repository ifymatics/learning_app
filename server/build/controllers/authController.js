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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const models_1 = require("../models");
const jwt_generator_1 = require("../utils/jwt-generator");
const decrypter_1 = require("../utils/decrypter");
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //console.log(email, password)
            if (!email || !password) {
                res.status(400).json("email or password missing but required");
                return;
            }
            try {
                const user = yield models_1.UserModel.getByEmail(email);
                console.log(user);
                // Check password validity
                if (!user) {
                    return res.status(404).json("User not found");
                }
                const passwordMatch = yield (0, decrypter_1.decrypter)(user.password, password);
                if (!passwordMatch)
                    throw new Error("Invalid credentials");
                // generate jwt token for user
                const userToken = yield (0, jwt_generator_1.generateJwtToken)(user.id.toString());
                const { password: pass } = user, others = __rest(user, ["password"]);
                return res
                    .cookie("accessToken", userToken, { httpOnly: true })
                    .status(200)
                    .json(Object.assign({}, others));
            }
            catch (error) {
                let message = "Authentication failed";
                let statusCode = 500;
                if (error.message === "Not found") {
                    message = "User not found!";
                    statusCode = 404;
                }
                else if (error.message === "Invalid credentials") {
                    message = "Invalid credentials!";
                    statusCode = 403;
                }
                res.status(statusCode).json(message);
            }
        });
    }
}
exports.AuthController = AuthController;
