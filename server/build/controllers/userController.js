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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const decrypter_1 = require("../utils/decrypter");
class UserController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            if (!email || !password) {
                res.status(400).json("email or password missing but required");
                return;
            }
            let userRole = role;
            if (!userRole) {
                userRole = '0';
            }
            const hashedPassword = yield (0, decrypter_1.hasher)(password);
            const user = new models_1.UserModel(email, hashedPassword, userRole);
            try {
                const newUser = yield user.create();
                res.send(newUser);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.status(404).json("user not found!");
                return;
            }
            try {
                const user = yield models_1.UserModel.getById(+id);
                res.send(user);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield models_1.UserModel.getAll();
                res.send(allUsers);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.UserController = UserController;
