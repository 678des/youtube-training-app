"use server";
import { createClient } from "@/lib/supabase/server";
import { group } from "console";
import { title } from "process";

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
    console.log("!!!");
    if (!user?.sub) return;
    console.log("!!!2");
    await supabase.from("training_logs").insert({
      group: set.group,
      level: set.level,
      youtube_video_id: set.youtube_video_id,
      user: user.sub,
    });
    isSuccess = true;
    console.log("!!!22");
  } catch (err) {
    console.log(err);
  }
}
