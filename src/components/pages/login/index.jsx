import React from "react";
import useLogin from "../../../hooks/auth/use-login.js";
import { Button, Input } from "@heroui/react";
import PasswordInput from "../../ui/input/PasswordInput.jsx";
import { Icon } from "@iconify/react";
import { handleEnterKeyPressedInInputField } from "../../../utils/ui.js";
import { useNavigate } from "@tanstack/react-router";

function Login() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    successMessage,
    isLoggingIn,
    handleLogin,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg p-8 max-w-6xl w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/images/landing.png"
            alt="Shift Planning"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
            Shift Manager Login
          </h2>
          {errorMessage && errorMessage.trim() !== "" && (
            <div className="text-center border border-red-600 p-3 mb-4 rounded-md bg-red-100 text-red-700 shadow text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && successMessage.trim() !== "" && (
            <div className="text-center border border-green-600 p-3 mb-4 rounded-md bg-green-100 text-green-700 shadow">
              {successMessage}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Input
              isRequired
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              startContent={
                <Icon icon="lucide:mail" className="text-default-400" />
              }
              isDisabled={isLoggingIn}
              value={email}
              onValueChange={setEmail}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleLogin())
              }
            />

            <PasswordInput
              isRequired
              name="password"
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              startContent={
                <Icon icon="lucide:lock" className="text-default-400" />
              }
              isDisabled={isLoggingIn}
              value={password}
              onValueChange={setPassword}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleLogin())
              }
            />

            <Button
              type="submit"
              className="w-full focus:outline-none hover:border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              size="lg"
              onPress={() => handleLogin()}
              isLoading={isLoggingIn}
              isDisabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <button
                  onClick={() => navigate({ to: "/forgot-password" })}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Forgot your password?
                </button>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate({ to: "/register" })}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
