import { PartialRank, Rank, RankSchema, rankSchema, Topic } from "../database";


export class RankModel {

    private rankSchema = rankSchema

    // { "userId":1,"subjectId":1, "completed":true, "rate":"20min", "topicscompleted":1}
    constructor(private userId: number, private subjectId: number, private completed: boolean, private rate: number, private topicsCount: number, private topicId: number) {
        this.rankSchema = rankSchema
    }
    async create() {

        return this.rankSchema.create(this.userId, this.subjectId, false, this.rate, this.topicsCount, this.topicId)
    }

    static async getById(id: number) {


        return RankSchema.getById(id)
    }
    static async getAll() {


        return RankSchema.getAll()
    }
    static async findByUserIdAndSubjectId(userId: number, subjectId: number) {

        return RankSchema.findByUserIdAndSubjectId(userId, subjectId)
    }
    static async findBySubjectId(subjectId: number) {

        return RankSchema.findBySubjectId(subjectId)
    }
    static async update(userId: number, subjectId: number, completed: boolean, topicCount: number, rate: string, topicId: number) {


        return RankSchema.update(userId, subjectId, completed, rate, topicCount, topicId)
    }
}
function setTimer() {

}