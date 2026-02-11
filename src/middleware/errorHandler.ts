/**
 * Error Handling Middleware
 * Centralized error handling for the API
 */

import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to 500 Internal Server Error
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    statusCode,
    isOperational,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Send error response
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
    },
  });
};

/**
 * Custom AppError class for throwing operational errors
 */
export class AppError extends Error implements AppError {
  statusCode?: number;
  isOperational?: boolean;

  constructor(message: string, statusCode: number = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Not Found Error
 */
export const NotFoundError = (message: string) => {
  return new AppError(message, 404);
};

/**
 * Bad Request Error
 */
export const BadRequestError = (message: string) => {
  return new AppError(message, 400);
};

/**
 * Unauthorized Error
 */
export const UnauthorizedError = (message: string = 'Unauthorized') => {
  return new AppError(message, 401);
};

/**
 * Forbidden Error
 */
export const ForbiddenError = (message: string = 'Forbidden') => {
  return new AppError(message, 403);
};

/**
 * Conflict Error
 */
export const ConflictError = (message: string) => {
  return new AppError(message, 409);
};
