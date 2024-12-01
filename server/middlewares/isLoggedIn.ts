import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyJwtToken } from "../utils/jwt-generator";

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
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (req.method === "OPTIONS") {
    next();
  }

  if (!req.headers.cookie) {
    return next()
  } else {
    try {
      const UserToken = req.headers.cookie.split("=")[1]; //req.headers.cookie.split(",")[1];

      const { aud } = (await verifyJwtToken(UserToken)) as { aud: string };

      req.currentUserId = aud;


    } catch (error: any) {
      console.log(error.message);

    }
  }


  next()
};
