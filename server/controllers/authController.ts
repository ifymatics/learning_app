import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { generateJwtToken } from "../utils/jwt-generator";
import { decrypter } from "../utils/decrypter";

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("email or password missing but required")
            return
        }
        try {
            const user = await UserModel.getByEmail(email);
            console.log(user)
            // Check password validity
            const passwordMatch = await decrypter(
                user.password,
                password
            );

            if (!passwordMatch) return res.status(403).json("Invalid credentials");

            // generate jwt token for user
            const userToken = await generateJwtToken(user.id.toString());
            const { password: pass, ...others } = user;
            return res

                .cookie("accessToken", userToken, { httpOnly: true })
                .status(200)
                .json({ ...others });
        } catch (error) {

        }
    }
}
