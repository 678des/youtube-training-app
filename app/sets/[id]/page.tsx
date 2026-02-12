import ReactPlayer from "react-player";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ params }: any) {
  const pathname = await params;
  const supabase = await createClient();
  const userVideoCreated = await supabase
    .from("videos")
    .select("*")
    .eq("video_set_id", pathname.id);
  const video = userVideoCreated?.data;

  if (!video) return <>データの取得に失敗しました</>;

  const videoUserId = video[0].user;

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (userId !== videoUserId) return <>このページを見る権限がありません</>;

  const video_id = video[0].youtube_video_id;
  const video_title = video[0].title;
  const video_level = video[0].level;
  const video_group = video[0].group;

  return (
    <div>
      <h2>{video_title}</h2>
      <ReactPlayer src={`https://www.youtube.com/watch?v=${video_id}`} />
      <p>{video_level}</p>
      <p>{video_group}</p>

      <button>この動画を完了</button>
    </div>
  );
}
