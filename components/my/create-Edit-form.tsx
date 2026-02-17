// "LXb3EKWsInQ"
// 標準的な形式: https://www.youtube.com/watch?v=xxxxxxxxxxx
// 短縮形式: https://youtu.be/xxxxxxxxxxx （共有ボタンを押した時によく使われます）
// YouTube ショート: https://www.youtube.com/shorts/xxxxxxxxxxx
// 埋め込み用: https://www.youtube.com/embed/xxxxxxxxxxx

//https://www.youtube.com/watch?v=hSBXH9i5MaY
//IDだけに変換する処理を

"use client";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { newVideo } from "@/lib/my/newVideo";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { editVideo } from "@/lib/my/editVideo";

// TODO:編集モードで動画変更をできないようにする。変更したかったら消すだけ。トレーニングログでセットに飛べるようにするため。
//　TODO:バリデーションチェック
export function newMovie() {
  const mode = useSearchParams().get("mode");
  const movieSetId = useSearchParams().get("id");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (mode == "edit") {
      console.log("編集モードです");
      setIsEditMode(true);
    } else {
      console.log("作成モードです", mode);
    }
  }, []);

  const [target, setGroup] = useState("chest");
  const [level, setlevel] = useState(9999);
  const [title, settitle] = useState("新しいトレーニングセット");
  const [videoId, setUrl] = useState<string>("hSBXH9i5MaY");

  const handleURLInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //正規表現をし、11桁のIDを取得
    //"https://www.youtube.com/watch?v=hSBXH9i5MaY"
    console.log("いまからURL処理");
    const inputUrl = event.target.value;
    const pattern = /https:\/\/\www.youtube.com\/\watch\?v=/;

    if (pattern.test(event.target.value)) {
      const i = inputUrl.match("(?<=v=).*");
      if (!i) return;
      setUrl(i[0]);
    } else {
      alert("正しいURLを貼ってくださいdd");
    }
  };

  const handleRegisterVideoSet = () => {
    const videoset = {
      title: title,
      level: level,
      group: target,
      youtube_video_id: videoId,
    };
    //TODO title等の型を確認
    if (!title) {
      toast("タイトルは「文字,数字,〇〇」のみ使用できます。");
      toast("タイトルを入力してください");
      return;
    }

    //TODO editモードだったらeditVideoを追加
    if (isEditMode) {
      if (movieSetId) editVideo(movieSetId, videoset);
    } else {
      newVideo(videoset);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center m-4">
        {!isEditMode ? (
          <h1 className="">新しい動画セットを登録</h1>
        ) : (
          <h1 className="">セット編集</h1>
        )}
      </div>

      <div className="max-w-2xl mx-auto p-6 flex flex-col gap-8 bg-slate-900 rounded-2xl shadow-xl text-slate-50 ">
        {/* タイトル */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400 ml-1">動画タイトル</label>
          <input
            type="text"
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => settitle(event.target.value)}
            defaultValue={title}
          />
        </div>

        {/* 動画 */}
        <div className="flex flex-col gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoId}`}
            //TODO onError={}//動画が消された、存在しなかったときの処理
            //あ、前のページに戻って、アラートで存在しなかったって言えばいい
          ></ReactPlayer>
          {!isEditMode ? (
            <input
              type="text"
              className="bg-slate-900 border border-slate-700 p-2 rounded"
              onBlur={handleURLInputChange}
              defaultValue={`https://www.youtube.com/watch?v=${videoId}`}
              // readOnly
            />
          ) : (
            <input
              type="text"
              className="bg-slate-900 border border-slate-700 p-2 rounded text-sm text-slate-400"
              onBlur={handleURLInputChange}
              defaultValue={`https://www.youtube.com/watch?v=${videoId}`}
              readOnly
            />
          )}
        </div>

        {/* レベルと部位 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <label className="text-sm text-slate-400 ml-1">きつさ</label>
              <p className="text-xs text-slate-500">(体力満タン時)</p>
            </div>
            <select
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg"
              onChange={(event) => setlevel(parseInt(event.target.value))}
              value={level}
            >
              <option value={1}>Lv1.楽</option>
              <option value={2}>Lv2.普通</option>
              <option value={3}>Lv3.きつい</option>
              <option value={4}>Lv4.とてもきつい</option>
              <option value={5}>Lv5.極限</option>
              <option value={3}>自分次第</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400 ml-1">鍛える部位</label>
            <select
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg"
              onChange={(event) => setGroup(event.target.value)}
              value={target}
            >
              <option value="chest">胸</option>
              <option value="back">背中</option>
              <option value="shoulders">肩</option>
              <option value="arms">腕</option>
              <option value="legs">足・下半身</option>
              <option value="abs">体幹・腹筋</option>
              <option value="fullbody">全身運動</option>
              <option value="other">その他</option>
            </select>
          </div>
        </div>

        {/* 作成・編集確定ボタン */}
        {!isEditMode ? (
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            onClick={() => handleRegisterVideoSet()}
          >
            上記の内容でトレーニング動画を登録する
          </button>
        ) : (
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            onClick={() => handleRegisterVideoSet()}
          >
            編集を確定する
          </button>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
