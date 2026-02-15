"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface CreateVideoSet {
  title: string;
  group: string;
  level: number;
  youtube_video_id: string;
}

export async function newVideo(videoset: CreateVideoSet) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  let isSuccess = false;
  try {
    if (!user?.sub) return;
    await supabase.from("videos").insert({
      title: videoset.title,
      group: videoset.group,
      level: videoset.level,
      youtube_video_id: videoset.youtube_video_id,
      user: user?.sub,
    });
    isSuccess = true;
  } catch (err) {
    console.log(err);
  }
  if (isSuccess) {
    redirect("/sets");
    //TODO飛んだ時に、５秒間ほど、今登録したセットを強調するアニメーションを作成
  }
}
