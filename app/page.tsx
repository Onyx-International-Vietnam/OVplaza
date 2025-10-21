"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";

import Background from "@/components/ui/Background";
import BottomDock from "@/components/ui/BottomDock";
import GlowPill from "@/components/ui/GlowPill";
import Modal from "@/components/ui/Modal";
import ThemeToggle from "@/components/ui/ThemeToggle";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useTheme } from "@/contexts/ThemeContext";
import { TOKENS } from "@/tokens/tokens";
import { FLOORS } from "@/data/plaza";
import type { Floor, OV } from "@/types/plaza";

export default function Page() {
  const [openFloor, setOpenFloor] = useState<Floor | null>(null);
  const [selectedOV, setSelectedOV] = useState<OV | null>(null);
  const bp = useBreakpoint();
  const { theme } = useTheme();

  useEffect(() => {
    if (!openFloor) setSelectedOV(null);
  }, [openFloor]);

  const bgColor = theme === "dark" ? TOKENS.bg : "#fdfbff";
  const textColor = theme === "dark" ? "white" : "#1e293b";
  const titleGradient = theme === "dark"
    ? "text-violet-300 drop-shadow-[0_0_6px_rgba(169,134,255,0.5)]"
    : "text-violet-600 drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]";
  
  const labelTextColor = theme === "dark" ? "text-white/70" : "text-slate-600";

  return (
    <main
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: bgColor, color: textColor }}
    >
      <Background />
      <ThemeToggle />

      {/* Header */}
      <div className="absolute left-1/2 top-3 sm:top-6 -translate-x-1/2 select-none text-center px-4">
        <h1
          className="
      font-extrabold tracking-wide leading-tight
      text-[clamp(20px,6vw,44px)] lg:text-5xl
    "
          style={{ color: textColor }}
        >
          WELCOME TO{" "}
          <span className={titleGradient}>
            OVPLAZA
          </span>
        </h1>
      </div>

      {/* QR khung bo tròn – ẩn trên mobile */}
      <div className="absolute left-20 top-0 hidden md:block">
        <div
          className="
          relative
          w-[98px] h-[117px]   
          rounded-b-full overflow-hidden
          shadow-lg
          flex flex-col items-center pt-3 pb-9
    "
          style={{
            background: theme === "dark" ? "white" : "linear-gradient(180deg, #ffffff 0%, #f8f7fc 100%)",
            boxShadow: theme === "dark" 
              ? "0 10px 40px rgba(0,0,0,0.3)"
              : "0 10px 40px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.1) inset",
          }}
        >
          {/* LOGO */}
          <img
            src="/images/logo-onyx.png"
            alt="ONYX"
            className="h-8 object-contain"
          />

          {/* QR CODE */}
          <img
            src="/images/qr-app-ovplaza.png"
            alt="QR code"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Pads & links đáy */}
      <BottomDock />

      {/* Building PNG */}
      <div className="absolute inset-x-0 bottom-[120px] top-20 sm:top-24 grid place-items-center">
        <img
          src="/images/building.png"
          alt="Building"
          className="h-[500px] md:h-[550px] transition-all duration-500"
          style={{
            filter: theme === "light" 
              ? "brightness(1.05) contrast(1.05) drop-shadow(0 25px 50px rgba(139,92,246,.2))" 
              : "drop-shadow(0 30px 60px rgba(0,0,0,.45))"
          }}
        />
      </div>

      {/* Floor bars + labels */}
      {FLOORS.map((f) => {
        const b = f.bar[bp];
        const l = f.bubble[bp];
        const align = f.bubble.align[bp];
        const compact = bp !== "d";

        return (
          <div key={f.id}>
            {/* thanh hồng ngắn – cạnh phải toà nhà */}
            <div
              className="absolute -translate-x-1/2 w-[4px] sm:w-[5px] rounded-full transition-colors duration-300"
              style={{
                left: b.left,
                top: b.top,
                height: b.height,
                background: theme === "dark" 
                  ? "#F668B8" 
                  : "linear-gradient(180deg, #ec4899 0%, #8b5cf6 100%)",
                boxShadow: theme === "dark"
                  ? "0 0 10px rgba(246,104,184,0.5)"
                  : "0 0 8px rgba(236,72,153,0.4)",
              }}
            />
            {/* label */}
            <div
              className="absolute z-20 pointer-events-auto px-1"
              style={{ left: l.left, top: l.top }}
            >
              <div
                className={[
                  "mb-1 font-medium leading-none tracking-wide",
                  "text-[10px] sm:text-[12px] lg:text-[13px]",
                  align === "right" ? "text-right pr-2" : "text-left pl-2",
                ].join(" ")}
                style={{ color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(71,85,105,0.8)" }}
              >
                {f.title}
              </div>

              <div className="inline-block -m-1 p-1 sm:m-0 sm:p-0">
                <GlowPill align={align} onClick={() => setOpenFloor(f)} compact={compact}>
                  {f.label}
                </GlowPill>
              </div>
            </div>

          </div>
        );
      })}

      {/* Modal chọn OV / chi tiết OV */}
      <Modal
        open={!!openFloor}
        onClose={() => setOpenFloor(null)}
        title={openFloor ? openFloor.title : ""}
      >
        {!openFloor ? null : selectedOV ? (
          <div className="space-y-5">
            <button
              onClick={() => setSelectedOV(null)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200"
              style={{ 
                borderColor: theme === "dark" ? TOKENS.glassBorder : "rgba(139,92,246,0.3)", 
                background: theme === "dark" ? TOKENS.glass : "rgba(139,92,246,0.05)",
                color: theme === "dark" ? "white" : "#1e293b",
              }}
            >
              <ChevronRight className="-scale-x-100 h-4 w-4" />
              Quay lại danh sách
            </button>
            <div
              className="rounded-2xl border p-4 sm:p-5"
              style={{ 
                background: theme === "dark" ? TOKENS.glass : "rgba(248,247,252,0.8)", 
                borderColor: theme === "dark" ? TOKENS.glassBorder : "rgba(139,92,246,0.2)" 
              }}
            >
              <div className="mb-1 text-xl sm:text-2xl font-semibold">
                {selectedOV.name}
              </div>
              <div className="mb-3" style={{ color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(71,85,105,0.8)" }}>
                {selectedOV.tagline}
              </div>
              <p className="leading-relaxed" style={{ color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(51,65,85,0.9)" }}>
                {selectedOV.description}
              </p>
              <div className="mt-5">
                <a
                  href={selectedOV.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-all hover:scale-105"
                  style={{
                    background: theme === "dark" 
                      ? "white" 
                      : "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    color: theme === "dark" ? "#0f0c23" : "white",
                  }}
                >
                  Xem thêm <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {openFloor.ovs.map((ov) => (
              <button
                key={ov.id}
                onClick={() => setSelectedOV(ov)}
                className="w-full rounded-2xl px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: theme === "dark"
                    ? "white"
                    : "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  color: theme === "dark" ? "#0f0c23" : "white",
                }}
              >
                {ov.name}
              </button>
            ))}
          </div>
        )}
      </Modal>
    </main>
  );
}
