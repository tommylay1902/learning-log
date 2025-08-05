import { createClient } from "@/lib/supabase/client";
import { daysInThisMonth } from "@/lib/time/date";
import * as React from "react";
import LearningStreaks from "./learning-streak";

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

  return (
    <div className="overflow-hidden w-full">
      <LearningStreaks dailyHours={dailyHours} daysThisMonth={daysThisMonth} />
    </div>
  );
};

export default Streaks;
