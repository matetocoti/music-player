import { type FC, memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";

const DefaultLayout: FC = () => {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("music-player-theme") === "light";
  });

  useEffect(() => {
    localStorage.setItem("music-player-theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return (
    <div className={`flex min-h-screen w-full flex-col bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 text-zinc-900 transition-colors duration-300 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-50 selection:bg-emerald-500 selection:text-white ${isLightMode ? "" : "dark"}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
      >
        Skip to main content
      </a>

      <Header title="My Music App">
        <button
          type="button"
          onClick={() => setIsLightMode((currentMode) => !currentMode)}
          aria-label={isLightMode ? "Enable dark mode" : "Enable light mode"}
          title={isLightMode ? "Enable dark mode" : "Enable light mode"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
        >
          {isLightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </Header>

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col p-4 sm:p-6 lg:p-8"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);