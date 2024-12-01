import { TopicSchema, topicSchema } from "../database";

export class TopicModel {

    private topicSchema = topicSchema


    constructor(private title: string, private video: string, private description: string, private subjectId: number) {
        this.topicSchema = topicSchema
    }
    async create() {
        return this.topicSchema.create(this.title, this.video, this.description, this.subjectId)
    }

    static async getById(id: number) {


        return TopicSchema.getById(id)
    }
    static async getBySubjectId(subjectId: number) {


        return TopicSchema.getBySubjectId(subjectId)
    }
    static async getAll() {


        return TopicSchema.getAll()
    }
}