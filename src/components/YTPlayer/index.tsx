import { memo } from "react";
import "./YTPlayer.css";

interface YTPlayerProps {
  videoId?: string;
}

const YTPlayer = ({ videoId }: YTPlayerProps) => {
  if (!videoId) {
    return (
      <div className="yt-player yt-player--empty">
        <span>No video selected</span>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className="yt-player">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default memo(YTPlayer);
