import { DateTime } from "luxon";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const beautifyYMD = (ymd: string) => {
  const date = DateTime.fromISO(ymd);
  const formattedDate = date.toFormat("LLLL d, yyyy");

  return formattedDate;
};

export const currentMonthName = () => {
  const now = new Date();
  return months[now.getMonth()];
};

export const daysInThisMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

export const getLastMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  let daysToSubtract;

  // If today is Monday (1), subtract 7 days to get the previous Monday.
  // Otherwise, calculate the days to subtract to reach the previous Monday.
  // (dayOfWeek - 1) gives the difference from Monday,
  // and adding 7 and taking modulo 7 ensures a positive result for days to subtract.
  if (dayOfWeek === 1) {
    daysToSubtract = 7;
  } else {
    daysToSubtract = (dayOfWeek - 1 + 7) % 7;
  }

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToSubtract);

  // Optionally, set the time to midnight for consistency
  lastMonday.setHours(0, 0, 0, 0);

  return lastMonday;
};
