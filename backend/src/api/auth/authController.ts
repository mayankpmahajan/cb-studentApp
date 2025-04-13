import { Request, Response } from "express";
import { logger } from "../../app";
import { googleAuthSchema} from "./authModel";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/standardReponse";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { OAuth2Client } from "google-auth-library";
import Student from "../student/studentModel";



export async function googleController(req: Request, res: Response) {
  try {
    const { idToken } = googleAuthSchema.parse(req.body);
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      sendErrorResponse(res, 401, "Invalid Google ID token");
      return;
    }

    const { sub: google_id, email, given_name, family_name } = payload;

    // Check for existing student
    const student = await Student.findOne({ where: { google_id } });

    if (student) {
      const accessToken = sign(
        { id: student.id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "45m" }
      );

      sendSuccessResponse(res, 200, "Login successful", {
        accessToken,
        onboarded: true,
        student,
      });
    } else {
      // Send partial profile for onboarding
      sendSuccessResponse(res, 200, "Google login verified", {
        onboarded: false,
        googleProfile: {
          google_id,
          email,
          first_name: given_name,
          last_name: family_name,
        },
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendErrorResponse(res, 400, "Invalid Input", error.issues);
    }
    logger.error("Google login failed:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
}