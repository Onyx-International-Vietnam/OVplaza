"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import useBreakpoint from "@/hooks/useBreakpoint";
import useNoBodyScroll from "@/hooks/useNoBodyScroll";
import { TOKENS } from "@/tokens/tokens";
import { useTheme } from "@/contexts/ThemeContext";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  useNoBodyScroll(open);
  useBreakpoint();
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const modalBg = theme === "dark" 
    ? "rgba(16,13,36,.96)" 
    : "rgba(255,255,255,.98)";
  
  const overlayBg = theme === "dark"
    ? "bg-black/60"
    : "bg-slate-900/30";

  const textColor = theme === "dark" ? "text-white" : "text-slate-900";
  const titleColor = theme === "dark" ? "text-white/90" : "text-slate-900";
  const buttonBg = theme === "dark" 
    ? "rgba(255,255,255,.05)" 
    : "rgba(139,92,246,.08)";
  const buttonHover = theme === "dark"
    ? "hover:bg-white/10"
    : "hover:bg-violet-500/15";
  
  const borderColor = theme === "dark" 
    ? TOKENS.glassBorder 
    : "rgba(139,92,246,0.2)";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4">
      {/* overlay */}
      <div className={`absolute inset-0 ${overlayBg} backdrop-blur-sm transition-colors duration-300`} onClick={onClose} />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ov-modal-title"
        className={`relative w-full max-w-[640px] overflow-hidden rounded-[24px] border ${textColor} transition-colors duration-300`}
        style={{
          background: modalBg,
          borderColor: borderColor,
          boxShadow: theme === "dark"
            ? "0 30px 80px rgba(0,0,0,.6), 0 0 0 3px rgba(255,255,255,.06) inset"
            : "0 30px 80px rgba(139,92,246,.15), 0 0 0 2px rgba(139,92,246,.08) inset, 0 8px 32px rgba(0,0,0,.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 pt-4 pb-3">
          <div className="h-9" aria-hidden />
          <div
            id="ov-modal-title"
            className={`text-center text-lg sm:text-xl font-semibold tracking-wide ${titleColor}`}
          >
            {title}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              aria-label="Đóng"
              className={`h-9 w-9 rounded-full border p-2 ${buttonHover} transition-colors duration-200`}
              style={{
                borderColor: borderColor,
                background: buttonBg,
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* divider */}
        <div
          className="mx-4 mb-4 h-px"
          style={{ 
            background: theme === "dark"
              ? "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)"
              : "linear-gradient(90deg,transparent,rgba(139,92,246,.15),transparent)"
          }}
        />

        {/* body */}
        <div className="max-h-[min(90vh,100svh-160px)] overflow-auto px-5 pb-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
