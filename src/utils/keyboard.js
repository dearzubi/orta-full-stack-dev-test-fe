/**
 * Check if the user is on macOS
 * @returns {boolean} True if on macOS
 */
export const isMacOS = () => {
  return navigator.userAgent.includes("Mac");
};

/**
 * Get the appropriate modifier key name for the current platform
 * @returns {string} 'Cmd' on Mac, 'Ctrl' on others
 */
export const getModifierKeyName = () => {
  return isMacOS() ? "Cmd" : "Ctrl";
};
