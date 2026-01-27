import { memo } from "react";
import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import songsDB from "../../data/songs.mock";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <MyGridContainer>
        {songsDB.map((song) => (
          <Link key={song.id} to={`/player/${song.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <SongBox key={song.id} song={song} />
          </Link>
        ))}
      </MyGridContainer>
    </main>
  );
};

export default memo(Home);
