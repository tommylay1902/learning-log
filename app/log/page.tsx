import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { cookies } from "next/headers";
import React from "react";

export const LogPage = async () => {
  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  const supabase = await createClient();
  const { data: log, error: logError } = await supabase
    .from("log")
    .select()
    .order("created_at", { ascending: false });

  if (logError) console.log("Error fetching logs:", logError);

  let convertedLogs: Record<
    string,
    Database["public"]["Tables"]["log"]["Row"][]
  > | null = null;

  if (log !== null) convertedLogs = convertAndGroupLogs(log, timezone);

  // const learningLogs = log as unknown as LearningLog[];
  const { data, error } = await supabase.auth.getClaims();

  return (
    <>
      <TimeLine entries={convertedLogs} />
      {!error && data && (
        <div className="flex justify-center mb-3">
          <Button>Add Log </Button>
        </div>
      )}
    </>
  );
};

export default LogPage;
