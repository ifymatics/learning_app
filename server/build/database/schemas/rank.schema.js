"use strict";
// { "userId":1,"subjectId":1, "completed":true, "rate":"20min", "topicscompleted":1}
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
exports.rankSchema = exports.RankSchema = void 0;
const db_1 = __importStar(require("../db"));
class RankSchema {
    constructor() { }
    create(userId, subjectId, completed, rate, topicsCount, topicscompleted) {
        return __awaiter(this, void 0, void 0, function* () {
            let newRank;
            try {
                newRank = yield (0, db_1.default) `insert into ranks (userId, subjectId, completed, rate,topicsCount, topicscompleted) values(${userId}, ${subjectId}, ${completed}, ${rate}, ${topicsCount}, ${[topicscompleted]}) returning id`;
                return newRank;
            }
            catch (error) {
                console.log(error.message);
                if (error.message === 'relation "ranks" does not exist') {
                    return yield (0, db_1.rankTable)("ranks");
                }
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rank = yield (0, db_1.default) `SELECT * FROM ranks WHERE id = ${id}`;
            if (!rank.length)
                throw new Error('Not found');
            return rank[0];
        });
    }
    static findBySubjectId(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rank = yield (0, db_1.default) `SELECT ranks.id as id,rate,  userId, subjectId,email FROM ranks inner join users on users.id = ranks.userId  WHERE subjectId = ${subjectId} ORDER BY completed DESC, topicscompleted DESC, rate ASC`;
                if (!rank.length)
                    throw new Error('Not found');
                return rank;
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default) `SELECT * FROM ranks ORDER BY completed DESC, topicscompleted DESC, rate ASC`;
        });
    }
    static findByUserIdAndSubjectId(userId, subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rank = yield (0, db_1.default) `SELECT * FROM ranks WHERE userId = ${userId} AND subjectId = ${subjectId}  ORDER BY completed DESC, array_length(topicscompleted, 1) DESC, rate ASC`;
                if (!rank.length)
                    return;
                return rank[0];
            }
            catch (error) {
                console.log(error);
                if (error.message === 'relation "ranks" does not exist') {
                    return yield (0, db_1.rankTable)("ranks");
                }
            }
        });
    }
    static update(userId, subjectId, completed, rate, topicCount, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            // "id": 1,
            //  "completed": true,
            //  "rate": "20min",
            //  "topicscompleted": [1],
            //  "userid": 1,
            //  "subjectid": 1
            try {
                const rank = yield RankSchema.findByUserIdAndSubjectId(userId, subjectId);
                console.log(completed);
                if (rank) {
                    if (rank.topicscount > rank.topicscompleted.length && !rank.topicscompleted.includes(topic)) {
                        const updateddRank = { completed: completed, topicscompleted: [...rank.topicscompleted, topic], rate: rank.rate + rate };
                        if (rank.topicscount > rank.topicscompleted.length + 1) {
                            updateddRank.completed = false;
                        }
                        else {
                            updateddRank.completed = true;
                        }
                        const updated = yield (0, db_1.default) `UPDATE ranks SET ${(0, db_1.default)(updateddRank, 'completed', 'rate', 'topicscompleted')} where id = ${rank.id} returning id, topicscompleted`;
                        return updated;
                    }
                    return rank;
                }
                return rank;
            }
            catch (error) {
            }
        });
    }
}
exports.RankSchema = RankSchema;
exports.rankSchema = new RankSchema();
