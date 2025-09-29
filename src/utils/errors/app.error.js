/**
 * @typedef {{
 *  name: string;
 *  message: string;
 *  errorCode: string;
 *  timestamp: string;
 *  statusCode?: number;
 *  stack?: string;
 * }} SerialisedAppError
 */

/**
 * A custom error class for application-specific errors.
 * Extends the built-in Error class to include additional properties
 * such as statusCode, isOperational, errorCode, and timestamp.
 */
export class AppError extends Error {
  /** @type {number | undefined} */
  statusCode;

  /** @type {boolean} */
  isOperational; // Distinguishes between expected errors and bugs

  /** @type {string} */
  errorCode;

  /** @type {string} */
  timestamp;

  /**
   * Custom application error class
   *
   * @param {Object} params
   * @param {string} params.message - Error message
   * @param {number} [params.statusCode] - HTTP status code
   * @param {string} params.errorCode - Application-specific error code
   * @param {boolean} [params.isOperational=true] - Whether the error is operational (expected) or a programming error (bug
   * @param {Error} [params.cause] - The original error that caused this error, if any
   */
  constructor({ message, errorCode, isOperational = true, statusCode, cause }) {
    super(message, { cause });

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace?.(this, this.constructor);
  }

  /**
   * Serialise error
   * @returns {SerialisedAppError} Serialised error object
   * */
  toJSON() {
    const formatCause = (cause) => {
      if (cause instanceof AppError) {
        return cause.toJSON();
      }
      if (cause instanceof Error) {
        return {
          name: cause.name,
          message: cause.message,
          stack: cause.stack,
        };
      }
      return { error: String(cause) };
    };

    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      timestamp: this.timestamp,
      ...(this.cause ? { cause: formatCause(this.cause) } : {}),
      ...{ stack: this.stack },
    };
  }
}
