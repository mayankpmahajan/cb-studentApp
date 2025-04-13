import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/standardReponse";
import { Op } from "sequelize";
import { CenterCourse, Enrollment } from "../mappings/mappingsModel";
import Batch from "../batch/batchModel";
import Center from "../center/centerModel";
import Student from "./studentModel";
import Course from "../course/courseModel";

export const onboardingController = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      // google_id,
      centre,
      course,
      batch,
    } = req.body;

    // Step 1: Check center-course validity
    const centerCourse = await CenterCourse.findOne({
      where: {
        center_id: centre,
        course_id: course,
      },
    });

    if (!centerCourse) {
      sendErrorResponse(res, 400, "Invalid center-course combination");
      return;
    }

    console.log("centreCourseid", centerCourse.id)


    // Step 2: Validate batch with center_course_id
    const batchRecord = await Batch.findOne({
      where: {
        id: batch,
        center_course_id: centerCourse.id,
      },
    });

    if (!batchRecord) {
      sendErrorResponse(res, 400, "Invalid batch for given center-course");
      return;
    }

    // Step 3: Get center code
    const centerDetails = await Center.findOne({ where: { id: centre } });
    if (!centerDetails) {
      sendErrorResponse(res, 400, "Invalid center");
      return;
    }

    const centerCode = centerDetails.code;

    const courseDetails = await Course.findOne({ where: { id: course } });
    if (!courseDetails) {
      sendErrorResponse(res, 400, "Invalid course");
      return;
    }

    const courseCode = courseDetails.code;

    // Step 4: Generate roll number
    
    const centerPrefix = centerCode.slice(0, 2).toUpperCase();
    const coursePrefix = courseCode.slice(0, 2).toUpperCase();
    const batchPrefix = batchRecord.code.slice(0, 2).toUpperCase();
    const rollPrefix = `${centerPrefix}${coursePrefix}${batchPrefix}`;

    // Step 2: Count enrollments with same center_course_id and batch_id
    const enrollmentCount = await Enrollment.count({
    where: {
        center_course_id: centerCourse.id,
        batch_id: batchRecord.id,
    },
    });

    // Step 3: Generate sequence number
    const sequence = String(enrollmentCount + 1).padStart(4, "0");
    const roll_number = `${rollPrefix}${sequence}`;


    // Step 5: Create student
    const student = await Student.create({
      first_name,
      last_name,
      email,
      phone_number,
      google_id: phone_number,
      roll_number,
      created_at: new Date()
    });

    // Step 6: Create enrollment
    const enrollment = await Enrollment.create({
      student_id: student.id,
      center_course_id: centerCourse.id,
      batch_id: batch,
      enrollment_date: new Date(),
    });

    sendSuccessResponse(res, 201, "Student onboarded successfully", {
      student,
      enrollment,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
};
