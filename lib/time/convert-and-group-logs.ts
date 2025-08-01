import { Database } from "@/database.types";
import { DateTime } from "luxon";
export const convertAndGroupLogs = (
  logs: Database["public"]["Tables"]["learning_log"]["Row"][],
  timezone: string,
) => {
  const groupedLogs: Record<
    string,
    Database["public"]["Tables"]["learning_log"]["Row"][]
  > = {};

  logs.forEach((log) => {
    const dateKey = DateTime.fromISO(log.created_at)
      .setZone(timezone)
      .toString()
      .split("T")[0];

    if (!groupedLogs[dateKey]) {
      groupedLogs[dateKey] = [];
    }

    groupedLogs[dateKey].push(log);
  });

  return groupedLogs;
};
