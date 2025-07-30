import { DateTime } from "luxon";

export const beautifyYMD = (ymd: string) => {
  const date = DateTime.fromISO(ymd);
  const formattedDate = date.toFormat("LLLL d, yyyy");

  return formattedDate;
};
