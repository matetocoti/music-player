import {type ReactNode ,memo} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";

import songsDB from "../../data/songs.mock";

interface HomeProps {
  headerTitle?: string;
  footerText?: ReactNode;
  className?: string;
}

const Home = ({ headerTitle, footerText, className }: HomeProps) => {
  return (
    <div className={className}>
      <Header title={headerTitle} />
      <main>
        <MyGridContainer>
          {songsDB.map((song) => (
            <SongBox key={song.id} song={song} />
          ))}
        </MyGridContainer>
      </main>
      <Footer textContent={footerText} />
    </div>
  );
};

export default memo(Home);