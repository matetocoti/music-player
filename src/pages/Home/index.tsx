import { memo, useState } from "react";
import { Link } from "react-router-dom";

import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import useSongs from "../../hooks/useSongs";
import SearchBar from "../../components/pagination-components/SearchBar";
import PaginationBar from "../../components/pagination-components/PaginationBar";

import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { songs, total, pageSize, loading, error } = useSongs(search, page);

  const totalPages = Math.ceil(total / pageSize);

  if (loading) return <div>Loading songs...</div>;
  if (error) return <div>Error loading songs: {error}</div>;


  
  return (
    <main>
      {/* Search simples */}
      <SearchBar search={search} onSearchChange={(newSearch) => {
        setSearch(newSearch);
        setPage(1); 
      }} />

      <MyGridContainer>
        {songs.map((song) => (
          <Link key={song.id} to={`/player/${song.id}`}>
            <SongBox song={song} />
          </Link>
        ))}
      </MyGridContainer>

      {/* Paginação básica */}
      <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
    </main>
  );
};

export default memo(Home);
