import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
  menuClassName?: string;
}

const Select = ({
  value,
  options,
  onChange,
  ariaLabel,
  className = "",
  menuClassName = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  const closeAndRefocus = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || options.length === 0) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRefocus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) =>
          event.key === "ArrowDown" ? (index + 1) % options.length : (index - 1 + options.length) % options.length
        );
        return;
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          onChange(option.value);
          closeAndRefocus();
        }
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, isOpen, onChange, options]);

  if (!selectedOption) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!isOpen) {
            setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
          }
          setIsOpen((open) => !open);
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={ariaLabel}
        className={`flex items-center gap-1.5 rounded-lg text-xs font-bold text-emerald-700 outline-none transition-all duration-200 ease-out hover:bg-emerald-500/10 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500/25 sm:active:scale-100 sm:active:opacity-70 dark:text-emerald-300 dark:hover:bg-emerald-500/15 dark:focus-visible:ring-emerald-400/25 ${className}`}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-label={ariaLabel}
        aria-hidden={!isOpen}
        className={`absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-32 origin-top-right rounded-xl border border-zinc-200/90 bg-white/95 p-1.5 text-left shadow-xl shadow-zinc-950/10 backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none dark:border-zinc-700/90 dark:bg-zinc-900/95 dark:shadow-black/40 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        } ${menuClassName}`}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isActive = index === activeIndex;

          return (
            <button
              key={option.value}
              id={`${listboxId}-option-${index}`}
              type="button"
              role="option"
              aria-selected={isSelected}
              tabIndex={isOpen ? 0 : -1}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                onChange(option.value);
                closeAndRefocus();
              }}
              className={`flex w-full items-center rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-150 ease-out active:scale-[0.98] sm:active:scale-100 ${
                isSelected
                  ? "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              } ${isActive && !isSelected ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Select;