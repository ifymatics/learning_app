import { Request, Response, NextFunction } from "express";
import { TopicModel } from "../models/topic.model";
import { DurationModel } from "../models";
import { computeDuration } from "../utils/compute-duration";
import { RankModel } from "../models/rank.model";
import { modifyTopics } from "../utils/modifyTopics";

export class TopicController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {

        const { title, video, description, subjectId } = req.body;

        if (!title) {
            res.status(400).json("title missing but required")
            return
        }
        if (!video) {
            res.status(400).json("video missing but required")
            return
        }
        if (!description) {
            res.status(400).json("description missing but required")
            return
        }

        if (!subjectId) {
            res.status(400).json("subject ID  missing but required")
            return
        }
        const topic = new TopicModel(title, video, description, subjectId);
        try {
            const newTopic = await topic.create()
            res.send(newTopic)
        } catch (error: any) {
            res.status(500).json(error.message)
        }

    }
    static async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const id = req.params.id;
        const userId = req.currentUserId;
        const subjectId = req.query.subjectId;


        if (!id) {
            res.status(404).json("topic not found!")
            return
        }
        if (!subjectId) {
            res.status(400).json("subject Id required but missing!")
            return
        }

        try {
            if (userId) {

                const duration = await new DurationModel(Number(userId), Number(subjectId), Number(id), false, computeDuration()).create()

            }
            const topic = await TopicModel.getById(+id)
            return res.send(topic)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }

    static async getBySubjectId(req: Request, res: Response, next: NextFunction): Promise<any> {
        const subjectId = req.params.subjectId;
        const userId = req.currentUserId;
        if (!subjectId) {
            res.status(404).json("subject not found!")
            return
        }

        try {
            let topics
            if (userId) {
                const userRank = await RankModel.findByUserIdAndSubjectId(Number(userId), Number(subjectId)) as any
                topics = await TopicModel.getBySubjectId(+subjectId);
                //console.log(topics)
                if (userRank) {
                    topics = modifyTopics(topics, userRank)
                    // console.log(topics)
                }
            } else {
                topics = await TopicModel.getBySubjectId(+subjectId);
            }

            //console.log(topics)
            return res.send(topics)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const allTopics = await TopicModel.getAll()
            res.send(allTopics)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
}