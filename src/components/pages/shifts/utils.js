import dayjs from "dayjs";

/**
 * @param {string} status
 * @return {string}
 */
export const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled":
      return "default";
    case "In Progress":
      return "primary";
    case "Completed":
      return "success";
    case "Cancelled":
      return "danger";
    default:
      return "default";
  }
};

/**
 * @param {string} type
 * @return {string}
 */
export const getTypeColor = (type) => {
  switch (type) {
    case "Morning":
      return "warning";
    case "Evening":
      return "secondary";
    case "Night":
      return "primary";
    case "Weekend":
      return "success";
    case "Weekday":
      return "default";
    default:
      return "default";
  }
};

/**
 * @param {string} date
 * @return {string}
 */
export const formatToFullDate = (date) => {
  return dayjs(date).format("dddd, MMMM D, YYYY");
};

/**
 * @param {string} time
 * @return {string}
 */
export const formatTo24HTime = (time) => {
  return dayjs(`2000-01-01 ${time}`).format("HH:mm");
};
