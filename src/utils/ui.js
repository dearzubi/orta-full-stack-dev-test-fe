import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { KeyboardEvent } from "react";

/**
 * Merge class names with Tailwind CSS support.
 * @param {string[]} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Show a success toast notification.
 * @param message {import("react-toastify").ToastContent}
 * @param [options] {import("react-toastify").ToastOptions}
 * @returns {import("react-toastify").Id | null}
 */
export function successToast(message, options) {
  return toast.success(message, {
    className: "w-full",
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...(options ? options : {}),
  });
}
/**
 * Show an error toast notification.
 * @param message {import("react-toastify").ToastContent}
 * @param [options] {import("react-toastify").ToastOptions}
 * @returns {import("react-toastify").Id | null}
 */
export function errorToast(message, options) {
  return toast.error(message, {
    className: "w-full",
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...(options ? options : {}),
  });
}

/**
 * Handle Enter key press in an input field to trigger a callback.
 * @param {KeyboardEvent<HTMLInputElement> | KeyboardEvent} e
 * @param {() => Promise<void> | void} callback Function to call on Enter key press
 */
export function handleEnterKeyPressedInInputField(e, callback) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    callback();
  }
}
