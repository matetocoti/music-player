import { forwardRef } from "react";
import { Button } from "../UI/Button";
import { Loader2, Save } from "lucide-react";

interface SongFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}


const SongForm = forwardRef<HTMLFormElement, SongFormProps> (({ onSubmit, loading = false }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Title <span className="text-emerald-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            disabled={loading}
            minLength={1}
            maxLength={255}
            aria-required="true"
            aria-label="Song title"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
            placeholder="e.g. Song title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="artist" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Artist <span className="text-emerald-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            required
            disabled={loading}
            minLength={1}
            maxLength={255}
            aria-required="true"
            aria-label="Artist name"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
            placeholder="e.g. Artist name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="album" className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            <span>Album</span>
            <span className="tracking-normal text-zinc-400 dark:text-zinc-500">Optional</span>
          </label>
          <input
            type="text"
            id="album"
            name="album"
            disabled={loading}
            maxLength={255}
            aria-label="Album name"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
            placeholder="e.g. Album name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="duration" className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            <span>Duration (minutes)</span>
            <span className="tracking-normal text-zinc-400 dark:text-zinc-500">Optional</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            step="0.01"
            min="0"
            max="1440"
            placeholder="e.g. 3.45 (0-1440 min)"
            disabled={loading}
            aria-label="Song duration in minutes"
            aria-describedby="duration-hint"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
          />
          <p id="duration-hint" className="text-xs text-zinc-400 dark:text-zinc-500">Maximum 1440 minutes (24 hours)</p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-12 w-full rounded-xl bg-emerald-500 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Save className="h-5 w-5" />
              <span>Save Song</span>
            </div>
          )}
        </Button>
      </form>
    );
  }
);

SongForm.displayName = "SongForm";
export default SongForm;