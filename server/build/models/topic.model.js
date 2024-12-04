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
exports.TopicModel = void 0;
const database_1 = require("../database");
class TopicModel {
    constructor(title, video, description, subjectId) {
        this.title = title;
        this.video = video;
        this.description = description;
        this.subjectId = subjectId;
        this.topicSchema = database_1.topicSchema;
        this.topicSchema = database_1.topicSchema;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topicSchema.create(this.title, this.video, this.description, this.subjectId);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.TopicSchema.getById(id);
        });
    }
    static getBySubjectId(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.TopicSchema.getBySubjectId(subjectId);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.TopicSchema.getAll();
        });
    }
}
exports.TopicModel = TopicModel;
