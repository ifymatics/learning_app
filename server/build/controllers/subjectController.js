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
exports.SubjectController = void 0;
const models_1 = require("../models");
class SubjectController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            console.log(name);
            if (!name) {
                res.status(400).json("name missing but required");
                return;
            }
            const subject = new models_1.SubjectModel(name);
            try {
                const newSubject = yield subject.create();
                return res.send(newSubject);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const subject = yield models_1.SubjectModel.getById(+id);
                res.send(subject);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.currentUserId;
            try {
                const allSubjects = yield models_1.SubjectModel.getAll();
                console.log(allSubjects);
                res.send(allSubjects);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.SubjectController = SubjectController;
// const allIncludesTitle = topics.every((obj: any) => Object.keys(obj).includes("title") && obj["title"] !== "");
// const allIncludesVideo = topics.every((obj: any) => Object.keys(obj).includes("video") && obj["video"] !== "");
// const allIncludesDesc = topics.every((obj: any) => Object.keys(obj).includes("description") && obj["description"] !== "")
// if (!allIncludesTitle || !allIncludesVideo || !allIncludesDesc) {
//     return res.status(400).json("topic  missing 'title', 'video' or 'description' but they are required")
// }
