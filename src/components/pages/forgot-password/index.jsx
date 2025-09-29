import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { handleEnterKeyPressedInInputField } from "../../../utils/ui.js";
import useForgotPassword from "../../../hooks/auth/use-forgot-password.js";

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    errorMessage,
    successMessage,
    isSubmitting,
    handleForgotPassword,
    resetMessages,
  } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg p-8 max-w-6xl w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/images/landing.png"
            alt="Forgot Password"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-2xl font-bold text-orange-700 text-center mb-6">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {errorMessage && errorMessage.trim() !== "" && (
            <div className="text-center border border-red-300 p-3 mb-4 rounded-lg bg-red-50 text-red-700 shadow-sm text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && successMessage.trim() !== "" && (
            <div className="text-center border border-green-300 p-3 mb-4 rounded-lg bg-green-50 text-green-700 shadow-sm">
              {successMessage}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              isRequired
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              variant="bordered"
              startContent={
                <Icon icon="lucide:mail" className="text-orange-400" />
              }
              isDisabled={isSubmitting}
              value={email}
              onValueChange={(value) => {
                setEmail(value);
                if (errorMessage || successMessage) {
                  resetMessages();
                }
              }}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () =>
                  handleForgotPassword(),
                )
              }
            />

            <Button
              type="submit"
              className="w-full focus:outline-none hover:border-transparent bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              size="lg"
              onPress={() => handleForgotPassword()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  onClick={() => navigate({ to: "/login" })}
                  className="text-orange-600 hover:text-orange-800 font-medium underline hover:border-transparent focus:outline-none"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
