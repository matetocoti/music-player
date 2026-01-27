import { memo } from "react";
import { useParams } from "react-router-dom";
import songsDB from "../../data/songs.mock";
import SongPlayer from "../../components/SongPlayer";

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>();

  const song = songsDB.find(s => s.id === id);

  if (!song) {
    return <p>Song not found</p>;
  }

  return (
    <main>
      <SongPlayer song={song} />
    </main>
  );
};

export default memo(PlayerPage);
