import { type FC, memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import ThemeToggle from "../components/UI/ThemeToggle";
import { RESET_DEFAULTS_EVENT } from "../utils/storage";

const THEME_KEY = "music-player-theme";

const readIsLightMode = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "light";
  } catch {
    return false;
  }
};

const saveIsLightMode = (isLightMode: boolean) => {
  try {
    localStorage.setItem(THEME_KEY, isLightMode ? "light" : "dark");
  } catch {
    throw new Error("Not able to save theme preference to localStorage.");
  }
};

const DefaultLayout: FC = () => {
  const [isLightMode, setIsLightMode] = useState(readIsLightMode);

  useEffect(() => {
    saveIsLightMode(isLightMode);
  }, [isLightMode]);

  useEffect(() => {
    const resetTheme = () => setIsLightMode(false);
    window.addEventListener(RESET_DEFAULTS_EVENT, resetTheme);
    return () => window.removeEventListener(RESET_DEFAULTS_EVENT, resetTheme);
  }, []);

  return (
    <div className={`app-shell flex min-h-screen w-full flex-col bg-gradient-to-b from-[#f6f1e8] via-[#ddd5ca] to-[#b9b0a6] text-zinc-900 transition-colors duration-300 dark:from-[#552b2b] dark:via-[#2b1a1b] dark:to-[#101112] dark:text-zinc-50 selection:bg-emerald-500 selection:text-white ${isLightMode ? "" : "dark"}`}>
      <Header title="My Music App">
        <ThemeToggle isLightMode={isLightMode} onToggle={() => setIsLightMode((currentMode) => !currentMode)} />
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