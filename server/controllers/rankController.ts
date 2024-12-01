import { NextFunction, Request, Response } from "express";
import { RankModel } from "../models/rank.model";
import { DurationSchema } from "../database";
import { computeDuration } from "../utils/compute-duration";

export class RankController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { userId, subjectId, completed = false, rate = "0min", topicsCount, topicId } = req.body;

        if (!userId || !subjectId || !topicId || !topicsCount) {
            return res.status(400).json("User ID or Subject ID or topicID is missing but required")
        }

        const isCompleted = false;

        try {
            const rankExists = await RankModel.findByUserIdAndSubjectId(userId, subjectId);
            const duration = await DurationSchema.getByUserId(userId, subjectId, topicId);
            const realRate = computeDuration() - Number(duration!.rate)
            if (rankExists) {

                // console.log("HITTING RANK", duration)

                // console.log("realRATE", realRate)
                const update = await RankModel.update(+userId, +subjectId, isCompleted, realRate, topicsCount, +topicId)
                return res.status(200).json(update)
            }
            const rank = new RankModel(userId, subjectId, isCompleted, realRate, topicsCount, topicId);
            const newRank = await rank.create()
            return res.status(200).json(newRank)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const id = req.params.id;
        // console.log(user)
        try {
            const subject = await RankModel.getById(+id)
            res.send(subject)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getBySubject(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { subjectId } = req.params;
        // console.log(user)
        try {
            const subject = await RankModel.findBySubjectId(+subjectId)
            res.send(subject)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const allRanks = await RankModel.getAll()
            res.send(allRanks)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async update(req: Request, res: Response, next: NextFunction): Promise<any> {

        const { userId, subjectId, completed, rate, topicsCount, topicId } = req.body;

        if (!userId || !subjectId || !rate || !topicId) {
            return res.status(400).json(" userID or SubjectID  or rate or topicId is missing but required")
        }
        //console.log(userId, subjectId, completed, rate, topicId)
        try {
            const updatedRank = await RankModel.update(+userId, +subjectId, completed, rate, topicsCount, +topicId)
            res.status(200).json(updatedRank)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
}