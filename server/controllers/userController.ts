import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { hasher } from "../utils/decrypter";

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {

        const { email, password, role } = req.body;
        if (!email || !password) {
            res.status(400).json("email or password missing but required")
            return
        }
        let userRole = role;
        if (!userRole) {
            userRole = '0';
        }
        const hashedPassword = await hasher(password);
        const user = new UserModel(email, hashedPassword, userRole);
        try {
            const newUser = await user.create()
            res.send(newUser)
        } catch (error: any) {
            res.status(500).json(error.message)
        }

    }
    static async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const id = req.params.id;
        if (!id) {
            res.status(404).json("user not found!")
            return
        }

        try {
            const user = await UserModel.getById(+id)
            res.send(user)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const allUsers = await UserModel.getAll()
            res.send(allUsers)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
}