"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sounds } from "../utils/audio";
import { Play } from "@phosphor-icons/react";

interface TargetItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function IsoReflexGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [shieldHp, setShieldHp] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTargets((prev) => {
        if (prev.length >= 4) {
          setShieldHp((hp) => {
            const nextHp = hp - 14;
            if (nextHp <= 0) {
              setIsPlaying(false);
              return 0;
            }
            return nextHp;
          });
          return prev.slice(1);
        }

        const newTarget: TargetItem = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 70) + 15,
          size: Math.floor(Math.random() * 10) + 36,
        };
        return [...prev, newTarget];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStart = () => {
    sounds.playClick();
    setScore(0);
    setStreak(0);
    setShieldHp(100);
    setTargets([]);
    setIsPlaying(true);
  };

  const handleStop = () => {
    sounds.playClick();
    setIsPlaying(false);
  };

  const hitTarget = (id: number) => {
    sounds.playDialTick(1.2 + Math.min(streak * 0.05, 0.8));
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => {
      const nextScore = s + 100 + streak * 25;
      if (nextScore > highScore) setHighScore(nextScore);
      return nextScore;
    });
    setStreak((st) => st + 1);
    setShieldHp((hp) => Math.min(100, hp + 6));
  };

  return (
    <section id="arena" className="relative py-32 px-6 max-w-5xl mx-auto border-t border-zinc-900">
      {/* Header (No Descriptors) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            Iso Reflex Arena
          </h2>
        </div>

        {/* Minimal Score Tracker */}
        <div className="flex items-center gap-6 font-mono text-sm">
          <div>
            <span className="text-[10px] text-zinc-400 block">SCORE</span>
            <span className="text-zinc-100 font-bold">{score}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block">COMBO</span>
            <span className="text-zinc-300 font-bold">x{streak}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block">BEST</span>
            <span className="text-zinc-400 font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Double-Bezel Arena Window */}
      <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-zinc-800/80 via-zinc-900/40 to-zinc-950 border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-zinc-950 p-6 sm:p-8 border border-zinc-900">
          {/* Shield Integrity Bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>SHIELD</span>
              <span className="text-zinc-200">{shieldHp}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${
                  shieldHp > 40 ? "bg-zinc-200" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                }`}
                style={{ width: `${shieldHp}%` }}
              />
            </div>
          </div>

          {/* Interactive Playfield */}
          <div
            ref={containerRef}
            className="relative w-full h-72 sm:h-96 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 overflow-hidden flex items-center justify-center select-none"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:32px_32px] opacity-15 pointer-events-none" />

            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/85 backdrop-blur-sm p-6 text-center">
                <h3 className="text-xl font-bold tracking-tight text-zinc-100 mb-1.5">
                  {shieldHp === 0 ? "Round Concluded" : "Reflex Challenge"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  {shieldHp === 0
                    ? `Final score: ${score} (Combo x${streak})`
                    : "Eliminate targets before the shield depletes."}
                </p>
                <button
                  onClick={handleStart}
                  className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-white transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  <span>{shieldHp === 0 ? "Engage Again" : "Start"}</span>
                  <div className="w-7 h-7 rounded-full bg-zinc-950 text-zinc-100 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play size={13} weight="fill" />
                  </div>
                </button>
              </div>
            )}

            {/* Target Orbs */}
            {isPlaying && (
              <AnimatePresence>
                {targets.map((target) => (
                  <motion.button
                    key={target.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    onClick={() => hitTarget(target.id)}
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      width: `${target.size}px`,
                      height: `${target.size}px`,
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-100 bg-zinc-100/15 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-[0_0_16px_rgba(255,255,255,0.4)] active:scale-90"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-100" />
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>

          {isPlaying && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleStop}
                className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                [ Abort ]
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
