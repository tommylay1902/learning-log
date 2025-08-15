import { getLastMonday } from "@/lib/time/date";
import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchLogs(supabase: SupabaseClient) {
  const { data: logs, error } = await supabase
    .from("learning_log")
    .select()
    .order("created_at", { ascending: false });
  if (error) throw error;
  return logs;
}

export async function fetchWeeklyLogs(supabase: SupabaseClient) {
  const { data: weeklyLogs, error: weeklyLogErrors } = await supabase
    .from("learning_log")
    .select()
    .gte("created_at", getLastMonday().toISOString());

  if (weeklyLogErrors) throw new Error();

  return weeklyLogs;
}
