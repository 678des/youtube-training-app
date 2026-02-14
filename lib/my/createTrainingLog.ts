"use server";
import { createClient } from "@/lib/supabase/server";

export interface CreateTrainingLogSet {
  group: string;
  level: number;
  youtube_video_id: string;
}
export async function createTrainingLog(set: CreateTrainingLogSet) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let isSuccess = false;

  try {
    if (!user?.sub) return;
    await supabase.from("training_logs").insert({
      group: set.group,
      level: set.level,
      youtube_video_id: set.youtube_video_id,
      user: user.sub,
    });
    isSuccess = true;
  } catch (err) {
    console.log(err);
  }
}
