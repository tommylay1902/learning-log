import { AuthButton } from "@/components/auth-button";
import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { createClient as createClientServer } from "@/lib/supabase/server";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { cookies } from "next/headers";
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
      <div className="flex justify-end w-full p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <AuthButton />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <TimeLine entries={convertedLogs} />
      {!error && data && (
        <div className="flex justify-center mb-3">
          <Button>Add Log</Button>
        </div>
      )}
    </>
  );
}
