import { type FC, type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop with smooth fade */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container with smooth scale animation */}
      <div
        className={`relative w-full ${sizeClasses[size]} transform transition-all duration-300 ease-out scale-100 opacity-100`}
      >
        <div className="relative flex flex-col w-full bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
          {/* Enhanced Header with gradient */}
          <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                {title}
              </h3>
            </div>
            <button
              className="group p-2 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Enhanced Body with better spacing and scrolling */}
          <div className="relative flex-1 px-6 py-6 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-4">{children}</div>
          </div>

          {/* Subtle bottom border for visual completion */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
