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
exports.SubjectModel = void 0;
const database_1 = require("../database");
class SubjectModel {
    constructor(name) {
        this.name = name;
        this.subjectSchema = database_1.subjectSchema;
        this.subjectSchema = database_1.subjectSchema;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subjectSchema.create(this.name);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.SubjectSchema.getById(id);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield database_1.SubjectSchema.getAll();
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}
exports.SubjectModel = SubjectModel;
