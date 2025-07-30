import { Database } from "@/database.types";

export const convertPomoToHours = (
  pomos: {
    content: string | null;
    created_at: string;
    id: number;
    time_spent: number | null;
    title: string | null;
  }[][],
): number => {
  const totalTimeSpent = pomos?.reduce((acc, pomo) => {
    if (pomo) {
      const totalPomos = pomo.reduce((sum, current) => {
        return sum + (current.time_spent || 0);
      }, 0);
      return acc + totalPomos;
    }
    return acc;
  }, 0);
  return (totalTimeSpent * 50) / 60;
};

export const convertTotalHoursDaily = (
  logs: Record<string, Database["public"]["Tables"]["log"]["Row"][]> | null,
) => {
  const dailyLookup: { [key: string]: string } = {};
  for (const key in logs) {
    let num = 0;
    logs[key].forEach((log) => (num += log.time_spent ? log.time_spent : 0));
    dailyLookup[key] = ((num * 50) / 60).toFixed(2);
  }
  return dailyLookup;
};
