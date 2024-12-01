import jwt from "jsonwebtoken";
export const generateJwtToken = (userId: string) => {
    if (typeof userId !== "string") return;

    return new Promise((resolve, reject) => {
        const payload = {};
        let secret = process.env.JWT_ACCESS_TOKEN_KEY!;
        let options = {
            expiresIn: "3hr",
            issuer: "elearning.com",
            audience: userId,
        };

        jwt.sign(payload, secret, options, (err: any, token: any) => {
            console.log(err);
            if (err) reject(err);
            resolve(token);
        });
    });
};


export const verifyJwtToken = (token: string) => {
    let secret = process.env.JWT_ACCESS_TOKEN_KEY!;

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err: any, value) => {
            if (err) reject(err);
            resolve(value);
        });
    });
};