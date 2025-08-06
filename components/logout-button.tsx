"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export function LogoutButton() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = redirectTo;
  };

  return <Button onClick={logout}>Logout</Button>;
}
