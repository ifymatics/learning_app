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
exports.RankModel = void 0;
const database_1 = require("../database");
class RankModel {
    // { "userId":1,"subjectId":1, "completed":true, "rate":"20min", "topicscompleted":1}
    constructor(userId, subjectId, completed, rate, topicsCount, topicId) {
        this.userId = userId;
        this.subjectId = subjectId;
        this.completed = completed;
        this.rate = rate;
        this.topicsCount = topicsCount;
        this.topicId = topicId;
        this.rankSchema = database_1.rankSchema;
        this.rankSchema = database_1.rankSchema;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rankSchema.create(this.userId, this.subjectId, false, this.rate, this.topicsCount, this.topicId);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.RankSchema.getById(id);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.RankSchema.getAll();
        });
    }
    static findByUserIdAndSubjectId(userId, subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.RankSchema.findByUserIdAndSubjectId(userId, subjectId);
        });
    }
    static findBySubjectId(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.RankSchema.findBySubjectId(subjectId);
        });
    }
    static update(userId, subjectId, completed, topicCount, rate, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.RankSchema.update(userId, subjectId, completed, rate, topicCount, topicId);
        });
    }
}
exports.RankModel = RankModel;
function setTimer() {
}
