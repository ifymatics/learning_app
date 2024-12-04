import sql, { userTable } from "../db";
type User = {
    id: any;
    email: string;
    password: string;
    role: string;
    first_name?: string;
    last_name?: string
}
export class UserSchema {

    constructor() {

        // this.userTable()
    }


    async create(email: string, password: string, role: string, first_name?: string, last_name?: string) {
        let user;
        try {
            console.log(email, password)
            user = await sql`insert into users (email, password, role) values(${email}, ${password}, ${role}) returning email, id`
            return user
        } catch (error: any) {
            console.log(error)
            if (error.message === 'relation "users" does not exist') {

                return await userTable("users")
            }

        }

    }
    static async getById(id: number) {
        try {
            const users = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`
            if (!users.length)
                throw new Error('Not found')
            return users[0]
        } catch (error: any) {
            if (error.essage === "Not found") {
                return error.message
            }
        }

    }

    static async getByEmail(email: string) {
        try {
            const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`
            if (!users.length)
                throw new Error('Not found')
            return users[0]
        } catch (error: any) {

            if (error.message === "Not found") {
                console.log(error.message)
                throw new Error(error.message)
            }
        }

    }
    static async getAll() {
        return await sql<User[]>`SELECT * FROM users`
    }

}
export const userSchema = new UserSchema();
