import sql, { subjectTable, topicTable } from "../db";

export type Topic = {
    title: string;
    video: string
    description: string;

}
export class TopicSchema {

    constructor() { }


    async create(title: string, video: string, description: string, subjectId: number) {
        let newTopic;
        try {
            newTopic = await sql`insert into topics (title, video, description, subjectId) values(${title}, ${video}, ${description}, ${subjectId}) returning title, id, subjectId`
            return newTopic
        } catch (error: any) {
            console.log(error.message)
            if (error.message === 'relation "topics" does not exist') {

                return await topicTable("topics")
            }

        }

    }
    static async getById(id: number) {
        try {
            const topic = await sql<Topic[]>`SELECT * FROM topics WHERE id = ${id}`
            if (!topic.length)
                throw new Error('Not found')
            return topic[0]
        } catch (error: any) {
            if (error.essage === "Not found") {
                return error.message
            }
        }
    }
    static async getBySubjectId(subjectId: number) {

        try {
            const topics = await sql<Topic[]>`SELECT * FROM topics WHERE subjectId = ${subjectId} `

            if (!topics.length)
                throw new Error('Not found')
            return topics
        } catch (error: any) {
            if (error.essage === "Not found") {
                return error.message
            }
        }
    }
    static async getAll() {
        return await sql<Topic[]>`SELECT * FROM topics`
    }


}
export const topicSchema = new TopicSchema();
