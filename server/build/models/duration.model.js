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
exports.DurationModel = void 0;
const database_1 = require("../database");
class DurationModel {
    constructor(userId, subjectId, topicId, completed, rate) {
        this.userId = userId;
        this.subjectId = subjectId;
        this.topicId = topicId;
        this.completed = completed;
        this.rate = rate;
        this.durationSchema = database_1.durationSchema;
        this.durationSchema = database_1.durationSchema;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.durationSchema.create(this.userId, this.subjectId, this.topicId, this.completed, this.rate);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.DurationSchema.getById(id);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.DurationSchema.getAll();
        });
    }
    static update(userId, subjectId, topicId, completed, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.DurationSchema.update(userId, subjectId, topicId, completed, rate);
        });
    }
}
exports.DurationModel = DurationModel;
