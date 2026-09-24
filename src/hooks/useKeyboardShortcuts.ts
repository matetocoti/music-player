import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";


interface KeyboardShortcutHandlers {
  enabled?: boolean;
  onPlayToggle?: () => void;
  onMuteToggle?: () => void;
  onRestart?: () => void;
  onVolumeChange?: (volume: number) => void;
  volume?: number;
  onAddSong?: () => void;
  onOpenSettings?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onGoBack?: () => void;
}


const isGuardedTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  if (target.isContentEditable) return true;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;

  return !!target.closest('button, a[href], [role="button"], [role="option"], [role="listbox"]');
};


const NON_REPEATABLE_KEYS = new Set([" ", "m", "r", "n", "o", "arrowleft", "arrowright", "escape", "asc"]);

const useKeyboardShortcuts = ({
  enabled = false,
  onPlayToggle,
  onMuteToggle,
  onRestart,
  onVolumeChange,
  volume,
  onAddSong,
  onOpenSettings,
  onPreviousPage,
  onNextPage,
  onGoBack,
}: KeyboardShortcutHandlers) => {
  const location = useLocation();
  const navigate = useNavigate();

  const liveRef = useRef({
    onPlayToggle,
    onMuteToggle,
    onRestart,
    onVolumeChange,
    volume,
    onAddSong,
    onOpenSettings,
    onPreviousPage,
    onNextPage,
    onGoBack,
  });

  useEffect(() => {
    liveRef.current = {
      onPlayToggle,
      onMuteToggle,
      onRestart,
      onVolumeChange,
      volume,
      onAddSong,
      onOpenSettings,
      onPreviousPage,
      onNextPage,
      onGoBack,
    };
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const key = event.key.toLowerCase();
      if (event.repeat && NON_REPEATABLE_KEYS.has(key)) return;

      if (key === "escape") {
        if (location.pathname === "/") return;

        event.preventDefault();
        (liveRef.current.onGoBack ?? (() => navigate(-1)))();
        return;
      }

      if (!enabled || isGuardedTarget(event.target)) return;

      const {
        onPlayToggle: play,
        onMuteToggle: mute,
        onRestart: restart,
        onVolumeChange: changeVolume,
        volume: currentVolume,
        onAddSong: addSong,
        onOpenSettings: openSettings,
        onPreviousPage: previousPage,
        onNextPage: nextPage,
      } = liveRef.current;

      let action: (() => void) | undefined;

      switch (key) {
        case " ":
          action = play;
          break;
        case "m":
          action = mute;
          break;
        case "r":
          action = restart;
          break;
        case "n":
          action = addSong;
          break;
        case "o":
          action = openSettings;
          break;
        case "arrowleft":
          action = previousPage;
          break;
        case "arrowright":
          action = nextPage;
          break;
        case "arrowup":
          if (changeVolume && typeof currentVolume === "number") {
            action = () => changeVolume(Math.min(100, currentVolume + 5));
          }
          break;
        case "arrowdown":
          if (changeVolume && typeof currentVolume === "number") {
            action = () => changeVolume(Math.max(0, currentVolume - 5));
          }
          break;
      }

      if (!action) return;
      event.preventDefault();
      action();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, location.pathname, navigate]);
};

export default useKeyboardShortcuts;