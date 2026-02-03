import { memo } from "react";
import "./Powered.css";

interface PoweredProps {
  provider: string;
  url?: string;
}

const Powered = ({ provider, url }: PoweredProps) => {
  return (
    <div className="powered">
      Powered by{" "}
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {provider}
        </a>
      ) : (
        <span>{provider}</span>
      )}
    </div>
  );
};

export default memo(Powered);
