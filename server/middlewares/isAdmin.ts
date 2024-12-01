import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyJwtToken } from "../utils/jwt-generator";
import { UserSchema } from "../database";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      currentUserId: string;
    }
  }
}
declare global {
  namespace Express {
    interface Request {
      headers: { cookie: { accessToken: string } };
    }
  }
}
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (req.method === "OPTIONS") {
    next();
  }

  if (!req.headers.cookie) {
    return res.status(403).json("Unauthorized request!")
  } else {
    try {
      const UserToken = req.headers.cookie.split("=")[1]; //req.headers.cookie.split(",")[1];

      const { aud } = (await verifyJwtToken(UserToken)) as { aud: string };


      const user = await UserSchema.getById(+aud);
      if (Number(user.role) !== 1) return res.status(403).json("Unauthorized request!")

    } catch (error: any) {
      console.log(error.message);
      return res.status(403).json("Unauthorized request!")
    }
  }


  next()
};
