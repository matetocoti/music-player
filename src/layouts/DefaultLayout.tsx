import { type FC, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout: FC = () => {
  return (
    <div 
      className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-50"
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-4 focus:ring-blue-600/20"
      >
        Skip to main content
      </a>

      <Header title="My Music App" />

      <main 
        id="main-content"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);