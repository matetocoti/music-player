import { memo } from "react";
import Song from "../../domain/models/Song";
import "./SongPlayer.css";

interface SongPlayerProps {
  song: Song;
  playing?: boolean;
  onPlayToggle?: () => void;
}

const SongPlayer = ( { song ,playing = false ,onPlayToggle }: SongPlayerProps) => {
    return (
      <section className="song-player">
        <div className="player-controls">
          <button
            onClick={onPlayToggle}
            aria-label={playing ? "Pause song" : "Play song"}
          >
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
