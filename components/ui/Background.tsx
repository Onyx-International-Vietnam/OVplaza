"use client";

import { useTheme } from "@/contexts/ThemeContext";
import AnimatedBackground from "./AnimatedBackground";

export default function Background() {
  const { theme } = useTheme();

  const darkBg =
    "radial-gradient(1200px 600px at 50% 100%, rgba(93,79,255,.18), transparent 60%), radial-gradient(900px 500px at 0% 0%, rgba(255,95,246,.12), transparent 55%), radial-gradient(900px 500px at 100% 0%, rgba(93,255,201,.06), transparent 55%), #0b0a20";

  const lightBg =
    "radial-gradient(1200px 600px at 50% 100%, rgba(139,92,246,.12), transparent 65%), radial-gradient(900px 500px at 0% 0%, rgba(236,72,153,.08), transparent 60%), radial-gradient(900px 500px at 100% 0%, rgba(59,130,246,.06), transparent 60%), linear-gradient(180deg, #fdfbff 0%, #f8f7fc 100%)";

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-500"
        style={{
          background: theme === "dark" ? darkBg : lightBg,
        }}
      />
      <AnimatedBackground />
    </>
  );
}
