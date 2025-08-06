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
