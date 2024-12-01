import sql, { subjectTable } from "../db";
type Subject = {
    name: string;
    id: number

}
type Topic = {
    title: string;
    content: string[];

}
export class SubjectSchema {

    constructor() { }


    async create(name: string) {
        let newSubject;
        try {
            newSubject = await sql`insert into subjects (name) values(${name}) returning name, id`
            return newSubject
        } catch (error: any) {
            console.log(error.message)
            if (error.message === 'relation "subjects" does not exist') {

                return await subjectTable("subjects")
            }

        }

    }
    static async getById(id: number) {
        const subject = await sql<Topic[]>`SELECT * FROM subjects WHERE id = ${id}`
        if (!subject.length)
            throw new Error('Not found')
        return subject[0]
    }
    static async getAll() {
        return await sql<Subject[]>`SELECT 
    subjects.name, 
    subjects.id AS id, 
    COALESCE(bool_and(ranks.completed), FALSE) AS completed, 
    MAX(ranks.userId) AS userId
FROM 
    subjects
LEFT JOIN 
    ranks 
ON 
    subjects.id = ranks.subjectId
GROUP BY 
    subjects.name, subjects.id;

`
    }

}
export const subjectSchema = new SubjectSchema();
