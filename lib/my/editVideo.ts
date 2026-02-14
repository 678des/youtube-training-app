"use server";
import { createClient } from "@/lib/supabase/server";
import { CreateVideoSet } from "./newVideo";
import { redirect } from "next/navigation";

export async function editVideo(
  videoSetId: string,
  { youtube_video_id, title, group, level }: CreateVideoSet,
) {
  const supabase = await createClient();
  //   const { data } = await supabase.auth.getClaims();
  //   const user = data?.claims;
  let isSuccess = false;
  try {
    await supabase
      .from("videos")
      .update({
        youtube_video_id: youtube_video_id,
        title: title,
        group: group,
        level: level,
      })
      .eq("video_set_id", videoSetId);
    isSuccess = true;
  } catch (error) {}
  if (isSuccess) {
    redirect("/sets");
  }
}
