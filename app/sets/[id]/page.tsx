"use client";

import ReactPlayer from "react-player";
import { getVideoInfo } from "@/lib/my/getVideoInfo";
import { CreateTrainingLogSet } from "@/lib/my/createTrainingLog";
import { createTrainingLog } from "@/lib/my/createTrainingLog";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { EditVideo } from "@/components/my/EditVideo";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [videoSet, setVideoSet] = useState<any>();
  const [videoSetId, setVideoSetId] = useState<string>();

  useEffect(() => {
    const getVideo = async () => {
      const para = await params;
      setVideoSetId(String(para.id));
      console.log(para);
      const video = await getVideoInfo(String(para.id));
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
    await createTrainingLog({
      group: group,
      level: level,
      youtube_video_id: youtube_video_id,
    });
  };

  return (
    <Suspense>
      {videoSet && videoSetId && (
        <>
          <EditVideo youtubeVideoSetId={videoSetId}></EditVideo>
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
