import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "../../apis/auth/auth.api.js";
import { ValidationError } from "../../utils/errors/index.js";
import { useUserStore } from "../../stores/user.store.js";

/**
 * Hook to login user
 */
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setIsLoggingIn(true);
    resetMessages();

    try {
      const response = await authApi.loginUser({
        data: {
          email: email,
          password: password,
        },
      });

      if (response && response.token && response.user) {
        setSuccessMessage("Login successful! Redirecting...");

        setUser({
          ...response.user,
          authToken: response.token,
        });

        resetInputs();

        setTimeout(() => {
          navigate({ to: "/" });
        }, 1000);
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error instanceof ValidationError && error.issues.length > 0) {
        console.error("Login error:", error.toJSON());
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
      setIsLoggingIn(false);
    }
  };

  const resetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    successMessage,
    isLoggingIn,
    handleLogin,
    resetMessages,
  };
};

export default useLogin;
