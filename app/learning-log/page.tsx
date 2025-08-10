import TimeLine from "./_components/timeline";
import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/client";

import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { cookies } from "next/headers";

import React from "react";
import { convertPomoToHours } from "@/lib/time/convert";
import LearningStats from "./_components/learning-stats";

export default async function Page() {
  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  const supabase = createClient();
  const { data: log, error: logError } = await supabase
    .from("learning_log")
    .select()
    .order("created_at", { ascending: false });

  if (logError) console.log("Error fetching logs:", logError);

  let convertedLogs: Record<
    string,
    Database["public"]["Tables"]["learning_log"]["Row"][]
  > | null = null;
  const totalTime: { total?: number | undefined } = { total: undefined };

  if (log !== null) {
    convertedLogs = convertAndGroupLogs(log, timezone);
    totalTime.total = convertPomoToHours(Object.values(convertedLogs));
  }

  return (
    <>
      <section className="flex-1">
        <div className="py-2 ml-3 mx-8">
          <h1 className="mb-4 text-center text-5xl font-bold tracking-tighter animate-float-up delay-1000 opacity-0">
            Learning Log
          </h1>

          <LearningStats
            totalTimeSpent={totalTime.total ? totalTime.total : 0}
          />

          <TimeLine entries={convertedLogs} />
        </div>
      </section>
    </>
  );
}
