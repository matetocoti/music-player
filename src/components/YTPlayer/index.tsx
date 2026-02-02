import { memo } from "react";
import "./YTPlayer.css";

interface YTPlayerProps {
  videoId?: string;
}

const YTPlayer = ({ videoId }: YTPlayerProps) => {
  if (!videoId) {
    return <div>No video selected</div>;
  }

  return (
    <div className="yt-player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        width="100%"
        height="300"
        className="yt-player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube video player"
      />  
    </div>
  );
};

export default memo(YTPlayer);
