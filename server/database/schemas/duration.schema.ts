import sql, { durationTable } from "../db";
type Duration = {
    id: any;
    userId: number;
    completed: boolean;
    rate: number;
    topicId: number;

}
export class DurationSchema {

    constructor() {

        // this.durationTable()
    }


    async create(userId: number, subjectId: number, topicId: number, completed: boolean, rate: number) {
        let duration;
        try {
            const durationExists = await DurationSchema.getByUserId(userId, subjectId, topicId);
            if (durationExists) {
                // console.log(durationExists)
                return durationExists
                //return await DurationSchema.update(userId, topicId, completed, durationExists.rate + rate)
            }
            duration = await sql`insert into durations (userId,subjectId, topicId, completed, rate) values(${userId}, ${subjectId}, ${topicId}, ${completed}, ${rate}) returning id, rate, topicId `
            return duration[0]
        } catch (error: any) {
            console.log(error.message)
            if (error.message === 'relation "durations" does not exist') {

                return await durationTable("durations")
            }

        }

    }

    static async getById(id: number) {
        try {
            const durations = await sql<Duration[]>`SELECT * FROM durations WHERE id = ${id}`
            if (!durations.length)
                throw new Error('Not found')
            return durations[0]
        } catch (error: any) {
            if (error.essage === "Not found") {
                return error.message
            }
        }

    }

    static async getByUserId(userId: number, subjectId: number, topicId: number) {
        try {
            const durations = await sql<Duration[]>`SELECT * FROM durations WHERE userId = ${userId} AND topicId = ${topicId} AND subjectId = ${subjectId} AND completed = false`
            if (!durations.length)
                throw new Error('Not found')
            return durations[0]
        } catch (error: any) {
            // if (error.essage === "Not found") {
            //     return error.message
            // }
            return
        }

    }
    static async getAll() {
        return await sql<Duration[]>`SELECT * FROM durations`
    }
    static async update(userId: number, subjectId: number, topicId: number, completed: boolean, rate: number) {


        try {

            const updatedDuration = { completed: completed, rate: rate } as unknown as Duration;

            const updated = await sql`UPDATE durations SET ${sql(updatedDuration, 'completed', 'rate')} where userId = ${userId} AND subjectId = ${subjectId}  AND topicId = ${topicId} AND completed = false  returning id, rate, topicId`

            return updated

        } catch (error: any) {
            return error.message
        }

    }
}
export const durationSchema = new DurationSchema();
