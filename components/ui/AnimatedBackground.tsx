"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top?: number;
  duration: number;
  delay: number;
  size: number;
}

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const [balloons, setBalloons] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Particle[]>([]);

  useEffect(() => {
    // Khinh khí cầu (10 cái) - xuất hiện ngay trên màn hình
    const newBalloons = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 20 + Math.random() * 60, // Thêm vị trí top từ 20% đến 80% màn hình
      duration: 20 + Math.random() * 10,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 30,
    }));
    setBalloons(newBalloons);

    // Ngôi sao (30 cái) - chớp nhoáng chậm hơn
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      duration: 3 + Math.random() * 4, // Tăng từ 2-5s lên 3-7s
      delay: Math.random() * 5,
      size: 15 + Math.random() * 25,
    }));
    setStars(newStars);
  }, [theme]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {theme === "light" ? (
        // Khinh khí cầu
        <>
          {balloons.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-float-up-slow"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`, // Đổi từ bottom sang top
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                width: `${particle.size}px`,
                height: `${particle.size * 1.3}px`,
              }}
            >
              <div className="relative w-full h-full">
                {/* Bóng khí */}
                <div
                  className="absolute top-0 left-0 w-full h-[70%] rounded-full"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(139,92,246,0.6), 
                      rgba(236,72,153,0.5), 
                      rgba(59,130,246,0.4))`,
                  }}
                />
                {/* Giỏ */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[15%] rounded-sm"
                  style={{
                    background: "rgba(139,92,246,0.7)",
                  }}
                />
                {/* Dây */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400/40"
                  style={{
                    top: "65%",
                    height: "20%",
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        // Ngôi sao
        <>
          {stars.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-twinkle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              <svg
                width={particle.size}
                height={particle.size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                  fill="rgba(255,255,255,0.8)"
                />
              </svg>
            </div>
          ))}
        </>
      )}

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes float-up-slow {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float-up {
          animation: float-up linear infinite;
        }

        .animate-float-up-slow {
          animation: float-up-slow linear infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
