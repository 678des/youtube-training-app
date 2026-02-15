import { Button } from "../ui/button";
import { deleteVideo } from "@/lib/my/deleteVideo";
export function DeteleVideoSetButton({
  youtubeVideoSetId,
}: {
  youtubeVideoSetId: string;
}) {
  const handleDeleteVideo = async () => {
    deleteVideo(youtubeVideoSetId);
  };
  return <Button onClick={handleDeleteVideo}>削除</Button>;
}
