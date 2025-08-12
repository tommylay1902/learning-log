import { SupabaseClient } from "@supabase/supabase-js";

export async function getCategories(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("category")
    .select(
      `
      title,
      color,
      time_spent:learning_log(
        time_spent.sum()
      )
    `,
    )
    .order("title");
  if (error) throw error;
  return data;
}
