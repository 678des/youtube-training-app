"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteVideo(videoSetId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let isSuccess = false;
  try {
    if (!user) return;
    await supabase
      .from("videos")
      .delete()
      .eq("video_set_id", videoSetId)
      .eq("user", user?.sub);
    isSuccess = true;
  } catch (error) {}
  if (isSuccess) {
    redirect("/sets");
  }
}
