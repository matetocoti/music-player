import { type FC, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";

const DefaultLayout: FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-900 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-50 selection:bg-emerald-500 selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
      >
        Skip to main content
      </a>

      <Header title="My Music App" />

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-4 sm:p-6 lg:p-8"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);