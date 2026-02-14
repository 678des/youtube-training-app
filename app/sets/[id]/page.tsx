"use client";

import ReactPlayer from "react-player";
import { getVideoInfo } from "@/lib/my/getVideoInfo";
import { CreateTrainingLogSet } from "@/lib/my/createTrainingLog";
import { createTrainingLog } from "@/lib/my/createTrainingLog";
import { useState, useEffect } from "react";
import { Suspense } from "react";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [videoSet, setVideoSet] = useState<any>();

  useEffect(() => {
    const getVideo = async () => {
      const para = await params;
      console.log(para);
      const video = await getVideoInfo(String(para.id));
      console.log(video, "ここ？");
      if (!video) return;
      setVideoSet(video[0]);
    };
    getVideo();
  }, []);
  const handleSetTrainingLog = async ({
    group,
    level,
    youtube_video_id,
  }: CreateTrainingLogSet) => {
    console.log("まず");
    await createTrainingLog({
      group: group,
      level: level,
      youtube_video_id: youtube_video_id,
    });
  };

  return (
    <Suspense>
      {videoSet && (
        <>
          <h2>{videoSet.title}</h2>
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoSet.youtube_video_id}`}
          />
          <p>{videoSet.level}</p>
          <p>{videoSet.group}</p>

          <button
            onClick={() =>
              handleSetTrainingLog({
                group: videoSet.group,
                level: videoSet.level,
                youtube_video_id: videoSet.youtube_video_id,
              })
            }
          >
            この動画を完了
          </button>
        </>
      )}
    </Suspense>
  );
}
