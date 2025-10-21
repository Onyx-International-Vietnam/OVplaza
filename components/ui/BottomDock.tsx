"use client";

import { Globe, Gavel } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function BottomDock() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      {/* Nền trắng SVG (luôn ở dưới) */}
      <img
        src="/images/bg.svg"
        alt=""
        className="absolute inset-x-0 bottom-0 w-full z-0 transition-opacity duration-500"
        aria-hidden
        style={{ objectFit: "fill", opacity: 0.95 }}
      />

      {/* Links trên nền (đặt nổi lên) */}
      <div className="pointer-events-auto relative z-10">
        {/* LEFT LINK */}
        <div
          className="
            absolute
            bottom-[max(44px,calc(44px+env(safe-area-inset-bottom)))]
            left-[7%] sm:left-[10%]
            text-center
            px-2
            md:bottom-0
            md:pb-[10px]
            lg:pb-[30px]
          "
        >
          <div className="mb-2 grid place-items-center">
            <Globe 
              className="h-5 w-5 transition-colors duration-300" 
              style={{ color: "#0f172a" }}
            />
          </div>
          <a
            href="#"
            className="
              inline-block
              text-[clamp(12px,3.4vw,14px)] leading-none py-1 font-medium
              underline underline-offset-4
              transition-all duration-300 hover:scale-105
            "
            style={{
              color: "#0f172a",
              textDecorationColor: "rgba(15,23,42,0.5)",
            }}
          >
            OUR SERVICES
          </a>
        </div>

        {/* RIGHT LINK */}
        <div
          className="
            absolute
            bottom-[max(44px,calc(44px+env(safe-area-inset-bottom)))]
            right-[7%] sm:right-[10%]
            text-center
            px-2
            md:bottom-0
            md:pb-[10px]
            lg:pb-[30px]
          "
        >
          <div className="mb-2 grid place-items-center">
            <Gavel 
              className="h-5 w-5 transition-colors duration-300" 
              style={{ color: "#0f172a" }}
            />
          </div>
          <a
            href="#"
            className="
              inline-block
              text-[clamp(12px,3.4vw,14px)] leading-none py-1 font-medium
              underline underline-offset-4
              transition-all duration-300 hover:scale-105
            "
            style={{
              color: "#0f172a",
              textDecorationColor: "rgba(15,23,42,0.5)",
            }}
          >
            FOR RENT
          </a>
        </div>
      </div>
    </div>
  );
}
