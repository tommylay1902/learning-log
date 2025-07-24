import { AuthButton } from "@/components/auth-button";
import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { createClient } from "@/lib/supabase/server";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { Database } from "@/database.types";
import { cookies } from "next/headers";

export default async function Home() {
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
      <div className="flex justify-end w-full p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <AuthButton />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <main className="min-h-screen flex flex-col items-center">
        <TimeLine entries={convertedLogs} />
        {!error && data && <Button>Add Log </Button>}
      </main>
    </>
  );
}
