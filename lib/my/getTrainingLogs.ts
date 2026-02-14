"use server";
import { createClient } from "@/lib/supabase/server";

export async function getTrainingLogs() {
  const supabase = await createClient();
  let data;
  let isSuccess = false;
  try {
    data = await supabase.from("training_logs").select("*");
    isSuccess = true;
  } catch (error) {
    console.log(error);
  }

  if (!isSuccess) return "[{error}]";
  return data?.data;
}
