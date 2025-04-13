import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number = 200,
  message: string = 'Success',
  data: T
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

interface ErrorResponse {
  success: false;
  message: string;
  error?: any;
}

export const sendErrorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string = 'An error occurred',
  error?: any
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationErrorResponse {
  success: false;
  message: string;
  errors: ValidationError[];
}

export const sendValidationError = (
  res: Response,
  errors: ValidationError[]
): Response<ValidationErrorResponse> => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors,
  });
};
