import { AuthButton } from "@/components/auth-button";
import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { createClient } from "@/lib/supabase/server";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
interface Entry {
  content: string;
  time_spent: number;
  time: string;
  title: string;
}
export interface LearningLog {
  display_date: string;
  entries: Entry[];
}
export default async function Home() {
  const supabase = await createClient();
  const { data: log, error: logError } = await supabase.rpc(
    "get_logs_grouped_by_date"
  );
  const learningLogs = log as unknown as LearningLog[];
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
        <TimeLine entries={learningLogs} />
        {!error && data && <Button>Add Log </Button>}
      </main>
    </>
  );
}
