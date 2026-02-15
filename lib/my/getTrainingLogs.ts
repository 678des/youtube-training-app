"use server";
import { createClient } from "@/lib/supabase/server";

export async function getTrainingLogs() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let res;
  let isSuccess = false;
  try {
    res = await supabase
      .from("training_logs")
      .select("*")
      .eq("user", user?.sub);
    isSuccess = true;
  } catch (error) {
    console.log(error);
  }

  if (!isSuccess) return "[{error}]";
  return res?.data;
}
