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
exports.topicSchema = exports.TopicSchema = void 0;
const db_1 = __importStar(require("../db"));
class TopicSchema {
    constructor() { }
    create(title, video, description, subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTopic;
            try {
                newTopic = yield (0, db_1.default) `insert into topics (title, video, description, subjectId) values(${title}, ${video}, ${description}, ${subjectId}) returning title, id, subjectId`;
                return newTopic;
            }
            catch (error) {
                console.log(error.message);
                if (error.message === 'relation "topics" does not exist') {
                    return yield (0, db_1.topicTable)("topics");
                }
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topic = yield (0, db_1.default) `SELECT * FROM topics WHERE id = ${id}`;
                if (!topic.length)
                    throw new Error('Not found');
                return topic[0];
            }
            catch (error) {
                if (error.essage === "Not found") {
                    return error.message;
                }
            }
        });
    }
    static getBySubjectId(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topics = yield (0, db_1.default) `SELECT * FROM topics WHERE subjectId = ${subjectId} `;
                if (!topics.length)
                    throw new Error('Not found');
                return topics;
            }
            catch (error) {
                if (error.essage === "Not found") {
                    return error.message;
                }
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default) `SELECT * FROM topics`;
        });
    }
}
exports.TopicSchema = TopicSchema;
exports.topicSchema = new TopicSchema();
