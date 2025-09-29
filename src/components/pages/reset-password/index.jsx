import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { handleEnterKeyPressedInInputField } from "../../../utils/ui.js";
import PasswordInput from "../../ui/input/PasswordInput.jsx";
import useResetPassword from "../../../hooks/auth/use-reset-password.js";

function ResetPassword() {
  const navigate = useNavigate();
  const {
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
  } = useResetPassword();

  if (!userId || !resetToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <Icon
              icon="lucide:alert-triangle"
              className="text-red-500 text-6xl mb-4"
            />
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Button
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              size="lg"
              onPress={() => navigate({ to: "/forgot-password" })}
            >
              Request New Reset Link
            </Button>
            <div className="mt-4">
              <button
                onClick={() => navigate({ to: "/login" })}
                className="text-orange-600 hover:text-orange-800 font-medium underline"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg p-8 max-w-6xl w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/images/landing.png"
            alt="Reset Password"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-2xl font-bold text-orange-700 text-center mb-6">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your new password below.
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
            <PasswordInput
              isRequired
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              variant="bordered"
              startContent={
                <Icon icon="lucide:lock" className="text-orange-400" />
              }
              isDisabled={isSubmitting}
              value={newPassword}
              onValueChange={(value) => {
                setNewPassword(value);
                if (errorMessage || successMessage) {
                  resetMessages();
                }
              }}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () =>
                  handleResetPassword(),
                )
              }
            />

            <PasswordInput
              isRequired
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              variant="bordered"
              startContent={
                <Icon icon="lucide:lock" className="text-orange-400" />
              }
              isDisabled={isSubmitting}
              value={confirmPassword}
              onValueChange={(value) => {
                setConfirmPassword(value);
                if (errorMessage || successMessage) {
                  resetMessages();
                }
              }}
              onKeyDown={(e) =>
                handleEnterKeyPressedInInputField(e, () =>
                  handleResetPassword(),
                )
              }
            />

            <Button
              type="submit"
              className="w-full focus:outline-none hover:border-transparent bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              size="lg"
              onPress={() => handleResetPassword()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
