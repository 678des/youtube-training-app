"use client";

import ReactPlayer from "react-player";
import { getVideoInfo } from "@/lib/my/getVideoInfo";
import { CreateTrainingLogSet } from "@/lib/my/createTrainingLog";
import { createTrainingLog } from "@/lib/my/createTrainingLog";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { EditVideo } from "@/components/my/EditVideo";
import { DeteleVideoSetButton } from "@/components/my/DeleteVideo";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [videoSet, setVideoSet] = useState<any>();
  const [videoSetId, setVideoSetId] = useState<string>();
  const router = useRouter();

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
    const result = await createTrainingLog({
      group: group,
      level: level,
      youtube_video_id: youtube_video_id,
    });
    router.push("/logs");
  };

  return (
    <Suspense>
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {videoSet && videoSetId && (
          <div className="flex flex-col gap-6">
            {/*タイトルと操作ボタン*/}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {videoSet.title}
                </h2>
              </div>

              {/* 編集・削除ボタン */}
              <div className="flex gap-2">
                <EditVideo youtubeVideoSetId={videoSetId} />
                <DeteleVideoSetButton youtubeVideoSetId={videoSetId} />
              </div>
            </div>

            {/*動画プレイヤー */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
              <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                src={`https://www.youtube.com/watch?v=${videoSet.youtube_video_id}`}
              />
            </div>

            {/*情報と完了ボタン */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 詳細情報*/}
              <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-wrap gap-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                    きつさ
                  </p>
                  <p className="text-xl font-semibold text-orange-400">
                    Lv.{videoSet.level}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                    鍛える部位
                  </p>
                  <p className="text-xl font-semibold text-blue-400">
                    {videoSet.group}
                  </p>
                </div>
              </div>

              {/* 完了ボタン*/}
              <button
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={() =>
                  handleSetTrainingLog({
                    group: videoSet.group,
                    level: videoSet.level,
                    youtube_video_id: videoSet.youtube_video_id,
                  })
                }
              >
                <span>この動画を完了</span>
                <span className="text-xl">Check!</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
}
