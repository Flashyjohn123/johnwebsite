"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/audio";
import { Play } from "@phosphor-icons/react";

interface SpawnPokemon {
  id: number;
  name: string;
  image: string;
  x: number;
  y: number;
  points: number;
}

const ROSTER = [
  { name: "Victini", image: "/victini.png", points: 300 },
  { name: "Ukulele Pichu", image: "/ukulele-pichu.png", points: 250 },
];

export function PokemonGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [caught, setCaught] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [spawns, setSpawns] = useState<SpawnPokemon[]>([]);
  const [timeLeft, setTimeLeft] = useState(25);
  const playAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          sounds.playVictoryFanfare();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    // Pokémon Spawner
    const spawnInterval = setInterval(() => {
      setSpawns((prev) => {
        if (prev.length >= 4) return prev.slice(1);
        const template = ROSTER[Math.floor(Math.random() * ROSTER.length)];
        const newSpawn: SpawnPokemon = {
          id: Date.now() + Math.random(),
          name: template.name,
          image: template.image,
          points: template.points,
          x: Math.floor(Math.random() * 75) + 10,
          y: Math.floor(Math.random() * 65) + 15,
        };
        return [...prev, newSpawn];
      });
    }, 850);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  }, [isPlaying]);

  const handleStart = () => {
    sounds.playClick();
    setScore(0);
    setCaught(0);
    setTimeLeft(25);
    setSpawns([]);
    setIsPlaying(true);
  };

  const handleCatch = (id: number, points: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playDialTick(1.4);

    confetti({
      particleCount: 16,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#ffffff", "#f59e0b", "#fbbf24"],
      disableForReducedMotion: true,
    });

    setSpawns((prev) => prev.filter((p) => p.id !== id));
    setCaught((c) => c + 1);
    setScore((s) => {
      const nextScore = s + points;
      if (nextScore > highScore) setHighScore(nextScore);
      return nextScore;
    });
  };

  return (
    <section id="arena" className="relative py-32 px-6 max-w-5xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            Catch Arena
          </h2>
        </div>

        {/* Minimal Score Tracker */}
        <div className="flex items-center gap-6 font-mono text-sm">
          <div>
            <span className="text-[10px] text-zinc-400 block">TIME</span>
            <span className="text-zinc-100 font-bold">{timeLeft}s</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block">CAUGHT</span>
            <span className="text-zinc-300 font-bold">{caught}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block">SCORE</span>
            <span className="text-zinc-100 font-bold">{score}</span>
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
          {/* Interactive Playfield */}
          <div
            ref={playAreaRef}
            className="relative w-full h-80 sm:h-96 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 overflow-hidden flex items-center justify-center select-none"
          >
            {/* Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:32px_32px] opacity-15 pointer-events-none" />

            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/85 backdrop-blur-sm p-6 text-center">
                <h3 className="text-xl font-bold tracking-tight text-zinc-100 mb-1.5">
                  {timeLeft === 0 ? "Session Concluded" : "Partner Catch Challenge"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  {timeLeft === 0
                    ? `You caught ${caught} partner Pokémon with a score of ${score}!`
                    : "Catch partner Pokémon as they appear before time expires."}
                </p>
                <button
                  onClick={handleStart}
                  className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-white transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  <span>{timeLeft === 0 ? "Play Again" : "Start"}</span>
                  <div className="w-7 h-7 rounded-full bg-zinc-950 text-zinc-100 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play size={13} weight="fill" />
                  </div>
                </button>
              </div>
            )}

            {/* Floating Pokémon Targets */}
            {isPlaying && (
              <AnimatePresence>
                {spawns.map((p) => (
                  <motion.button
                    key={p.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => handleCatch(p.id, p.points, e)}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl bg-zinc-900/60 border border-zinc-700/60 hover:border-zinc-500 shadow-xl cursor-pointer active:scale-90 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="w-auto h-12 object-contain"
                      />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
