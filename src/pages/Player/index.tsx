import { memo } from "react";
import { useParams } from "react-router-dom";
import useSong from "../../hooks/useSong";
import SongPlayer from "../../components/SongPlayer";

const PlayerPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(`${id}`);

  if (loading) {
    return <div>Loading song...</div>;
  }

  if (error) {
    return <div>Error loading song: {error}</div>;
  }

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <main>
      <SongPlayer song={song} />
    </main>
  );
};

export default memo(PlayerPage);
