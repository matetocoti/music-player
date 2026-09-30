import { RotateCcw } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import Modal from "../../UI/Modal";
import Details from "../../UI/Details";
import Select from "../../UI/Select";
import GridControls from "../Sections/GridControls";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SettingsSection = ({title, description, children,}: SettingsSectionProps) => (
  <section className="border-t border-zinc-200/80 pt-5 first:border-t-0 first:pt-0 dark:border-zinc-800">
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded-md border border-zinc-300/80 bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
    {children}
  </kbd>
);

interface ToggleRowProps {
  title: string;
  description: string;
  badge?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const ToggleRow = ({
  title,
  description,
  badge,
  checked,
  onChange,
  inputProps,
}: ToggleRowProps) => (
  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:border-emerald-300/70 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-200 dark:hover:border-emerald-800/70 dark:hover:bg-emerald-950/20">
    <span className="flex min-w-0 flex-col">
      <span className="flex items-center gap-2">
        <span>{title}</span>
        {badge}
      </span>
      <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
        {description}
      </span>
    </span>
    <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 focus-visible:outline-none"
        {...inputProps}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full border border-zinc-300 bg-zinc-200 transition-colors duration-200 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-700 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500 dark:peer-focus-visible:ring-offset-zinc-900" />
      <span className="pointer-events-none relative ml-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5 dark:bg-zinc-100" />
    </span>
  </label>
);

interface LibrarySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: number;
  pageSize: number;
  highContrast: boolean;
  keyboardControls: boolean;
  onColumnsChange: (columns: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onHighContrastChange: (enabled: boolean) => void;
  onKeyboardControlsChange: (enabled: boolean) => void;
  onResetDefaults: () => void;
}

const LibrarySettingsModal = ({
  isOpen,
  onClose,
  columns,
  pageSize,
  highContrast,
  keyboardControls,
  onColumnsChange,
  onPageSizeChange,
  onHighContrastChange,
  onKeyboardControlsChange,
  onResetDefaults,
}: LibrarySettingsModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Library settings">
    <div className="max-h-[calc(100dvh-9rem)] space-y-6 overflow-y-auto pr-1">
      <div className="hidden sm:block">
        <SettingsSection
          title="Grid layout"
          description="Choose how many columns are visible in your library."
        >
          <span className="ml-4 pt-1.5 flex bg-white/1 rounded-l rounded-r border-l border-zinc-200/80 pl-4 dark:border-slate-500/50">
            <GridControls columns={columns} onColumnsChange={onColumnsChange} />
          </span>
        </SettingsSection>
      </div>

      <SettingsSection
        title="Library"
        description="Control how many songs are loaded at a time."
      >
        <div className="flex items-center justify-between gap-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          <span>
            {`Items per page`}
            <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Controls how many songs are loaded for each page.
            </span>
          </span>
          <Select
            value={String(pageSize)}
            onChange={(value) => onPageSizeChange(Number(value))}
            ariaLabel="Items per page"
            options={[9, 12, 15, 18].map((size) => ({
              value: String(size),
              label: String(size),
            }))}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Accessibility"
        description="Adjust the interface for improved readability and focus visibility."
      >
        <div className="border-l border-zinc-200/80 pl-4 dark:border-zinc-800">
          <div className="space-y-3">
            <ToggleRow
              title="High contrast"
              description="Increases contrast for text, borders, and focus states."
              checked={highContrast}
              onChange={onHighContrastChange}
            />

            <ToggleRow
              title="Keyboard controls"
              description="Enable keyboard shortcuts for playback and library navigation."
              checked={keyboardControls}
              onChange={onKeyboardControlsChange}
              inputProps={{ "aria-describedby": "keyboard-controls-badge" }}
              badge={
                <span
                  id="keyboard-controls-badge"
                  className="rounded-full border border-amber-300/80 bg-amber-100/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-700/70 dark:bg-amber-950/40 dark:text-amber-300"
                >
                  Experimental
                </span>
              }
            />

            <Details summary="How to use the keyboard">
              <div className="space-y-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-300">
                <div className="space-y-1.5">
                  <p className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Library
                  </p>
                  <p>
                    The first song is focused automatically when the library
                    opens.
                  </p>
                  <p>
                    <Kbd>W</Kbd> / <Kbd>S</Kbd> move between rows; <Kbd>A</Kbd>{" "}
                    / <Kbd>D</Kbd> move between songs.
                  </p>
                  <p>
                    <Kbd>Enter</Kbd> opens the focused song.
                  </p>
                  <p>
                    <Kbd>Home</Kbd> / <Kbd>End</Kbd> jump to the first or last
                    song.
                  </p>
                  <p>
                    <Kbd>N</Kbd> adds a song; <Kbd>O</Kbd> opens settings.
                  </p>
                  <p>
                    <Kbd>←</Kbd> / <Kbd>→</Kbd> change pages.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Player
                  </p>
                  <p>
                    <Kbd>Space</Kbd> plays or pauses, <Kbd>M</Kbd> mutes.
                  </p>
                  <p>
                    <Kbd>R</Kbd> restarts, <Kbd>↑</Kbd> / <Kbd>↓</Kbd> changes
                    volume.
                  </p>
                  <p>
                    <Kbd>Esc</Kbd> returns to the previous page.
                  </p>
                </div>
              </div>
            </Details>
          </div>
        </div>
      </SettingsSection>

      <footer className="border-t border-zinc-600/40 pt-5 dark:border-zinc-800 max-w-[calc(100%-2rem)] mx-auto">
        <button
          type="button"
          onClick={onResetDefaults}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/60 bg-amber-50/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-700 transition-all duration-200 ease-out hover:border-amber-400 hover:bg-amber-100/60 hover:text-amber-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 sm:active:scale-100 sm:active:opacity-70 dark:border-amber-800/50 dark:bg-amber-950/20 dark:text-amber-300 dark:hover:border-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-200 dark:focus-visible:ring-offset-zinc-900"
        >
          <RotateCcw
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-45"
            aria-hidden="true"
          />
          Reset to defaults
        </button>
        <span className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
          
          Defaults are optimized for your current screen and performance.
        </span>
      </footer>
    </div>
  </Modal>
);

export default LibrarySettingsModal;
