import { memo } from "react";
import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import { Link } from "react-router-dom";
import { useSongs } from "../../hooks/useSongs";

const Home = () => {
  const { songs, loading, error } = useSongs();

  if (loading) {
    return <div>Loading songs...</div>;
  }
  if (error) {
    return <div>Error loading songs: {error}</div>;
  }
  return (
    <main>
      <MyGridContainer>
        {songs.map((song) => (
          <Link key={song.id} to={`/player/${song.id}`}>
            <SongBox song={song} />
          </Link>
        ))}
      </MyGridContainer>
    </main>
  );
};

export default memo(Home);
