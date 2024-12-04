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
exports.durationSchema = exports.DurationSchema = void 0;
const db_1 = __importStar(require("../db"));
class DurationSchema {
    constructor() {
        // this.durationTable()
    }
    create(userId, subjectId, topicId, completed, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            let duration;
            try {
                const durationExists = yield DurationSchema.getByUserId(userId, subjectId, topicId);
                if (durationExists) {
                    // console.log(durationExists)
                    return durationExists;
                    //return await DurationSchema.update(userId, topicId, completed, durationExists.rate + rate)
                }
                duration = yield (0, db_1.default) `insert into durations (userId,subjectId, topicId, completed, rate) values(${userId}, ${subjectId}, ${topicId}, ${completed}, ${rate}) returning id, rate, topicId `;
                return duration[0];
            }
            catch (error) {
                console.log(error.message);
                if (error.message === 'relation "durations" does not exist') {
                    return yield (0, db_1.durationTable)("durations");
                }
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const durations = yield (0, db_1.default) `SELECT * FROM durations WHERE id = ${id}`;
                if (!durations.length)
                    throw new Error('Not found');
                return durations[0];
            }
            catch (error) {
                if (error.essage === "Not found") {
                    return error.message;
                }
            }
        });
    }
    static getByUserId(userId, subjectId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const durations = yield (0, db_1.default) `SELECT * FROM durations WHERE userId = ${userId} AND topicId = ${topicId} AND subjectId = ${subjectId} AND completed = false`;
                if (!durations.length)
                    throw new Error('Not found');
                return durations[0];
            }
            catch (error) {
                // if (error.essage === "Not found") {
                //     return error.message
                // }
                return;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default) `SELECT * FROM durations`;
        });
    }
    static update(userId, subjectId, topicId, completed, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDuration = { completed: completed, rate: rate };
                const updated = yield (0, db_1.default) `UPDATE durations SET ${(0, db_1.default)(updatedDuration, 'completed', 'rate')} where userId = ${userId} AND subjectId = ${subjectId}  AND topicId = ${topicId} AND completed = false  returning id, rate, topicId`;
                return updated;
            }
            catch (error) {
                return error.message;
            }
        });
    }
}
exports.DurationSchema = DurationSchema;
exports.durationSchema = new DurationSchema();
