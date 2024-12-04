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
exports.RankController = void 0;
const rank_model_1 = require("../models/rank.model");
const database_1 = require("../database");
const compute_duration_1 = require("../utils/compute-duration");
class RankController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, subjectId, completed = false, rate = "0min", topicsCount, topicId } = req.body;
            if (!userId || !subjectId || !topicId || !topicsCount) {
                return res.status(400).json("User ID or Subject ID or topicID is missing but required");
            }
            const isCompleted = false;
            try {
                const rankExists = yield rank_model_1.RankModel.findByUserIdAndSubjectId(userId, subjectId);
                const duration = yield database_1.DurationSchema.getByUserId(userId, subjectId, topicId);
                const realRate = (0, compute_duration_1.computeDuration)() - Number(duration.rate);
                if (rankExists) {
                    // console.log("HITTING RANK", duration)
                    // console.log("realRATE", realRate)
                    const update = yield rank_model_1.RankModel.update(+userId, +subjectId, isCompleted, realRate, topicsCount, +topicId);
                    return res.status(200).json(update);
                }
                const rank = new rank_model_1.RankModel(userId, subjectId, isCompleted, realRate, topicsCount, topicId);
                const newRank = yield rank.create();
                return res.status(200).json(newRank);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            // console.log(user)
            try {
                const subject = yield rank_model_1.RankModel.getById(+id);
                res.send(subject);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getBySubject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subjectId } = req.params;
            // console.log(user)
            try {
                const subject = yield rank_model_1.RankModel.findBySubjectId(+subjectId);
                res.send(subject);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allRanks = yield rank_model_1.RankModel.getAll();
                res.send(allRanks);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, subjectId, completed, rate, topicsCount, topicId } = req.body;
            if (!userId || !subjectId || !rate || !topicId) {
                return res.status(400).json(" userID or SubjectID  or rate or topicId is missing but required");
            }
            //console.log(userId, subjectId, completed, rate, topicId)
            try {
                const updatedRank = yield rank_model_1.RankModel.update(+userId, +subjectId, completed, rate, topicsCount, +topicId);
                res.status(200).json(updatedRank);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.RankController = RankController;
