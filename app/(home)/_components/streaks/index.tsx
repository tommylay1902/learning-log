import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { currentMonthName, daysInThisMonth } from "@/lib/time/date";
import * as React from "react";

const Streaks = async () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const supabase = createClient();

  const { data: logs } = await supabase
    .from("learning_log")
    .select("created_at, time_spent")
    .order("created_at")
    .gte("created_at", firstDayOfMonth.toISOString())
    .lte("created_at", lastDayOfMonth.toISOString());

  const dailyHours: Record<number, number> = {};
  logs?.forEach((log) => {
    const day = new Date(log.created_at).getDate();
    dailyHours[day] =
      (dailyHours[day] || 0) + (log.time_spent ? log.time_spent * 50 : 0) / 60;
  });

  const daysThisMonth = daysInThisMonth();
  const weeks: number[][] = [];

  let currentWeek: number[] = [];
  for (let i = 1; i <= daysThisMonth; i++) {
    currentWeek.push(i);
    if (currentWeek.length === 7 || i === daysThisMonth) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  function getColorClass(contributions: number) {
    if (contributions > 4) return "bg-green-900";
    else if (contributions <= 2) return "bg-green-200";
    else if (contributions <= 4) return "bg-green-600";
    else return "bg-gray-600";
  }

  return (
    <Table className="w-full border-separate border-spacing-2">
      <TableCaption className="font-bold text-xl text-center">
        Learning Streaks - {currentMonthName()}
      </TableCaption>
      <TableHeader>
        <TableRow>{}</TableRow>
      </TableHeader>
      <TableBody>
        {weeks.map((week, weekIndex) => (
          <TableRow key={weekIndex}>
            {week.map((day) => (
              <TableCell
                key={day}
                className={`w-6 h-6 rounded-sm ${getColorClass(dailyHours[day])}`}
                title={
                  dailyHours[day]
                    ? `${dailyHours[day].toFixed(2)}hrs on ${day} ${currentMonthName()}`
                    : `No data for ${day} ${currentMonthName()}`
                }
              ></TableCell>
            ))}
            {week.length < 7 &&
              Array(7 - week.length)
                .fill(0)
                .map((_, i) => (
                  <TableCell key={`empty-${i}`} className="w-4 h-4"></TableCell>
                ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Streaks;
