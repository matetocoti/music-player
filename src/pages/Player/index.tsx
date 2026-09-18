import { memo } from "react";
import { useParams } from "react-router-dom";

import Player from "../../components/Player";
import useSong from "../../hooks/useSong";

const PlayerPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(id ?? "");

  return <Player song={song} loading={loading} error={error} />;
};

export default memo(PlayerPage);