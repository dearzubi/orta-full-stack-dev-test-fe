import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { authApi } from "../../apis/auth/auth.api.js";
import { ValidationError } from "../../utils/errors/index.js";

/**
 * Hook to handle reset password functionality
 */
const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState("");
  const [resetToken, setResetToken] = useState("");

  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  useEffect(() => {
    if (search?.uid) {
      setUserId(search.uid);
    }
    if (search?.token) {
      setResetToken(search.token);
    }
  }, [search]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!userId || !resetToken) {
      setErrorMessage(
        "Invalid or missing reset parameters. Please check your reset link.",
      );
      return;
    }

    setIsSubmitting(true);
    resetMessages();

    try {
      const response = await authApi.resetPassword({
        data: {
          id: userId,
          resetToken: resetToken,
          newPassword: newPassword,
        },
      });

      if (response && response.message) {
        setSuccessMessage(
          response.message ||
            "Password reset successful! You can now log in with your new password. Redirecting to login...",
        );
        resetInputs();

        setTimeout(() => {
          navigate({ to: "/login" });
        }, 3000);
      } else {
        setErrorMessage("Password reset failed. Please try again.");
      }
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.issues &&
        error.issues.length > 0
      ) {
        console.error("Reset password error:", error.toJSON());
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
    setNewPassword("");
    setConfirmPassword("");
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    successMessage,
    isSubmitting,
    userId,
    resetToken,
    handleResetPassword,
    resetMessages,
  };
};

export default useResetPassword;
