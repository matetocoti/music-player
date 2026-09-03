import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSongActions } from "../../hooks/useSongActions";

import BackButton from "../../components/UI/BackButton";
import { CheckCircle2, AlertCircle,Save } from "lucide-react";
import SongForm from "../../components/SongForm";

const SaveSongPage = () => {
  const { loading, error, success, data, create } = useSongActions();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const albumValue = formData.get("album") as string;
    const durationValue = formData.get("duration") as string;
    const duration = durationValue ? +durationValue : undefined;

    
    if (duration !== undefined && (duration < 0 || duration > 1440)) {
      toast.error("Invalid duration", {
        description: "Duration must be between 0 and 1440 minutes.",
      });
      return;
    }

    const songData = {
      title: formData.get("title") as string,
      artist: formData.get("artist") as string,
      album: albumValue?.trim() ? albumValue : undefined,
      duration,
    };

    const createdSong = await create(songData);

    if (createdSong) {
      formRef.current?.reset();
      toast.success(`"${createdSong.title}" added successfully`, {
        description: 'You can keep browsing your music library.',
      });
      
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    }
  };

  return (
    <main className="flex h-full flex-1 min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-zinc-50/50 p-4 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/40 sm:p-6 lg:p-8">
      
      
      <header className="mb-2 flex w-full shrink-0">
        <BackButton className="px-2 py-2 text-sm font-semibold tracking-wider text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 uppercase" />
      </header>

      
      <div className="flex flex-1 items-center justify-center overflow-y-auto pb-8">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900/60 sm:p-8">
          
          <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
              <Save className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Save Song</h1>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Add a new track to your library</p>
            </div>
          </div>
          
          
          {success && data && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Song saved successfully: <span className="font-semibold text-emerald-800 dark:text-white">{data.title}</span></p>
            </div>
          )}

          {success && !data && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="font-medium">Song saved successfully!</p>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-50/50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <SongForm onSubmit={handleSubmit} loading={loading} />
          <footer className="mt-6 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
            <div className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
              <span>Local library</span>
            </div>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Metadata is saved locally. No audio files are stored in the app.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default SaveSongPage;