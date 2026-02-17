"use client";
import { getVideo } from "@/lib/my/getVideo";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
export function SetVideoList() {
  //TODO contextでデータ管理
  const [videoSets, setVideoSets] = useState<any>();
  const fetchData = async () => {
    const i = await getVideo();
    setVideoSets(i);
    console.log(i, "kore");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    //TODO 新規作成のカードを１つ追加。＋の画像でわかりやすく。
    <div className="grid grid-cols-4 p-4 shadow-sm rounded-xl justify-between gap-x-4 gap-y-4 shadow-md">
      {videoSets?.map((data: any, key: any) => (
        <div key={key} className="p-4 rounded-lg   bg-slate-800  ">
          <div className="w-fit">
            <Link className="block w-fit " href={`sets/${data.video_set_id}`}>
              <img
                src={`https://img.youtube.com/vi/${data.youtube_video_id}/maxresdefault.jpg`}
                className=""
              />
            </Link>
          </div>

          <div className="flex flex-col bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
            {/* タイトル */}
            <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-800">
              <h4 className="font-bold text-slate-100 truncate">
                {data.title}
              </h4>
            </div>

            {/* 情報 */}
            <div className="flex p-3 gap-2">
              {/* 部位 */}
              <div className="flex-1 min-w-0 bg-slate-800/30 px-3 py-2  border border-slate-700/50">
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                  部位
                </span>
                <p className="text-sm text-blue-400 truncate whitespace-nowrap">
                  {data.group}
                </p>
              </div>

              {/* レベル */}
              <div className="flex-1 min-w-0 bg-slate-800/30 px-3 py-2 border border-slate-700/50">
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                  レベル
                </span>
                <p className="text-sm text-orange-400 font-semibold truncate whitespace-nowrap">
                  Lv.{data.level}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="p-4 rounded-lg bg-slate-800 animate-pulse">
        {/* 画像部分の代わり（16:9の比率を維持） */}

        <Link href={"/new"}>
          {" "}
          <div className="aspect-video w-full rounded-md">
            <h4>新規作成</h4>
          </div>
        </Link>

        {/* 下のカード部分の代わり */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
          {/* タイトル部分の箱 */}
          <div className="bg-slate-800/50 px-4 py-4 border-b border-slate-800">
            <div className="h-5 w-3/4 bg-slate-700 rounded"></div>
          </div>

          {/* 情報エリアの箱 */}
          <div className="flex p-3 gap-2">
            {/* 部位の箱 */}
            <div className="flex-1 bg-slate-800/30 px-3 py-2 border border-slate-700/50">
              <div className="h-3 w-8 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 w-12 bg-slate-700 rounded"></div>
            </div>

            {/* レベルの箱 */}
            <div className="flex-1 bg-slate-800/30 px-3 py-2 border border-slate-700/50">
              <div className="h-3 w-8 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 w-12 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
