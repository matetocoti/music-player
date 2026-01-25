import {type ReactNode ,memo} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
        <p>Welcome to the Home Page!</p>
      </main>
      <Footer textContent={footerText} />
    </div>
  );
};

export default memo(Home);