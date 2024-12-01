// { "userId":1,"subjectId":1, "completed":true, "rate":"20min", "topicscompleted":1}

import { ParameterOrFragment } from "postgres";
import sql, { rankTable, subjectTable, topicTable } from "../db";

export type Rank = {
    id: ParameterOrFragment<never>;
    userId: number;
    subjectId: number
    completed: boolean;
    rate: number;
    topicscount: number;
    topicscompleted: number[]

}
export type PartialRank = {
    completed: boolean;
    rate: number;
    topicscompleted: number
};

export class RankSchema {

    constructor() { }


    async create(userId: number, subjectId: number, completed: boolean, rate: number, topicsCount: number, topicscompleted: number) {

        let newRank;
        try {
            newRank = await sql`insert into ranks (userId, subjectId, completed, rate,topicsCount, topicscompleted) values(${userId}, ${subjectId}, ${completed}, ${rate}, ${topicsCount}, ${[topicscompleted]}) returning id`
            return newRank
        } catch (error: any) {
            console.log(error.message)
            if (error.message === 'relation "ranks" does not exist') {

                return await rankTable("ranks")
            }

        }

    }
    static async getById(id: number) {
        const rank = await sql<Rank[]>`SELECT * FROM ranks WHERE id = ${id}`
        if (!rank.length)
            throw new Error('Not found')
        return rank[0]
    }
    static async findBySubjectId(subjectId: number) {
        try {
            const rank = await sql<Rank[]>`SELECT ranks.id as id,rate,  userId, subjectId,email FROM ranks inner join users on users.id = ranks.userId  WHERE subjectId = ${subjectId} ORDER BY completed DESC, topicscompleted DESC, rate ASC`
            if (!rank.length)
                throw new Error('Not found')
            return rank
        } catch (error: any) {
            console.log(error.message)
        }

    }
    static async getAll() {
        return await sql<Rank[]>`SELECT * FROM ranks ORDER BY completed DESC, topicscompleted DESC, rate ASC`
    }
    static async findByUserIdAndSubjectId(userId: number, subjectId: number) {

        try {
            const rank = await sql<Rank[]>`SELECT * FROM ranks WHERE userId = ${userId} AND subjectId = ${subjectId}  ORDER BY completed DESC, array_length(topicscompleted, 1) DESC, rate ASC`

            if (!rank.length)
                return;
            return rank[0]
        } catch (error: any) {
            console.log(error)
            if (error.message === 'relation "ranks" does not exist') {

                return await rankTable("ranks")
            }
        }

    }
    static async update(userId: number, subjectId: number, completed: boolean, rate: string, topicCount: number, topic: number) {
        // "id": 1,
        //  "completed": true,
        //  "rate": "20min",
        //  "topicscompleted": [1],
        //  "userid": 1,
        //  "subjectid": 1

        try {
            const rank = await RankSchema.findByUserIdAndSubjectId(userId, subjectId);
            console.log(completed)
            if (rank) {

                if (rank.topicscount > rank.topicscompleted.length && !rank.topicscompleted.includes(topic)) {

                    const updateddRank = { completed: completed, topicscompleted: [...rank.topicscompleted, topic], rate: rank.rate + rate } as unknown as Rank;
                    if (rank.topicscount > rank.topicscompleted.length + 1) {
                        updateddRank.completed = false
                    } else {
                        updateddRank.completed = true
                    }
                    const updated = await sql`UPDATE ranks SET ${sql(updateddRank, 'completed', 'rate', 'topicscompleted')} where id = ${rank.id} returning id, topicscompleted`

                    return updated
                }

                return rank
            }
            return rank
        } catch (error) {

        }

    }
}
export const rankSchema = new RankSchema();
