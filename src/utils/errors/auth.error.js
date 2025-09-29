import { AppError } from "./app.error.js";

/**
 * A custom error class for authentication errors
 */
export class AuthenticationError extends AppError {
  constructor({
    message = "Authentication failed",
    errorCode = "AUTH_FAILED",
    isOperational = true,
    cause,
  }) {
    super({ message, errorCode, isOperational, statusCode: 401, cause });
    this.name = "AuthenticationError";
  }
}

/**
 * A custom error class for authorization errors
 */
export class AuthorizationError extends AppError {
  constructor({
    message = "Access denied",
    errorCode = "ACCESS_DENIED",
    isOperational = true,
    cause,
  }) {
    super({ message, errorCode, isOperational, statusCode: 403, cause });
    this.name = "AuthorizationError";
  }
}
