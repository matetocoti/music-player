import { Info } from "lucide-react";
import type { ReactNode } from "react";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import GridControls from "../Sections/GridControls";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SettingsSection = ({ title, description, children }: SettingsSectionProps) => (
  <section className="border-t border-zinc-200/80 pt-5 first:border-t-0 first:pt-0 dark:border-zinc-800">
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
    <div className="mt-4">
      {children}
    </div>
  </section>
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
    <div className="space-y-6">
      <div className="hidden sm:block">
        <SettingsSection
          title="Grid layout"
          description="Choose how many columns are visible in your library."
        >
          <GridControls
            columns={columns}
            onColumnsChange={onColumnsChange}
          />
        </SettingsSection>
      </div>

      <SettingsSection
        title="Library"
        description="Control how many songs are loaded at a time."
      >
        <label className="flex items-center justify-between gap-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
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
            options={[9, 12, 15, 18].map((size) => ({ value: String(size), label: String(size) }))}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
          />
        </label>
      </SettingsSection>

      <SettingsSection
        title="Accessibility"
        description="Adjust the interface for improved readability and focus visibility."
      >
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-emerald-300/70 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-200 dark:hover:border-emerald-800/70 dark:hover:bg-emerald-950/20">
          <span>
            {`High contrast`}
            <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Increases contrast for text, borders, and focus states.
            </span>
          </span>
          <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(event) => onHighContrastChange(event.target.checked)}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 focus-visible:outline-none"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full border border-zinc-300 bg-zinc-200 transition-colors duration-200 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-700 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500 dark:peer-focus-visible:ring-offset-zinc-900" />
            <span className="pointer-events-none relative ml-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5 dark:bg-zinc-100" />
          </span>
        </label>
        <label aria-label="Keyboard controls, experimental" className="mt-3 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-emerald-300/70 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-200 dark:hover:border-emerald-800/70 dark:hover:bg-emerald-950/20">
          <span className="flex min-w-0 flex-col">
            <span className="flex items-center gap-2">
              <span>Keyboard controls</span>
              <span aria-hidden="true" className="rounded-full border border-amber-300/80 bg-amber-100/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-700/70 dark:bg-amber-950/40 dark:text-amber-300">
                Experimental
              </span>
            </span>
            <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Enable keyboard shortcuts for playback and library navigation.
            </span>
          </span>
          <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
            <input
              type="checkbox"
              checked={keyboardControls}
              onChange={(event) => onKeyboardControlsChange(event.target.checked)}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 focus-visible:outline-none"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full border border-zinc-300 bg-zinc-200 transition-colors duration-200 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-700 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500 dark:peer-focus-visible:ring-offset-zinc-900" />
            <span className="pointer-events-none relative ml-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5 dark:bg-zinc-100" />
          </span>
        </label>
        <details className="mt-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 text-sm text-zinc-600 transition-colors open:border-emerald-300/70 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-300 dark:open:border-emerald-800/70">
          <summary className="cursor-pointer px-3 py-2.5 font-semibold text-zinc-700 outline-none marker:text-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-zinc-200">
            How to use the keyboard
          </summary>
          <div className="space-y-3 border-t border-zinc-200/70 px-3 pb-3 pt-3 text-xs dark:border-zinc-800">
            <div>
              <p className="mb-1 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Library</p>
              <p>The first song is focused automatically when the library opens.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">W / S</kbd> move between rows; <kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">A / D</kbd> move between songs.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">Enter</kbd> opens the focused song.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">Home / End</kbd> jump to the first or last song.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">N</kbd> adds a song; <kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">O</kbd> opens settings.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">← / →</kbd> change pages.</p>
            </div>
            <div>
              <p className="mb-1 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Player</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">Space</kbd> plays or pauses, <kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">M</kbd> mutes.</p>
              <p><kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">R</kbd> restarts, <kbd className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">Up/Down</kbd> changes volume.</p>
            </div>
          </div>
        </details>
      </SettingsSection>
      
      <footer className="border-t border-zinc-200/80 pt-5 dark:border-zinc-800">
        <button
          type="button"
          onClick={onResetDefaults}
          className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400"
        >
          Reset to defaults
        </button>
        <span className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <Info className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
          Defaults are optimized for your current screen and performance.
        </span>
      </footer>
    </div>
  </Modal>
);

export default LibrarySettingsModal;