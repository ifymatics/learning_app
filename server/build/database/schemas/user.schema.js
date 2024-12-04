"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userSchema = exports.UserSchema = void 0;
const db_1 = __importStar(require("../db"));
class UserSchema {
    constructor() {
        // this.userTable()
    }
    create(email, password, role, first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                console.log(email, password);
                user = yield (0, db_1.default) `insert into users (email, password, role) values(${email}, ${password}, ${role}) returning email, id`;
                return user;
            }
            catch (error) {
                console.log(error);
                if (error.message === 'relation "users" does not exist') {
                    return yield (0, db_1.userTable)("users");
                }
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, db_1.default) `SELECT * FROM users WHERE id = ${id}`;
                if (!users.length)
                    throw new Error('Not found');
                return users[0];
            }
            catch (error) {
                if (error.essage === "Not found") {
                    return error.message;
                }
            }
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, db_1.default) `SELECT * FROM users WHERE email = ${email}`;
                if (!users.length)
                    throw new Error('Not found');
                return users[0];
            }
            catch (error) {
                if (error.message === "Not found") {
                    console.log(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default) `SELECT * FROM users`;
        });
    }
}
exports.UserSchema = UserSchema;
exports.userSchema = new UserSchema();
