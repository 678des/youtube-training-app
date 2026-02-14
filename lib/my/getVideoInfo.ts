"use server";
import { createClient } from "@/lib/supabase/server";

export async function getVideoInfo(videoSetId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let isSuccess = false;
  let videoSet;
  try {
    if (!user?.sub) return;
    videoSet = await supabase
      .from("videos")
      .select()
      .eq("user", user.sub)
      .eq("video_set_id", videoSetId);
    isSuccess = true;
    console.log(videoSet.data);
  } catch (err) {
    console.log(err);
  }
  if (isSuccess) {
  }
  return videoSet?.data;
}
