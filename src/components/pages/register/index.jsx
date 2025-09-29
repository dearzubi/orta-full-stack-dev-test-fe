import React from "react";
import useRegister from "../../../hooks/auth/use-register.js";
import { Button, Input } from "@heroui/react";
import PasswordInput from "../../ui/input/PasswordInput.jsx";
import { Icon } from "@iconify/react";
import { handleEnterKeyPressedInInputField } from "../../../utils/ui.js";
import { useNavigate } from "@tanstack/react-router";

function Register() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    successMessage,
    isRegistering,
    handleRegister,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg p-8 max-w-6xl w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/images/register.png"
            alt="Shift registration visual"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
            Register for Shift Manager
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
              name="name"
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
              startContent={
                <Icon icon="lucide:user" className="text-default-400" />
              }
              isDisabled={isRegistering}
              value={name}
              onValueChange={setName}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleRegister())
              }
            />

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
              isDisabled={isRegistering}
              value={email}
              onValueChange={setEmail}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleRegister())
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
              isDisabled={isRegistering}
              value={password}
              onValueChange={setPassword}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleRegister())
              }
            />

            <PasswordInput
              isRequired
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              variant="bordered"
              startContent={
                <Icon icon="lucide:lock" className="text-default-400" />
              }
              isDisabled={isRegistering}
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () => handleRegister())
              }
            />

            <Button
              type="submit"
              className="w-full focus:outline-none hover:border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              size="lg"
              onPress={() => handleRegister()}
              isLoading={isRegistering}
              isDisabled={isRegistering}
            >
              {isRegistering ? "Registering..." : "Register"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate({ to: "/login" })}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
