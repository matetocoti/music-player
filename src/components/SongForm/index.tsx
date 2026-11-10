import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../UI/Button";
import { FileUp, Loader2, Plus, Save, UploadCloud } from "lucide-react";
import { listCategories } from "../../api/songs";
import Details from "../UI/Details";

interface SongFormValues {
  title?: string;
  artist?: string;
  album?: string;
  duration?: string | number;
  category?: string;
}

interface SongFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  initialValues?: SongFormValues;
  submitLabel?: string;
  isCsvImport?: boolean;
}


const SongForm = forwardRef<HTMLFormElement, SongFormProps>(({ onSubmit, loading = false, initialValues, submitLabel = "Save Song", isCsvImport = false }, ref) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState(initialValues?.category ?? "");
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const csvFileInputRef = useRef<HTMLInputElement>(null);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);

    useEffect(() => {
      const controller = new AbortController();

      listCategories(controller.signal)
        .then(setCategories)
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          setCategoriesError("Unable to load existing categories.");
        })
        .finally(() => {
          if (!controller.signal.aborted) setCategoriesLoading(false);
        });

      return () => controller.abort();
    }, []);

    const categoryOptions = useMemo(() => {
      const availableCategories = new Set(categories);
      if (category && !availableCategories.has(category)) {
        return [category, ...categories];
      }
      return categories;
    }, [categories, category]);

    const toggleCategoryMode = () => {
      setIsCustomCategory((custom) => !custom);
    };

    const selectCsvFile = (file: File | undefined) => {
      if (!file) return;
      setSelectedFile(file);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (csvFileInputRef.current) {
        csvFileInputRef.current.files = dataTransfer.files;
      }
    };

    return (
      <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-5">
        {isCsvImport ? (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => csvFileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDraggingFile(false);
                selectCsvFile(event.dataTransfer.files[0]);
              }}
              className={[
                "flex min-h-52 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
                isDraggingFile
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-300 bg-zinc-50/50 hover:border-emerald-500/60 hover:bg-emerald-500/5 dark:border-zinc-700 dark:bg-zinc-950/50",
              ].join(" ")}
            >
              <UploadCloud className="mb-3 h-10 w-10 text-emerald-500" aria-hidden="true" />
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Drag and drop your file here
              </p>
              <p className="my-1 text-xs text-zinc-500 dark:text-zinc-400">or click to browse</p>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">UTF-8 .CSV or .TXT files</span>
            </button>
            <input
              type="file"
              id="csvFile"
              name="csvFile"
              accept=".txt,.csv,text/plain,text/csv"
              required
              disabled={loading}
              ref={csvFileInputRef}
              onChange={(event) => selectCsvFile(event.target.files?.[0])}
              className="sr-only"
            />
            {selectedFile && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-xs text-emerald-700 dark:text-emerald-300">
                <FileUp className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{selectedFile.name}</span>
              </p>
            )}
            <Details
              summary="How to use the import file"
              className="rounded-xl border-zinc-200/80 bg-zinc-50/40 ring-0 dark:border-zinc-800/80 dark:bg-zinc-950/30"
              summaryClassName="rounded-xl px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300"
              contentClassName="px-3 pb-3 pt-2 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <ol className="list-inside list-decimal space-y-1.5">
                <li>Use one song per line, without a header.</li>
                <li>Separate fields with commas in this order:</li>
              </ol>
              <code className="mt-2 block overflow-x-auto rounded-lg bg-zinc-900 px-3 py-2 font-mono text-[11px] text-emerald-300">
                title,artist,album,duration,category,favorite
              </code>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li><strong>title</strong> and <strong>artist</strong> are required.</li>
                <li>Album, duration, category, and favorite are optional.</li>
                <li>Save the file as UTF-8. Values containing commas must be quoted.</li>
              </ul>
              <p className="mt-2">Example:</p>
              <code className="mt-1 block overflow-x-auto rounded-lg bg-zinc-900 px-3 py-2 font-mono text-[11px] text-zinc-300">
                Imagine,John Lennon,"Imagine, Remastered",3,Rock,false
              </code>
            </Details>
          </div>
        ) : (
          <>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Title <span className="text-emerald-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialValues?.title}
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
            defaultValue={initialValues?.artist}
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
            defaultValue={initialValues?.album}
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
            defaultValue={initialValues?.duration}
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="category" className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <span>Category</span>
              <span className="ml-2 tracking-normal text-zinc-400 dark:text-zinc-500">Optional</span>
            </label>
            <button
              type="button"
              onClick={toggleCategoryMode}
              disabled={loading}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600 transition hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              {isCustomCategory ? "Use existing" : "New category"}
            </button>
          </div>

          {isCustomCategory ? (
            <input
              type="search"
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={loading}
              maxLength={100}
              aria-label="New song category"
              placeholder="e.g. Rock"
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
            />
          ) : (
            <select
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={loading || categoriesLoading}
              aria-label="Song category"
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm text-zinc-900 transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-emerald-500/50 dark:focus:bg-zinc-900 dark:focus:ring-emerald-500/10"
            >
              <option value="">{categoriesLoading ? "Loading categories..." : "No category"}</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          {categoriesError && (
            <p className="text-xs text-red-500" role="alert">{categoriesError} You can still add a new category.</p>
          )}
        </div>
          </>
        )}

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
              <span>{isCsvImport ? "Import songs" : submitLabel}</span>
            </div>
          )}
        </Button>
      </form>
    );
  },
);

SongForm.displayName = "SongForm";
export default SongForm;