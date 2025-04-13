import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/standardReponse";
import { JsonWebTokenError, verify } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization || "";
    console.log(authHeader);

    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      sendErrorResponse(res, 401, "No Token in Header"); // Added return
      return;
    }

    const token = authHeader.split(" ")[1];

    const payload = verify(token, process.env.JWT_SECRET_KEY!);

    console.log("final");
    res.locals.payload = payload;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      sendErrorResponse(res, 401, "Invalid or expired token"); // Added return
      return;
    }
    sendErrorResponse(res, 500, "Internal Server Error", error); // Added return
  }
}
