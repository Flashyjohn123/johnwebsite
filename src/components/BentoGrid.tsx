"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  GameController,
  Trophy,
  Barbell,
  BookOpen,
  FilmSlate,
  Bookmarks,
  Television,
} from "@phosphor-icons/react";
import { sounds } from "../utils/audio";

interface CardData {
  id: string;
  rank: string;
  suit: "spades" | "hearts" | "diamonds" | "clubs";
  suitSymbol: string;
  suitColor: string;
  badge: string;
  title: string;
  icon: typeof GraduationCap;
  tagline: string;
  items?: string[];
  gymSplits?: {
    category: string;
    exercises: string;
  }[];
  education?: {
    degree: string;
    cert: string;
    description: string;
  };
  quote?: string;
}

const CARDS: CardData[] = [
  {
    id: "major",
    rank: "A",
    suit: "spades",
    suitSymbol: "♠",
    suitColor: "text-zinc-200",
    badge: "ACADEMICS",
    title: "Major",
    icon: GraduationCap,
    tagline: "Foundations for lifelong learning",
    education: {
      degree: "Bachelor of Arts in Education",
      cert: "Early Childhood–6 ESL Certification",
      description:
        "Passionate about elementary pedagogy, bilingual language acquisition, and fostering curious, confident young minds in K–6 classrooms.",
    },
    quote: "Building foundational confidence in early education.",
  },
  {
    id: "games",
    rank: "K",
    suit: "hearts",
    suitSymbol: "♥",
    suitColor: "text-rose-500",
    badge: "GAMING",
    title: "Favorite games",
    icon: GameController,
    tagline: "Competitive arenas & casual worlds",
    items: ["Valorant", "Overwatch", "Pokemon", "Roblox", "TFT"],
    quote: "From clutch rounds in tactical shooters to adaptive autobattler boards.",
  },
  {
    id: "sports",
    rank: "Q",
    suit: "diamonds",
    suitSymbol: "♦",
    suitColor: "text-rose-500",
    badge: "ATHLETICS",
    title: "Sports",
    icon: Trophy,
    tagline: "Reflexes, stamina & court vision",
    items: ["Tennis", "Ping pong", "Basketball"],
    quote: "Fast-paced baseline rallies, top-spin drives, and competitive runs.",
  },
  {
    id: "gym",
    rank: "J",
    suit: "clubs",
    suitSymbol: "♣",
    suitColor: "text-zinc-200",
    badge: "FITNESS",
    title: "Gym",
    icon: Barbell,
    tagline: "Progressive overload & discipline",
    gymSplits: [
      {
        category: "Arms",
        exercises:
          "Cable tricep pull downs, Cable bicep curls, lateral raises, shoulder press, reverse flys, and barbell curls",
      },
      {
        category: "Chest",
        exercises: "Pec flys and benchpress",
      },
      {
        category: "Back",
        exercises:
          "Weighted pull ups, row machine, barbell rows, and lat pulldowns",
      },
    ],
  },
  {
    id: "anime",
    rank: "10",
    suit: "spades",
    suitSymbol: "♠",
    suitColor: "text-zinc-200",
    badge: "WATCHLIST",
    title: "Anime",
    icon: FilmSlate,
    tagline: "High-stakes stories & journeys",
    items: [
      "One Piece",
      "Link Click",
      "Horimiya",
      "Pokemon XYZ",
      "Ouran Highschool Host Club",
    ],
    quote: "Grand voyages, mind-bending time loops, and heartwarming romance.",
  },
  {
    id: "shows",
    rank: "9",
    suit: "clubs",
    suitSymbol: "♣",
    suitColor: "text-zinc-200",
    badge: "WATCHLIST",
    title: "Shows",
    icon: Television,
    tagline: "Comfort classics, mockumentaries & heartfelt dramas",
    items: [
      "The Office",
      "Abbott Elementary",
      "Avatar The Last Airbender",
      "Gilmore Girls",
      "Grey's Anatomy",
    ],
    quote: "Quirky workplace comedy, timeless animation, and cozy small-town comfort.",
  },
  {
    id: "manga",
    rank: "8",
    suit: "hearts",
    suitSymbol: "♥",
    suitColor: "text-rose-500",
    badge: "READING",
    title: "Manga",
    icon: Bookmarks,
    tagline: "Panel-by-panel masterclasses",
    items: ["One Piece", "Bleach", "Naruto", "JJK", "AOT"],
    quote: "The Big Three classics, deep lore, and generational battle arcs.",
  },
  {
    id: "books",
    rank: "7",
    suit: "diamonds",
    suitSymbol: "♦",
    suitColor: "text-rose-500",
    badge: "LITERATURE",
    title: "Books",
    icon: BookOpen,
    tagline: "Mythology, capers & dystopias",
    items: ["Percy Jackson", "Swindle", "Prodigy"],
    quote: "Mythological quests, clever heist capers, and gripping dystopian tales.",
  },
];

const TOTAL_CARDS = CARDS.length;

function getShortestDiff(cardIdx: number, activeIdx: number): number {
  let diff = cardIdx - activeIdx;
  const half = Math.floor(TOTAL_CARDS / 2);
  while (diff > half) diff -= TOTAL_CARDS;
  while (diff < -half) diff += TOTAL_CARDS;
  return diff;
}

export function BentoGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [screenMode, setScreenMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive layout mode
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenMode("mobile");
      } else if (width < 1024) {
        setScreenMode("tablet");
      } else {
        setScreenMode("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToCard = useCallback(
    (index: number) => {
      const normalized = ((index % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;
      if (normalized === activeIndex) return;
      sounds.playCardFlip();
      setPrevActiveIndex(activeIndex);
      setActiveIndex(normalized);
    },
    [activeIndex]
  );

  const handleNext = useCallback(() => {
    sounds.playCardFlip();
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % TOTAL_CARDS);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    sounds.playCardFlip();
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName))
        return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse scroll wheel navigation on hover
  const lastWheelTimeRef = useRef(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 220) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;

      if (delta > 0) {
        handleNext();
        lastWheelTimeRef.current = now;
      } else if (delta < 0) {
        handlePrev();
        lastWheelTimeRef.current = now;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  const getCardTransform = (cardIdx: number) => {
    const diff = getShortestDiff(cardIdx, activeIndex);
    const absDiff = Math.abs(diff);
    const isCenter = diff === 0;

    // Responsive metrics
    const isMobile = screenMode === "mobile";
    const isTablet = screenMode === "tablet";

    // Symmetrical 3D fan spread:
    // Center card stands upright and elevated as the hero card.
    // Flanking cards step outwards with comfortable breathing room so their headers, badges, and titles are clearly legible without messy cramming.
    const stepX = isMobile ? 140 : isTablet ? 195 : 240;
    const stepRotate = isMobile ? 5.5 : isTablet ? 7.5 : 9.5;

    const x = diff * stepX;
    
    // Balanced downward fan arc for side wings:
    // Flanking cards drop smoothly with quadratic curve, giving that premium Apple-style/game-hand card presentation.
    const archY = Math.pow(absDiff, 1.8) * (isMobile ? 18 : 28);
    const liftY = isCenter ? (isMobile ? -20 : -32) : 0;
    const y = archY + liftY;

    const rotate = diff * stepRotate;
    
    // Scale and visual hierarchy:
    // Center card is 100% full scale with high contrast; side cards step down slightly in scale (0.92, 0.84) and soften opacity/brightness
    const scale = isCenter
      ? 1
      : isMobile
      ? Math.max(0.82, 1 - absDiff * 0.09)
      : Math.max(0.86, 1 - absDiff * 0.07);

    // 5-card fan: cards within diff <= 2
    const isVisible = absDiff <= 2;
    
    // Clean symmetrical z-index: Center card on top (40), immediate neighbors behind (30), outer wings behind those (20)
    const zIndex = isCenter ? 40 : 30 - absDiff * 5;
    
    // Fade distant cards smoothly so they don't visually clutter the focus card
    const opacity = !isVisible
      ? 0
      : isCenter
      ? 1
      : isMobile
      ? Math.max(0.65, 1 - absDiff * 0.18)
      : Math.max(0.75, 1 - absDiff * 0.14);

    return { x, y, rotate, scale, zIndex, opacity, diff, isCenter, isVisible };
  };

  const currentCard = CARDS[activeIndex];

  return (
    <section
      id="about"
      className="relative py-8 sm:py-16 px-4 sm:px-6 w-full max-w-6xl mx-auto overflow-visible"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          A little bit about me
        </h2>
      </div>

      {/* Poker Hand Carousel Fan Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] sm:h-[540px] md:h-[570px] flex items-center justify-center select-none"
      >
        {CARDS.map((card, idx) => {
          const transform = getCardTransform(idx);
          const prevDiff = getShortestDiff(idx, prevActiveIndex);
          const didWrap = Math.abs(prevDiff - transform.diff) > 3;

          return (
            <motion.div
              key={card.id}
              onClick={() => goToCard(idx)}
              style={{
                transformOrigin: "50% 120%",
                zIndex: transform.zIndex,
                pointerEvents: transform.isVisible ? "auto" : "none",
              }}
              animate={{
                x: transform.x,
                y: transform.y,
                rotate: transform.rotate,
                scale: transform.scale,
                opacity: transform.opacity,
              }}
              transition={
                didWrap
                  ? {
                      x: { duration: 0 },
                      y: { duration: 0 },
                      rotate: { duration: 0 },
                      scale: { duration: 0 },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }
                  : {
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                      mass: 0.75,
                    }
              }
              whileHover={
                !transform.isCenter
                  ? {
                      y: transform.y - 28,
                      scale: transform.scale * 1.04,
                      transition: { duration: 0.2 },
                    }
                  : undefined
              }
              drag={transform.isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30 || info.velocity.x < -200) {
                  handleNext();
                } else if (info.offset.x > 30 || info.velocity.x > 200) {
                  handlePrev();
                }
              }}
              className={`absolute cursor-pointer ${
                transform.isCenter
                  ? "cursor-grab active:cursor-grabbing"
                  : "hover:brightness-110"
              }`}
            >
              {/* Outer Card Frame */}
              <div
                className={`relative w-[72vw] max-w-[260px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[395px] sm:h-[435px] md:h-[455px] rounded-[1.75rem] p-1 select-none transition-shadow duration-300 ${
                  transform.isCenter
                    ? "bg-gradient-to-b from-zinc-500/90 via-zinc-800/80 to-zinc-900 shadow-[0_0_45px_rgba(255,255,255,0.09),0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                    : "bg-gradient-to-b from-zinc-800/80 via-zinc-900/60 to-zinc-950 shadow-xl"
                }`}
              >
                {/* Inner Card Face */}
                <div className="relative w-full h-full rounded-[calc(1.75rem-4px)] bg-gradient-to-b from-zinc-950 via-zinc-950 to-black p-4 sm:p-6 flex flex-col justify-between overflow-hidden border border-zinc-900/90">
                  {/* Decorative luxury hairline border */}
                  <div
                    className={`absolute inset-2 sm:inset-2.5 rounded-[1.25rem] border pointer-events-none transition-colors duration-300 ${
                      transform.isCenter
                        ? "border-zinc-700/60"
                        : "border-zinc-800/40"
                    }`}
                  />

                  {/* Top Bar: Icon & Category Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-colors ${
                        transform.isCenter
                          ? "bg-zinc-800/90 border-zinc-700 text-zinc-100 shadow-sm"
                          : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400"
                      }`}
                    >
                      <card.icon size={17} weight="bold" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[9.5px] sm:text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-semibold">
                      {card.badge}
                    </span>
                  </div>

                  {/* Center Body: Title & Content Details */}
                  <div className="relative z-10 my-auto py-1 sm:py-2">
                    <div className="mb-2.5 sm:mb-3.5">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                        {card.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-normal mt-0.5">
                        {card.tagline}
                      </p>
                    </div>

                    {/* 1. Major Layout */}
                    {card.education && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="p-2.5 sm:p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                          <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold mb-1">
                            Degree & Certification
                          </span>
                          <div className="text-xs sm:text-base font-semibold text-zinc-100 leading-snug">
                            {card.education.degree}
                          </div>
                          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-zinc-200 text-[10.5px] sm:text-xs font-mono">
                            <span>{card.education.cert}</span>
                          </div>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                          {card.education.description}
                        </p>
                      </div>
                    )}

                    {/* 2. Gym 3-Split Layout */}
                    {card.gymSplits && (
                      <div className="space-y-1.5 sm:space-y-2">
                        {card.gymSplits.map((split) => (
                          <div
                            key={split.category}
                            className="p-1.5 sm:p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/70"
                          >
                            <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold mb-0.5">
                              {split.category}
                            </span>
                            <p className="text-[10.5px] sm:text-xs text-zinc-300 leading-snug">
                              {split.exercises}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. Items List (Games, Sports, Anime, Manga, Books) */}
                    {card.items && (
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {card.items.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] sm:text-xs text-zinc-200 font-medium tracking-tight shadow-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        {card.quote && (
                          <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed pt-0.5 sm:pt-1">
                            {card.quote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}