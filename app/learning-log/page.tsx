import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";

import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { createClient as createClientServer } from "@/lib/supabase/server";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { cookies } from "next/headers";
import { Pencil } from "lucide-react";

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

  // create server client for auth/private related access
  const supabaseServer = await createClientServer();
  const { data, error } = await supabaseServer.auth.getClaims();

  return (
    <>
      <section className="bg-background flex-1">
        <div className="py-2 ml-3 mx-8">
          <h1 className="text-foreground mb-4 text-center text-5xl font-bold tracking-tighter animate-float-up delay-1000 opacity-0">
            Learning Log
          </h1>

          <LearningStats
            totalTimeSpent={totalTime.total ? totalTime.total : 0}
          />

          <TimeLine entries={convertedLogs} />
        </div>
      </section>
      {!error && data && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 animate-float-up">
          <Button className="shadow-lg">
            <Pencil />
            Add Log
          </Button>
        </div>
      )}
    </>
  );
}
