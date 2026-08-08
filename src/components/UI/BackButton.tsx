import { ArrowBigLeft } from "lucide-react";
import { memo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  children?: ReactNode;
  fallbackTo?: string;
  className?: string;
  ariaLabel?: string;
}

const BackButton = ({
  children = "BACK",
  fallbackTo = "/",
  className = "",
  ariaLabel,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (window.history.length > 1) navigate(-1);
      else navigate(fallbackTo);
    } catch (error) {
      console.error("Erro ao navegar para a página anterior:", error);
      navigate(fallbackTo);
    }
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "BACK"}
      onClick={handleClick}
      className={
        "flex items-center gap-2 h-full text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400  rounded-lg hover:bg-slate-500 dark:hover:bg-zinc-300" +
        className
      }
    >
      <ArrowBigLeft className="h-7 w-7 cursor-pointer" aria-hidden="true"/>
      <span>{children}</span>
    </button>
  );
};

BackButton.displayName = "BackButton";

export default memo(BackButton);