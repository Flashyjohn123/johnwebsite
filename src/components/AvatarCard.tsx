"use client";

import Image from "next/image";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/audio";

export function AvatarCard() {
  const handleVictiniClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playVictoryFanfare();

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#ffffff", "#e4e4e7", "#fbbf24", "#f59e0b", "#818cf8"],
      shapes: ["star", "circle"],
      disableForReducedMotion: true,
    });
  };

  const handlePichuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playDialTick(1.3);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Double-Bezel Hardware Frame */}
      <div className="relative rounded-[2.5rem] p-2 bg-gradient-to-b from-zinc-800/80 via-zinc-900/60 to-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-zinc-950 p-7 flex flex-col items-center relative overflow-hidden border border-zinc-900">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />

          {/* Clean Monogram Badge */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-3xl p-1 bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-800 shadow-[0_12px_30px_rgba(0,0,0,0.8)] flex items-center justify-center my-2 cursor-pointer select-none"
          >
            <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-zinc-900/90 to-zinc-950 flex flex-col items-center justify-center relative overflow-hidden border border-zinc-800/60">
              {/* Inner Hairline Ring */}
              <div className="absolute inset-2 rounded-[18px] border border-white/[0.04] pointer-events-none" />

              {/* Monogram Typography */}
              <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
                JH
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <div className="text-center mt-3 mb-4">
            <h3 className="text-lg font-bold tracking-tight text-zinc-100">John Huynh</h3>
          </div>

          {/* Interactive Pokémon Companions */}
          <div className="w-full pt-4 border-t border-zinc-900 flex items-center justify-around">
            <motion.button
              whileHover={{ scale: 1.14, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePichuClick}
              className="cursor-pointer p-2 rounded-2xl hover:bg-zinc-900/60 transition-colors"
              title="Ukulele Pichu"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/ukulele-pichu.png"
                  alt="Ukulele Pichu"
                  width={48}
                  height={48}
                  className="w-auto h-12 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  priority
                />
              </div>
            </motion.button>

            <div className="h-6 w-px bg-zinc-900" />

            <motion.button
              whileHover={{ scale: 1.14, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleVictiniClick}
              className="cursor-pointer p-2 rounded-2xl hover:bg-zinc-900/60 transition-colors"
              title="Victini"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/victini.png"
                  alt="Victini"
                  width={48}
                  height={48}
                  className="w-auto h-12 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  priority
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
