import { NextFunction, Request, Response } from "express";
import { SubjectModel } from "../models";

export class SubjectController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { name } = req.body;
        console.log(name)
        if (!name) {
            res.status(400).json("name missing but required")
            return
        }

        const subject = new SubjectModel(name);

        try {
            const newSubject = await subject.create()
            return res.send(newSubject)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const id = req.params.id;

        try {
            const subject = await SubjectModel.getById(+id)
            res.send(subject)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.currentUserId


        try {
            const allSubjects = await SubjectModel.getAll()
            console.log(allSubjects)
            res.send(allSubjects)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }

}

// const allIncludesTitle = topics.every((obj: any) => Object.keys(obj).includes("title") && obj["title"] !== "");
// const allIncludesVideo = topics.every((obj: any) => Object.keys(obj).includes("video") && obj["video"] !== "");
// const allIncludesDesc = topics.every((obj: any) => Object.keys(obj).includes("description") && obj["description"] !== "")
// if (!allIncludesTitle || !allIncludesVideo || !allIncludesDesc) {
//     return res.status(400).json("topic  missing 'title', 'video' or 'description' but they are required")
// }