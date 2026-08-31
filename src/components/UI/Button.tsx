import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "ghost";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly children?: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly navigateTo?: string;
  readonly fallbackTo?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 active:from-emerald-600 active:to-emerald-700",

  destructive:
    "bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-700",

  outline:
    "border border-white/10 bg-zinc-900/80 text-zinc-100 shadow-sm hover:border-emerald-400/50 hover:bg-zinc-800 active:bg-zinc-900",

  ghost:
    "bg-transparent text-zinc-200 hover:bg-white/5 active:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default:
    "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base",

  sm:
    "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm",

  lg:
    "h-12 px-6 text-base sm:h-14 sm:px-7 sm:text-lg",

  icon:
    "h-10 w-10 p-0 sm:h-11 sm:w-11",
};

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  onClick,
  navigateTo,
  fallbackTo = "/",
  ...props
}: Readonly<ButtonProps>) {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (navigateTo) {
      navigate(navigateTo);
      return;
    }

    if (fallbackTo && fallbackTo !== "/" && !props.disabled) {
      navigate(fallbackTo);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold",
        "whitespace-nowrap",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 focus:ring-offset-zinc-950",
        "disabled:pointer-events-none disabled:opacity-50",
        "disabled:shadow-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}