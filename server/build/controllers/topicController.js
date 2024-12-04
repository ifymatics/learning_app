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
exports.TopicController = void 0;
const topic_model_1 = require("../models/topic.model");
const models_1 = require("../models");
const compute_duration_1 = require("../utils/compute-duration");
const rank_model_1 = require("../models/rank.model");
const modifyTopics_1 = require("../utils/modifyTopics");
class TopicController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, video, description, subjectId } = req.body;
            if (!title) {
                res.status(400).json("title missing but required");
                return;
            }
            if (!video) {
                res.status(400).json("video missing but required");
                return;
            }
            if (!description) {
                res.status(400).json("description missing but required");
                return;
            }
            if (!subjectId) {
                res.status(400).json("subject ID  missing but required");
                return;
            }
            const topic = new topic_model_1.TopicModel(title, video, description, subjectId);
            try {
                const newTopic = yield topic.create();
                res.send(newTopic);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.currentUserId;
            const subjectId = req.query.subjectId;
            if (!id) {
                res.status(404).json("topic not found!");
                return;
            }
            if (!subjectId) {
                res.status(400).json("subject Id required but missing!");
                return;
            }
            try {
                if (userId) {
                    const duration = yield new models_1.DurationModel(Number(userId), Number(subjectId), Number(id), false, (0, compute_duration_1.computeDuration)()).create();
                }
                const topic = yield topic_model_1.TopicModel.getById(+id);
                return res.send(topic);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    static getBySubjectId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectId = req.params.subjectId;
            const userId = req.currentUserId;
            if (!subjectId) {
                res.status(404).json("subject not found!");
                return;
            }
            try {
                let topics;
                if (userId) {
                    const userRank = yield rank_model_1.RankModel.findByUserIdAndSubjectId(Number(userId), Number(subjectId));
                    topics = yield topic_model_1.TopicModel.getBySubjectId(+subjectId);
                    //console.log(topics)
                    if (userRank) {
                        topics = (0, modifyTopics_1.modifyTopics)(topics, userRank);
                        // console.log(topics)
                    }
                }
                else {
                    topics = yield topic_model_1.TopicModel.getBySubjectId(+subjectId);
                }
                //console.log(topics)
                return res.send(topics);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTopics = yield topic_model_1.TopicModel.getAll();
                res.send(allTopics);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.TopicController = TopicController;
