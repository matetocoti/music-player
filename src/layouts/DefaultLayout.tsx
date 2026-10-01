import { type FC, memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { RESET_DEFAULTS_EVENT } from "../utils/storage";

const DefaultLayout: FC = () => {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("music-player-theme") === "light";
  });

  useEffect(() => {
    localStorage.setItem("music-player-theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  useEffect(() => {
    const resetTheme = () => setIsLightMode(false);
    window.addEventListener(RESET_DEFAULTS_EVENT, resetTheme);
    return () => window.removeEventListener(RESET_DEFAULTS_EVENT, resetTheme);
  }, []);

  return (
    <div className={`app-shell flex min-h-screen w-full flex-col bg-gradient-to-b from-[#f6f1e8] via-[#ddd5ca] to-[#b9b0a6] text-zinc-900 transition-colors duration-300 dark:from-[#552b2b] dark:via-[#2b1a1b] dark:to-[#101112] dark:text-zinc-50 selection:bg-emerald-500 selection:text-white ${isLightMode ? "" : "dark"}`}>
      <Header title="My Music App">
        <button
          type="button"
          onClick={() => setIsLightMode((currentMode) => !currentMode)}
          aria-label={isLightMode ? "Enable dark mode" : "Enable light mode"}
          title={isLightMode ? "Enable dark mode" : "Enable light mode"}
          className="theme-toggle flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300/80 bg-stone-100/75 text-stone-600 shadow-[0_3px_10px_rgba(70,55,45,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a56345] hover:text-[#8e4f35] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c7835a]/20 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-300 dark:hover:border-[#d59672] dark:hover:text-[#e2a783]"
        >
          {isLightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </Header>

      <main
        id="main-content"
        className="app-content-surface mx-auto flex w-full max-w-[1600px] flex-1 flex-col p-4 sm:p-6 lg:p-8"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);