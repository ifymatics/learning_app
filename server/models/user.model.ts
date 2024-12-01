import { UserSchema, userSchema } from "../database";

export class UserModel {
    private userSchema = userSchema

    constructor(private email: string, private password: string, private role: string) {
        this.userSchema = userSchema
    }
    async create() {


        return this.userSchema.create(this.email, this.password, this.role)
    }

    static async getById(id: number) {


        return UserSchema.getById(id)
    }
    static async getByEmail(email: string) {


        return UserSchema.getByEmail(email)
    }
    static async getAll() {


        return UserSchema.getAll()
    }
}