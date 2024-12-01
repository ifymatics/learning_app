import { durationTable, durationSchema, DurationSchema } from "../database";


export class DurationModel {

    private durationSchema = durationSchema


    constructor(private userId: number, private subjectId: number, private topicId: number, private completed: boolean, private rate: number) {
        this.durationSchema = durationSchema
    }
    async create() {

        return this.durationSchema.create(this.userId, this.subjectId, this.topicId, this.completed, this.rate,)
    }

    static async getById(id: number) {


        return DurationSchema.getById(id)
    }
    static async getAll() {


        return DurationSchema.getAll()
    }

    static async update(userId: number, subjectId: number, topicId: number, completed: boolean, rate: number,) {


        return DurationSchema.update(userId, subjectId, topicId, completed, rate)
    }
}
