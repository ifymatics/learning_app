import { SubjectSchema, subjectSchema, Topic } from "../database";

export class SubjectModel {

    private subjectSchema = subjectSchema


    constructor(private name: string) {
        this.subjectSchema = subjectSchema
    }
    async create() {
        return this.subjectSchema.create(this.name)
    }

    static async getById(id: number) {


        return SubjectSchema.getById(id)
    }
    static async getAll() {


        try {
            return await SubjectSchema.getAll()
        } catch (error: any) {
            console.log(error.message)
        }

    }
}