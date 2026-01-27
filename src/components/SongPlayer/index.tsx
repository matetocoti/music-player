import { memo, useRef, useState } from "react";
import Song from "../../domain/models/Song";
import "./SongPlayer.css";

interface SongPlayerProps {
  song: Song;
}

const SongPlayer = ({ song }: SongPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="song-player">
      <audio ref={audioRef} src={song.url} preload="metadata" />

      <div className="player-controls">
        <button onClick={togglePlay}>
          {playing ? "⏸️" : "▶️"}
        </button>

        <div className="song-info">
          <strong>{song.title}</strong>
          <span>{song.artist}</span>
        </div>
      </div>
    </section>
  );
};

export default memo(SongPlayer);
