import { memo } from "react";

import type { Song } from "../../api/types";
import usePlayer from "../../hooks/usePlayer";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import usePersistedState from "../../hooks/usePersistedState";
import Controler from "../Controler";
import Powered from "../Powered";
import BackButton from "../UI/BackButton";
import PlayerHeader from "./PlayerHeader";
import PlayerSource from "./PlayerSource";

interface PlayerProps {
  song: Song | null;
  loading: boolean;
  error: string | null;
}


const containerStyle =
  "player-surface relative flex h-full w-full flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-300/80 bg-gradient-to-br from-[#fffaf2] via-[#f3e3d0] to-[#d9b996] p-4 shadow-sm transition-colors duration-300 sm:p-5 lg:p-6 dark:border-zinc-800 dark:from-[#332526] dark:via-[#24191b] dark:to-[#111214]";


const DESKTOP_COLUMN_WIDTH = "lg:w-[min(50rem,calc(100vw_-_10rem))]";

const BACK_BUTTON_MOBILE =
  "group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 p-0 text-zinc-600 shadow-sm transition-all duration-300 ease-out hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 sm:h-10 sm:w-10 sm:active:scale-100 sm:active:opacity-70 dark:border-zinc-700/80 dark:bg-zinc-900/95 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400";


const BACK_BUTTON_DESKTOP =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e8b27c]/45 bg-[#2a170d]/70 p-0 text-[#f3d9b8] shadow-[inset_0_1px_0_rgba(255,225,190,0.2)] transition-colors duration-200 hover:bg-[#e8b27c] hover:text-[#2a170d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd9a8] active:translate-y-px";

const Player = ({ song, loading, error }: PlayerProps) => {
  const player = usePlayer(song);
  const [keyboardControls] = usePersistedState("music-player-keyboard-controls", false);

  useKeyboardShortcuts({
    enabled: keyboardControls,
    onPlayToggle: player.togglePlay,
    onMuteToggle: player.handleMuteToggle,
    onRestart: player.handleRestart,
    onVolumeChange: player.handleVolumeChange,
    volume: player.volume,
  });

  if (loading) {
    return (
      <main className={containerStyle}>
        <div className="flex flex-1 items-center justify-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Loading song details...
        </div>
      </main>
    );
  }

  if (error || !song) {
    return (
      <main className={containerStyle}>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
            {error || "Song not found."}
          </p>
          <BackButton>BACK</BackButton>
        </div>
      </main>
    );
  }

  return (
    <main className={containerStyle}>
      <div className="absolute left-4 top-4 z-10 sm:left-5 sm:top-5 lg:hidden">
        <BackButton fallbackTo="/" ariaLabel="Back to Home" className={BACK_BUTTON_MOBILE} />
      </div>

      <div className={`mx-auto flex w-full min-h-0 max-w-2xl flex-1 flex-col items-center justify-center gap-3 pt-10 sm:gap-5 sm:pt-2 lg:max-w-none lg:gap-4 lg:pt-0 ${DESKTOP_COLUMN_WIDTH}`}>
        <PlayerHeader
          title={song.title}
          artist={song.artist}
          playing={player.playing}
          leading={<BackButton fallbackTo="/" ariaLabel="Back to Home" className={BACK_BUTTON_DESKTOP} />}
        />
        <PlayerSource
          videoId={player.videoId}
          loading={player.videoLoading}
          error={player.videoError}
          playerRef={player.playerRef}
        />
        <div className="w-full shrink-0">
          <Controler
            playing={player.playing}
            disabled={player.videoLoading || !player.videoId}
            volume={player.volume}
            onTogglePlay={player.togglePlay}
            onVolumeChange={player.handleVolumeChange}
            currentTime={player.currentTime}
            duration={player.duration}
            onMuteToggle={player.handleMuteToggle}
            onRestart={player.handleRestart}
          />
        </div>
      </div>

      <footer className="mt-2 flex shrink-0 items-center justify-center pt-1 sm:mt-3">
        <Powered provider="YouTube" url="https://www.youtube.com/" />
      </footer>
    </main>
  );
};

export default memo(Player);