import { logger } from "../../app";
import {
    sendErrorResponse,
    sendSuccessResponse,
  } from "../../utils/standardReponse";
import { Request, Response } from "express";
import Batch from "../batch/batchModel";
import Center from "../center/centerModel";
import Course from "../course/courseModel";



export async function dropdownController(req: Request, res: Response) {
    try {
      // Fetch all courses
      const courses = await Course.findAll({
        attributes: ['id', 'code', 'name'],
        order: [['name', 'ASC']]
      });
  
      // Fetch all centers
      const centers = await Center.findAll({
        attributes: ['id', 'code', 'name', 'institute_id'],
        order: [['name', 'ASC']]
      });
  
      // Fetch all batches
      const batches = await Batch.findAll({
        attributes: ['id', 'code', 'name', 'center_course_id'],
        order: [['name', 'ASC']]
      });
  
      sendSuccessResponse(res, 200, "Dropdown values fetched successfully", {
        courses,
        centers,
        batches
      });
    } catch (error) {
      logger.error("Failed to fetch dropdown values:", error);
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }