import { useState } from "react";
import { authApi } from "../../apis/auth/auth.api.js";
import { ValidationError } from "../../utils/errors/index.js";

/**
 * Hook to handle forgot password functionality
 */
const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    setIsSubmitting(true);
    resetMessages();

    try {
      const response = await authApi.forgotPassword({
        data: {
          email: email,
        },
      });

      if (response && response.message) {
        setSuccessMessage(
          response.message ||
            "If an account with that email exists, we've sent a password reset link.",
        );
        resetInputs();
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.issues &&
        error.issues.length > 0
      ) {
        console.error("Forgot password error:", error.toJSON());
        if (Array.isArray(error.issues) && error.issues.length > 0) {
          setErrorMessage(error.issues[0].error);
        } else {
          setErrorMessage(error.message);
        }
      } else {
        const errorMsg =
          (error instanceof Error ? error.message : String(error)) ||
          "An unexpected error occurred. Please try again.";
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const resetInputs = () => {
    setEmail("");
  };

  return {
    email,
    setEmail,
    errorMessage,
    successMessage,
    isSubmitting,
    handleForgotPassword,
    resetMessages,
  };
};

export default useForgotPassword;
