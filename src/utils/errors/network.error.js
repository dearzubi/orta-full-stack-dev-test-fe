import { AppError } from "./app.error.js";

/** A custom error class for network-related errors. */
export class NetworkError extends AppError {
  /**
   * A custom error class for network-related errors.
   *
   * @param {Object} params
   * @param {string} params.message - Error message
   * @param {string} [params.errorCode="NETWORK_CONNECTION_FAILED"] - Application-specific error code
   * @param {number} [params.statusCode] - HTTP status code
   * @param {Error} [params.cause] - The original error that caused this error, if any
   */
  constructor({
    message,
    errorCode = "NETWORK_CONNECTION_FAILED",
    statusCode,
    cause,
  }) {
    super({ message, errorCode, isOperational: false, statusCode, cause });
    this.name = "NetworkError";
  }
}
