"use client";

import React from "react";
import { TOKENS } from "@/tokens/tokens";
import { useTheme } from "@/contexts/ThemeContext";

type GlowPillProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  align?: "left" | "right";
  compact?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function GlowPill({
  children,
  onClick,
  align = "left",
  compact = false,
  disabled = false,
  title,
  className = "",
  fullWidth = false,
  type = "button",
}: GlowPillProps) {
  const { theme } = useTheme();
  const dotLeft = align === "right";

  // 🔹 padding và text size responsive
  const basePadding = compact
    ? "px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5"
    : "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3";

  const baseText = compact
    ? "text-[8px] sm:text-[12px] md:text-base"
    : "text-[12px] sm:text-[14px] md:text-[16px]";

  const bgGradient = theme === "dark"
    ? "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.22) 100%)"
    : "linear-gradient(180deg, rgba(255,255,255,.95) 0%, rgba(248,247,252,.9) 100%)";

  const borderColor = theme === "dark" ? TOKENS.pillBorder : "rgba(139,92,246,0.25)";
  const textColor = theme === "dark" ? "text-white/90" : "text-slate-900";
  
  const boxShadow = theme === "dark"
    ? (compact ? TOKENS.labelGlowMobile : TOKENS.labelGlowDesk)
    : "0 2px 8px rgba(139,92,246,0.15), 0 1px 3px rgba(0,0,0,0.1)";

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative inline-flex items-center",
        fullWidth ? "w-full justify-between" : "justify-center",
        "gap-2 sm:gap-3 rounded-[18px] sm:rounded-[22px]",
        basePadding,
        baseText,
        "leading-none",
        "min-h-[36px] sm:min-h-[42px] md:min-h-[44px]",
        textColor,
        "whitespace-nowrap",
        fullWidth ? "truncate" : "max-w-full truncate",
        "backdrop-blur",
        "transition-[transform,box-shadow,background-color] duration-200",
        "motion-safe:hover:scale-[1.015]",
        "active:scale-[0.985]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
      style={{
        background: bgGradient,
        border: `1.5px solid ${borderColor}`,
        boxShadow: boxShadow,
        WebkitTapHighlightColor: "transparent",
      }}
      aria-disabled={disabled || undefined}
    >
      {dotLeft && (
        <span
          aria-hidden
          className="shrink-0 rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
          style={{
            background: theme === "dark" ? TOKENS.pink : "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
            boxShadow: theme === "dark" 
              ? "0 0 10px 1.5px " + TOKENS.pinkSoft
              : "0 0 8px 1px rgba(236,72,153,0.4)",
          }}
        />
      )}

      <span className="tracking-wide truncate font-medium">{children}</span>

      {!dotLeft && (
        <span
          aria-hidden
          className="shrink-0 rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
          style={{
            background: theme === "dark" ? TOKENS.pink : "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
            boxShadow: theme === "dark" 
              ? "0 0 10px 1.5px " + TOKENS.pinkSoft
              : "0 0 8px 1px rgba(236,72,153,0.4)",
          }}
        />
      )}
    </button>
  );
}
