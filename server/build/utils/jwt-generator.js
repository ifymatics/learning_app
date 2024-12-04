"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (userId) => {
    if (typeof userId !== "string")
        return;
    return new Promise((resolve, reject) => {
        const payload = {};
        let secret = process.env.JWT_ACCESS_TOKEN_KEY;
        let options = {
            expiresIn: "3hr",
            issuer: "elearning.com",
            audience: userId,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
            console.log(err);
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.generateJwtToken = generateJwtToken;
const verifyJwtToken = (token) => {
    let secret = process.env.JWT_ACCESS_TOKEN_KEY;
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, {}, (err, value) => {
            if (err)
                reject(err);
            resolve(value);
        });
    });
};
exports.verifyJwtToken = verifyJwtToken;
