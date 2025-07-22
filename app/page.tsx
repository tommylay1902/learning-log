import { AuthButton } from "@/components/auth-button";
import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { createClient } from "@/lib/supabase/server";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";

export default async function Home() {
  const supabase = await createClient();
  const { data: log } = await supabase
    .from("log")
    .select()
    .order("created_at", { ascending: false });
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
        <TimeLine entries={log} />
        {!error && data && <Button>Add Log </Button>}
      </main>
    </>
  );
}
