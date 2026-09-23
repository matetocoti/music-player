import { useEffect } from "react";

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
}

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  return target.isContentEditable || ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

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
}: KeyboardShortcutHandlers) => {
  useEffect(() => {
    if (!enabled) return;

    const shortcuts = new Map<string, () => void>();

    if (onPlayToggle) shortcuts.set(" ", onPlayToggle);
    if (onMuteToggle) shortcuts.set("m", onMuteToggle);
    if (onRestart) shortcuts.set("r", onRestart);
    if (onAddSong) shortcuts.set("n", onAddSong);
    if (onOpenSettings) shortcuts.set("o", onOpenSettings);
    if (onPreviousPage) shortcuts.set("ArrowLeft", onPreviousPage);
    if (onNextPage) shortcuts.set("ArrowRight", onNextPage);
    if (onVolumeChange && typeof volume === "number") {
      shortcuts.set("ArrowUp", () => onVolumeChange(Math.min(100, volume + 5)));
      shortcuts.set("ArrowDown", () => onVolumeChange(Math.max(0, volume - 5)));
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const action = shortcuts.get(event.key) ?? shortcuts.get(event.key.toLowerCase());
      if (!action) return;

      event.preventDefault();
      action();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    enabled,
    onAddSong,
    onMuteToggle,
    onNextPage,
    onOpenSettings,
    onPlayToggle,
    onPreviousPage,
    onRestart,
    onVolumeChange,
    volume,
  ]);
};

export default useKeyboardShortcuts;
