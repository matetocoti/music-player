
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  ariaLabel = "Dialog",
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      open
      aria-modal="true"
      aria-label={title ? undefined : ariaLabel}
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-[100] m-0 flex h-full w-full max-w-none items-center justify-center border-0 bg-zinc-950/60 p-5 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          {title ? (
            <h2 id="modal-title" className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
  