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
exports.UserModel = void 0;
const database_1 = require("../database");
class UserModel {
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.userSchema = database_1.userSchema;
        this.userSchema = database_1.userSchema;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userSchema.create(this.email, this.password, this.role);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.UserSchema.getById(id);
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.UserSchema.getByEmail(email);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.UserSchema.getAll();
        });
    }
}
exports.UserModel = UserModel;
