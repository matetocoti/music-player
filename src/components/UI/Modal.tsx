import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
}

const CLOSE_BUTTON =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#947050] bg-[#e6d5bd] text-[#543724] transition hover:bg-[#d6bea0] hover:text-[#2f1e14] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795338] dark:border-[#89634b] dark:bg-[#3b2b24] dark:text-[#e4c9b0] dark:hover:bg-[#49342b] dark:hover:text-[#f1e5d8] dark:focus-visible:ring-[#d59672]";

const Modal = ({ children, isOpen, onClose, title, ariaLabel = "Dialog" }: ModalProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      open
      aria-label={title ? undefined : ariaLabel}
      aria-labelledby={title ? titleId : undefined}
      className="modal-backdrop-enter fixed inset-0 z-[100] m-0 flex h-full w-full max-w-none items-center justify-center border-0 bg-[#241812]/70 p-4 dark:bg-[#160e0a]/80"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <div className="notebook-cover modal-panel-enter relative z-10 w-full max-w-md rounded-md p-2">
        <div
          ref={panelRef}
          tabIndex={-1}
          className="modal-paper max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm border p-6 outline-none sm:p-7"
        >
          <div className="modal-paper-header modal-paper-content mb-5 flex items-start justify-between gap-4 border-b pb-4">
            {title ? (
              <h2 id={titleId} className="font-serif text-lg font-bold tracking-tight">
                {title}
              </h2>
            ) : (
              <span />
            )}
            <button type="button" onClick={onClose} aria-label="Close dialog" className={CLOSE_BUTTON}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="modal-paper-content">{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;