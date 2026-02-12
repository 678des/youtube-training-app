"use server";
import { createClient } from "@/lib/supabase/server";

export async function getVideo() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let isSuccess = false;
  let videoSets;
  try {
    if (!user?.sub) return;
    videoSets = await supabase.from("videos").select().eq("user", user.sub);
    isSuccess = true;
    console.log(videoSets.data);
  } catch (err) {
    console.log(err);
  }
  if (isSuccess) {
  }
  return videoSets?.data;
}
