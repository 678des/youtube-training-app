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
      youtube_video_id: "hSBXH9i5MaY",
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
      <div className="flex flex-col">
        <input
          type="text"
          onChange={(event) => settitle(event.target.value)}
          defaultValue={title}
        />
      </div>

      <div className="flex flex-col justify-center">
        <ReactPlayer
          className="m-auto"
          src={`https://www.youtube.com/watch?v=${videoId}`}
          //TODO onError={}//動画が消された、存在しなかったときの処理
          //あ、前のページに戻って、アラートで存在しなかったって言えばいい
        ></ReactPlayer>
        <input
          type="text"
          onBlur={handleURLInputChange}
          defaultValue={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>

      <div className="flex items-center justify-center">
        <div>
          <h3>きつさ</h3>
          <p>(体力満タン時)</p>
        </div>
        <select
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
      <div className="flex items-center justify-center">
        <h3>鍛える部位</h3>
        <select
          className="ml-auto"
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

      {!isEditMode ? (
        <button onClick={() => handleRegisterVideoSet()}>
          上記の内容でトレーニング動画を登録する
        </button>
      ) : (
        <button onClick={() => handleRegisterVideoSet()}>編集を確定する</button>
      )}

      <ToastContainer />
    </div>
  );
}
