import { Info } from "lucide-react"; // Added Info icon
import Modal from "../../UI/Modal";
import GridControls from "../Sections/GridControls";

interface LibrarySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: number;
  pageSize: number;
  onColumnsChange: (columns: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onResetDefaults: () => void;
}

const LibrarySettingsModal = ({
  isOpen,
  onClose,
  columns,
  pageSize,
  onColumnsChange,
  onPageSizeChange,
  onResetDefaults,
}: LibrarySettingsModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Library settings">
    <div className="space-y-6">
      <div className="hidden sm:block">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Grid layout
        </h3>
        <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Choose how many columns are visible in your library.
        </p>
        <div className="mt-4">
          <GridControls
            columns={columns}
            onColumnsChange={onColumnsChange}
          />
        </div>
      </div>

      <div className="border-t border-zinc-200/80 pt-5 dark:border-zinc-800">
        <label className="flex items-center justify-between gap-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          <span>
            {'Items per page'}
            <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Controls how many songs are loaded for each page.
            </span>
          </span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            aria-label="Items per page"
            className="cursor-pointer rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm font-bold text-emerald-600 outline-none transition focus:border-emerald-400 dark:border-zinc-700 dark:text-emerald-400"
          >
            {[9, 12, 15, 18].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="pt-2">
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
      </div>
    </div>
  </Modal>
);

export default LibrarySettingsModal;

//  The default term is just a way to care about performance and optimization, but the user can change it in the settings.