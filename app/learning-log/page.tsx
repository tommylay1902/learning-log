import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";

import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { createClient as createClientServer } from "@/lib/supabase/server";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { cookies } from "next/headers";
import { Pencil } from "lucide-react";
import React from "react";

export default async function Page() {
  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  const supabase = createClient();
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

  const supabaseServer = await createClientServer();
  const { data, error } = await supabaseServer.auth.getClaims();

  return (
    <>
      <TimeLine entries={convertedLogs} />
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
