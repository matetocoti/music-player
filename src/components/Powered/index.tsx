import { memo, type FC } from "react";
import { Cable } from "lucide-react";

interface PoweredProps {
  provider: string;
  url?: string;
}

const Powered: FC<PoweredProps> = ({ provider, url }) => {
  const providerStyle = "font-medium text-zinc-700 transition-colors duration-200 dark:text-zinc-200";
  const hoverStyle = "hover:text-blue-600 dark:hover:text-white hover:underline hover:underline-offset-2";
  return (
    <div 
      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-200/60 px-3 py-2 text-xs text-zinc-500 backdrop-blur-sm transition-all sm:w-auto sm:justify-start sm:text-sm dark:bg-zinc-800/80 dark:text-zinc-400"
    >
      <Cable className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
      <span>
        Powered by{" "}
        {url ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${providerStyle} ${hoverStyle}`}
          >
            {provider}
          </a>
        ) : (
          <span className={providerStyle}>
            {provider}
          </span>
        )}
      </span>
    </div>
  );
};

export default memo(Powered);