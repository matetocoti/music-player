import { memo, useState } from "react";
import { Link } from "react-router-dom";

import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import useSongs from "../../hooks/useSongs";
import SearchBar from "../../components/pagination-components/SearchBar";
import PaginationBar from "../../components/pagination-components/PaginationBar";


const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { songs, total, pageSize, loading, error } = useSongs(search, page);
  const totalPages = Math.ceil(total / pageSize);
  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden gap-6 sm:gap-8 lg:gap-10 pb-48";

  if (loading) {
    return (
      <section className={containerStyle}>
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-zinc-200/70 bg-white/70 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <p className="text-sm font-medium animate-pulse text-zinc-500 dark:text-zinc-400">
            Loading songs...
          </p>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className={containerStyle}>
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30">
          <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
            Error loading songs: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`home-page ${containerStyle}`}>
      <div className="flex flex-col gap-1 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900/60">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
            Discover
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Find your next favorite song
          </h2>
        </div>
        <SearchBar
          search={search}
          onSearchChange={(newSearch) => {
            setSearch(newSearch);
            setPage(1);
          }}
        />
      </div>
      <MyGridContainer className="flex-0 overflow-y-auto pr-5 gap-1 sm:gap-1 lg:gap-1">
        {songs.map((song) => (
          <Link 
            key={song.id} 
            to={`/player/${song.id}`} 
            className="block max-h-fit ml-5 mr-5 mt-4 outline-none rounded-3xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-zinc-900"
          >
            <SongBox song={song} />
          </Link>
        ))}
      </MyGridContainer>
      <div className="fixed left-0 right-0 bottom-20 sm:bottom-20 z-50 flex justify-center pointer-events-none px-5">
        <div className="pointer-events-auto max-w-sm w-full mx-auto bg-white/50  from-emerald-500 to-teal-500 animate-fade-in backdrop-blur-md rounded-2xl px-3 py-3 shadow-2xl border border-zinc-200/60 dark:border-zinc-800 transform -translate-y-2 transition-transform">
          <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </section>
  );
};

export default memo(Home);