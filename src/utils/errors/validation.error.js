import { AppError } from "./app.error.js";

/** @typedef {{path: string[], message: string}} ZodIssue */
/** @typedef {SerialisedAppError & { issues?: ZodIssue[] }} SerialisedValidationError */

/**
 * A custom validation error class
 */
export class ValidationError extends AppError {
  /** @type {Array<{path: string, error: string}> | undefined} */
  issues;

  /**
   * Custom validation error class
   *
   * @param {Object} params
   * @param {string} [params.message="Validation failed"] - Error message
   * @param {ZodIssue[]} [params.issues] - Array of zod validation issues
   * @param {string} [params.errorCode="VALIDATION_ERROR"] - Application-specific error code
   */
  constructor({
    message = "Validation failed",
    issues,
    errorCode = "VALIDATION_ERROR",
  }) {
    super({
      message,
      errorCode,
    });
    this.name = "ValidationError";
    if (Array.isArray(issues)) {
      this.issues = issues.map((issue) => {
        if (Array.isArray(issue.path) && "message" in issue) {
          return {
            path: issue.path.join("."),
            error: issue.message,
          };
        }
        return issue;
      });
    }
  }

  /**
   * Serializse error
   * @returns {SerialisedValidationError} Serialized error object
   * */
  toJSON() {
    return {
      ...super.toJSON(),
      issues: this.issues,
    };
  }
}
