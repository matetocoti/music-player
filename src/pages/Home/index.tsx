import { memo } from "react";
import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import songsDB from "../../data/songs.mock";

const Home = () => {
  return (
    <main>
      <MyGridContainer>
        {songsDB.map((song) => (
          <SongBox key={song.id} song={song} />
        ))}
      </MyGridContainer>
    </main>
  );
};

export default memo(Home);
