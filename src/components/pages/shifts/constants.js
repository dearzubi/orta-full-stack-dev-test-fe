export const SHIFT_TYPES = {
  WEEKEND: "Weekend",
  WEEKDAY: "Weekday",
  EVENING: "Evening",
  MORNING: "Morning",
  NIGHT: "Night",
};

export const shiftTypeOptions = [
  { key: SHIFT_TYPES.MORNING, label: "Morning" },
  { key: SHIFT_TYPES.EVENING, label: "Evening" },
  { key: SHIFT_TYPES.NIGHT, label: "Night" },
  { key: SHIFT_TYPES.WEEKDAY, label: "Weekday" },
  { key: SHIFT_TYPES.WEEKEND, label: "Weekend" },
];

export const SHIFT_CONSTRAINTS = Object.freeze({
  // Worker can clock in no earlier than 10 minutes before shift starts
  EARLY_CLOCK_IN_BUFFER: 10,

  // Worker must clock out at least 2 hours before shift ends
  MINIMUM_CLOCK_OUT_BUFFER: 120,
});

export const DAYS_OF_WEEK = [
  { key: "monday", label: "Monday", value: 1 },
  { key: "tuesday", label: "Tuesday", value: 2 },
  { key: "wednesday", label: "Wednesday", value: 3 },
  { key: "thursday", label: "Thursday", value: 4 },
  { key: "friday", label: "Friday", value: 5 },
  { key: "saturday", label: "Saturday", value: 6 },
  { key: "sunday", label: "Sunday", value: 0 },
];

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
