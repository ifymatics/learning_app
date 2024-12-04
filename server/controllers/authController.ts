import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { generateJwtToken } from "../utils/jwt-generator";
import { decrypter } from "../utils/decrypter";

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, password } = req.body;
        //console.log(email, password)
        if (!email || !password) {
            res.status(400).json("email or password missing but required")
            return
        }
        try {
            const user = await UserModel.getByEmail(email);
            console.log(user)
            // Check password validity
            if (!user) {
                return res.status(404).json("User not found")
            }
            const passwordMatch = await decrypter(
                user.password,
                password
            );

            if (!passwordMatch) throw new Error("Invalid credentials");

            // generate jwt token for user
            const userToken = await generateJwtToken(user.id.toString());
            const { password: pass, ...others } = user;
            return res

                .cookie("accessToken", userToken, { httpOnly: true })
                .status(200)
                .json({ ...others });
        } catch (error: any) {
            let message = "Authentication failed";
            let statusCode = 500
            if (error.message === "Not found") {
                message = "User not found!";
                statusCode = 404;
            } else if (error.message === "Invalid credentials") {
                message = "Invalid credentials!";
                statusCode = 403;

            }

            res.status(statusCode).json(message)

        }
    }
}
