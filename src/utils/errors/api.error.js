import { AppError } from "./app.error.js";

/** @typedef {SerialisedAppError & { errorData?: any }} SerialisedAPIError */

/**
 * A custom error class for API-specific errors.
 */
export class APIError extends AppError {
  /** @type {any} */
  errorData;

  /** @type {number} */
  statusCode;

  /**
   * Subclass of AppError for API-specific errors
   *
   * @param {Object} params
   * @param {string} params.message - Error message
   * @param {number} params.statusCode - HTTP status code
   * @param {string} params.errorCode - Application-specific error code
   * @param {boolean} [params.isOperational=true] - Whether the error is operational (expected) or a programming error (bug)
   * @param {any} [params.errorData] - Additional data related to the error
   * @param {Error} [params.cause] - The original error that caused this error, if any
   */
  constructor({
    message,
    errorCode,
    statusCode = 400,
    isOperational = true,
    errorData,
    cause,
  }) {
    super({ message, errorCode, isOperational, statusCode, cause });
    this.errorData = errorData;
    this.statusCode = statusCode;
    this.name = "APIError";
  }

  /**
   * Serialise error

   * @returns {SerialisedAPIError} Serialised error object
   * */
  toJSON() {
    return {
      ...super.toJSON(),
      errorData: this.errorData,
    };
  }
}
