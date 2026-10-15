"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROFILE } from "../data/profile";
import { Song, LyricLine } from "../types";
import { sounds } from "../utils/audio";
import {
  SkipBack,
  SkipForward,
  ArrowUpRight,
  Play,
  Pause,
  ArrowUUpLeft,
} from "@phosphor-icons/react";

export function SongDial() {
  const tracks = PROFILE.music.heavyRotation;
  const total = tracks.length;
  const angleStep = 360 / total;

  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  // 30-Second Song Preview Playback State
  const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);
  const [snippetProgress, setSnippetProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [dialRadius, setDialRadius] = useState(260);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDialRadius(135);
      } else if (width < 1024) {
        setDialRadius(250);
      } else {
        setDialRadius(295);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll mobile pill carousel to active track (container-only scroll, avoids shifting page/window)
  useEffect(() => {
    if (mobileCarouselRef.current) {
      const container = mobileCarouselRef.current;
      const pillEl = container.children[activeIndex] as HTMLElement | undefined;
      if (pillEl) {
        const targetScrollLeft =
          pillEl.offsetLeft - container.clientWidth / 2 + pillEl.clientWidth / 2;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  // Playlist Card Covers State (True = Revealed, False = Covered)
  const [revealedPlaylists, setRevealedPlaylists] = useState<Record<number, boolean>>({});

  const togglePlaylistReveal = (idx: number) => {
    sounds.playClick();
    setRevealedPlaylists((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const stopCurrentSnippet = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsPlayingSnippet(false);
    setSnippetProgress(0);
  };

  const playSongSnippet = (index: number) => {
    stopCurrentSnippet();
    const track = tracks[index];
    if (!track.audioSrc) return;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      const audio = audioRef.current;
      audio.src = track.audioSrc;
      audio.currentTime = track.bestPartOffset || 0;
      audio.volume = 0.10; // Locked at 10% volume

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingSnippet(true);
            setSnippetProgress(0);

            const startTime = performance.now();
            const updateFrame = (now: number) => {
              const elapsed = (now - startTime) / 1000;
              if (elapsed >= 30) {
                setSnippetProgress(30);
                stopCurrentSnippet();
              } else {
                setSnippetProgress(elapsed);
                if (elapsed > 28 && audioRef.current) {
                  const fade = Math.max(0, (30 - elapsed) / 2);
                  audioRef.current.volume = 0.10 * fade;
                }
                animationFrameRef.current = requestAnimationFrame(updateFrame);
              }
            };
            animationFrameRef.current = requestAnimationFrame(updateFrame);
          })
          .catch((err) => {
            console.log("Audio autoplay restricted by browser:", err);
            setIsPlayingSnippet(false);
          });
      }
    } catch (err) {
      console.log("Audio play error:", err);
    }
  };

  // Continuous Full-Circle Rotation: Shortest angular path, never resets
  const rotateTo = (index: number) => {
    sounds.playDialTick(1 + (index / total) * 0.3);
    const nominal = -index * angleStep;
    let diff = (nominal - rotation) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const newAngle = rotation + diff;

    setActiveIndex(index);
    setRotation(newAngle);
    playSongSnippet(index);
  };

  // Step Forward Continuously in Full Circle
  const handleNext = () => {
    sounds.playDialTick(1 + (((activeIndex + 1) % total) / total) * 0.3);
    const nextIdx = (activeIndex + 1) % total;
    const nextAngle = rotation - angleStep;
    setActiveIndex(nextIdx);
    setRotation(nextAngle);
    playSongSnippet(nextIdx);
  };

  // Step Backward Continuously in Full Circle
  const handlePrev = () => {
    sounds.playDialTick(1 + (((activeIndex - 1 + total) % total) / total) * 0.3);
    const prevIdx = (activeIndex - 1 + total) % total;
    const prevAngle = rotation + angleStep;
    setActiveIndex(prevIdx);
    setRotation(prevAngle);
    playSongSnippet(prevIdx);
  };

  const togglePlayPauseSnippet = () => {
    if (isPlayingSnippet) {
      stopCurrentSnippet();
    } else {
      playSongSnippet(activeIndex);
    }
  };

  const seekTo = (targetSec: number) => {
    const clamped = Math.max(0, Math.min(30, targetSec));
    setSnippetProgress(clamped);
    if (audioRef.current) {
      const track = tracks[activeIndex];
      audioRef.current.currentTime = (track.bestPartOffset || 0) + clamped;
    }
  };

  useEffect(() => {
    return () => {
      stopCurrentSnippet();
    };
  }, []);

  const currentTrack = tracks[activeIndex];

  // Helper to get active lyric line based on current playback second
  const getActiveLine = (track: Song, progress: number): LyricLine | null => {
    if (!track.lyrics || track.lyrics.length === 0) return null;
    let current = track.lyrics[0];
    for (const line of track.lyrics) {
      if (progress >= line.time) {
        current = line;
      } else {
        break;
      }
    }
    return current;
  };

  const activeLine = isPlayingSnippet ? getActiveLine(currentTrack, snippetProgress) : null;

  // Circumference for the perimeter progress ring
  const ringRadius = 48.5;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const progressRatio = Math.min(1, Math.max(0, snippetProgress / 30));
  const strokeOffset = ringCircumference * (1 - progressRatio);

  return (
    <section id="music" className="relative py-20 sm:py-32 px-4 sm:px-6 w-full max-w-6xl mx-auto border-t border-zinc-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Section Header */}
      <div className="w-full text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          My Vibes
        </h2>
      </div>

      {/* MOBILE EXPERIENCE (< 640px): Centerpiece Player Screen + Sleek Carousel */}
      <div className="flex sm:hidden flex-col items-center justify-center w-full max-w-sm mx-auto select-none">
        {/* Mobile Centerpiece Player */}
        <div className="relative w-[280px] h-[280px] mx-auto flex items-center justify-center shrink-0">
          {/* Circular Perimeter Progress Fill SVG */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          >
            <circle
              cx="50"
              cy="50"
              r={ringRadius}
              fill="none"
              stroke="#27272a"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />

            {isPlayingSnippet && (
              <>
                <defs>
                  {/* Multi-stage Gaussian Blur filter for ultra-smooth optical glow without pixel stepping */}
                  <filter id="neon-glow-mobile" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="tightBlur" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="midBlur" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="wideBlur" />
                    <feMerge>
                      <feMergeNode in="wideBlur" />
                      <feMergeNode in="midBlur" />
                      <feMergeNode in="tightBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Layer 1: Ultra-diffuse ambient bloom */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke={currentTrack.color || "#ffffff"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeOpacity="0.25"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                  filter="url(#neon-glow-mobile)"
                />

                {/* Layer 2: Soft saturated mid-glow */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke={currentTrack.color || "#ffffff"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeOpacity="0.50"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                />

                {/* Layer 3: Core crisp neon arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                />
              </>
            )}
          </svg>

          {/* Centered Digital Monitor Screen */}
          <div className="relative z-20 w-[240px] h-[240px] rounded-full border border-zinc-800/90 bg-zinc-950 p-5 flex flex-col items-center justify-between text-center shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center justify-between h-full py-0.5">
              {/* Top Row: Artist & Duration */}
              <div className="w-[160px] flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-1">
                <span className="truncate max-w-[105px] text-zinc-300 font-medium">
                  {currentTrack.artist}
                </span>
                <span className="text-zinc-400 font-medium">
                  {isPlayingSnippet ? `${Math.ceil(30 - snippetProgress)}s` : currentTrack.duration}
                </span>
              </div>

              {/* Center Block: Title + Animated Volume Bars + Lyrics */}
              <div className="my-auto px-1 flex flex-col items-center justify-center w-full max-w-[210px]">
                <h3 className="text-lg font-bold tracking-tight text-zinc-100 line-clamp-1 leading-tight">
                  {currentTrack.title}
                </h3>

                {/* Animated Spectrum Waveform */}
                <div className="flex items-end gap-1 h-7 px-3 py-1 rounded-xl bg-zinc-950/80 border border-zinc-800/60 my-2 w-36 justify-center">
                  {[35, 65, 45, 80, 55, 75, 40, 90, 60, 45, 70, 55, 85, 40, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${
                        isPlayingSnippet ? "" : "bg-zinc-600"
                      }`}
                      style={{
                        backgroundColor: isPlayingSnippet ? (currentTrack.color || "#818cf8") : undefined,
                        boxShadow: isPlayingSnippet ? `0 0 8px ${currentTrack.color || "#818cf8"}` : undefined,
                        height: isPlayingSnippet
                          ? `${((h + ((i + Math.floor(snippetProgress * 4)) % 5) * 16) % 85) + 15}%`
                          : `${h * 0.35}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Line-by-Line Fading Lyrics Subtitle */}
                <div className="h-6 flex items-center justify-center overflow-hidden w-full px-1">
                  <AnimatePresence mode="wait">
                    {isPlayingSnippet && activeLine ? (
                      <motion.p
                        key={activeLine.text}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-[11px] text-zinc-200 font-medium leading-tight text-center px-1 italic line-clamp-1 truncate"
                      >
                        &ldquo;{activeLine.text}&rdquo;
                      </motion.p>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {currentTrack.genre}
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Action: Compact Pill */}
              <a
                href={PROFILE.music.spotifyProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-950 text-[11px] font-semibold hover:bg-white transition-colors shadow-sm max-w-[150px] truncate"
              >
                <span className="truncate">Spotify Profile</span>
                <ArrowUpRight size={11} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Hardware Controls (Thumb Friendly min 44px targets) */}
        <div className="mt-6 flex items-center justify-center gap-3 w-full mx-auto">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-800 transition-all cursor-pointer active:scale-95 shadow-md"
            title="Previous track"
            aria-label="Previous track"
          >
            <SkipBack size={20} weight="fill" />
          </button>

          <button
            onClick={togglePlayPauseSnippet}
            className={`flex items-center gap-2 h-12 px-6 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
              isPlayingSnippet
                ? "bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800"
            }`}
          >
            {isPlayingSnippet ? (
              <Pause size={16} weight="fill" />
            ) : (
              <Play size={16} weight="fill" />
            )}
            <span>{isPlayingSnippet ? "Pause song" : "Preview song"}</span>
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-800 transition-all cursor-pointer active:scale-95 shadow-md"
            title="Next track"
            aria-label="Next track"
          >
            <SkipForward size={20} weight="fill" />
          </button>
        </div>

        {/* Mobile Horizontal Swipeable Track Carousel Selector */}
        <div className="w-full max-w-sm mx-auto mt-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2.5 px-3">
            <span className="tracking-wider uppercase text-zinc-500 font-semibold">Track List</span>
            <span className="text-zinc-400">
              {(activeIndex + 1).toString().padStart(2, "0")} / {total.toString().padStart(2, "0")}
            </span>
          </div>

          <div
            ref={mobileCarouselRef}
            className="w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth flex gap-2 pb-2 pt-1 px-3 snap-x"
          >
            {tracks.map((track, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={track.id}
                  onClick={() => rotateTo(idx)}
                  className={`snap-center shrink-0 min-h-[44px] px-3.5 py-2 rounded-full border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-sm active:scale-95 ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 font-semibold"
                      : "bg-zinc-900/90 text-zinc-400 border-zinc-800/90 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                  style={{
                    borderColor: isActive ? (track.color || "#ffffff") : undefined,
                    boxShadow: isActive
                      ? `0 0 16px ${track.color ? `${track.color}55` : "rgba(255,255,255,0.25)"}`
                      : undefined,
                  }}
                >
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isActive ? "text-zinc-700" : "text-zinc-500"
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="flex flex-col leading-tight max-w-[125px]">
                    <span className="text-[11.5px] truncate font-medium">
                      {track.title}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono truncate ${
                        isActive ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {track.artist}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DESKTOP & TABLET EXPERIENCE (>= 640px): Standalone Centerpiece Rotary Jog Dial */}
      <div className="hidden sm:flex relative flex-col items-center justify-center my-4 select-none mx-auto w-full">
        <div className="relative w-[640px] h-[640px] md:w-[720px] md:h-[720px] lg:w-[800px] lg:h-[800px] mx-auto flex items-center justify-center">
          {/* Circular Perimeter Progress Fill SVG */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          >
            <circle
              cx="50"
              cy="50"
              r={ringRadius}
              fill="none"
              stroke="#27272a"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />

            {isPlayingSnippet && (
              <>
                {/* Defs with multi-tier Gaussian Blur filter for ultra-smooth optical bloom */}
                <defs>
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="tightBlur" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="midBlur" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="wideBlur" />
                    <feMerge>
                      <feMergeNode in="wideBlur" />
                      <feMergeNode in="midBlur" />
                      <feMergeNode in="tightBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Layer 1: Ultra-diffuse ambient bloom */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke={currentTrack.color || "#ffffff"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeOpacity="0.25"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                  filter="url(#neon-glow)"
                />

                {/* Layer 2: Soft saturated mid-glow */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke={currentTrack.color || "#ffffff"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeOpacity="0.50"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                />

                {/* Layer 3: Core crisp neon arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 50 50)"
                />
              </>
            )}
          </svg>

          {/* Rotatable Outer Turntable Ring (Carries the 12 Song Node Pills) */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            className="absolute inset-8 md:inset-9 rounded-full flex items-center justify-center pointer-events-none"
          >
            {/* Circular Track Nodes (Counter-rotated by -rotation to remain perfectly upright) */}
            {tracks.map((track, idx) => {
              const angleDeg = idx * angleStep;
              const angleRad = (angleDeg - 90) * (Math.PI / 180);
              const x = Math.cos(angleRad) * dialRadius;
              const y = Math.sin(angleRad) * dialRadius;
              const isActive = idx === activeIndex;

              return (
                <motion.button
                  key={track.id}
                  onClick={() => rotateTo(idx)}
                  animate={{
                    x,
                    y,
                    rotate: -rotation,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  className={`absolute px-3 py-1.5 md:px-3.5 md:py-2 rounded-full border text-left transition-all duration-200 cursor-pointer pointer-events-auto shadow-md ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 font-semibold scale-105 z-20"
                      : "bg-zinc-900/95 text-zinc-400 border-zinc-800/90 hover:border-zinc-700 hover:text-zinc-200 z-10"
                  }`}
                  style={{
                    borderColor: isActive ? (track.color || "#ffffff") : undefined,
                    boxShadow: isActive
                      ? `0 0 20px ${track.color ? `${track.color}66` : "rgba(255,255,255,0.3)"}`
                      : undefined,
                  }}
                >
                  <div className="flex flex-col leading-tight max-w-[110px] md:max-w-[125px]">
                    <span className="text-[10.5px] md:text-[11.5px] truncate font-medium block">
                      {track.title}
                    </span>
                    <span
                      className={`text-[8.5px] md:text-[9.5px] font-mono truncate block ${
                        isActive ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {track.artist}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Centered Digital Monitor Screen */}
          <div className="relative z-20 w-[310px] h-[310px] md:w-[350px] md:h-[350px] rounded-full border border-zinc-800/90 bg-zinc-950 px-7 pt-9 pb-7 md:px-8 md:pt-10 md:pb-8 flex flex-col items-center justify-between text-center shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center justify-between h-full py-0.5">
              {/* Top Row: Artist & Duration */}
              <div className="w-[190px] md:w-[220px] flex items-center justify-between text-[12px] md:text-[13px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-1.5">
                <span className="truncate max-w-[130px] text-zinc-300 font-medium">
                  {currentTrack.artist}
                </span>
                <span className="text-zinc-400 font-medium">
                  {isPlayingSnippet ? `${Math.ceil(30 - snippetProgress)}s` : currentTrack.duration}
                </span>
              </div>

              {/* Center Block: Title + Animated Light-Up Volume/Sound Spectrum Bars */}
              <div className="my-auto px-2 flex flex-col items-center justify-center w-full max-w-[240px] md:max-w-[270px]">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100 line-clamp-1 leading-tight">
                  {currentTrack.title}
                </h3>

                {/* Animated Spectrum Waveform / Light-Up Volume Bars */}
                <div className="flex items-end gap-1.5 md:gap-2 h-8 md:h-9 px-4 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800/60 my-2 w-42 md:w-48 justify-center">
                  {[35, 65, 45, 80, 55, 75, 40, 90, 60, 45, 70, 55, 85, 40, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${
                        isPlayingSnippet
                          ? ""
                          : "bg-zinc-600"
                      }`}
                      style={{
                        backgroundColor: isPlayingSnippet ? (currentTrack.color || "#818cf8") : undefined,
                        boxShadow: isPlayingSnippet ? `0 0 8px ${currentTrack.color || "#818cf8"}` : undefined,
                        height: isPlayingSnippet
                          ? `${((h + ((i + Math.floor(snippetProgress * 4)) % 5) * 16) % 85) + 15}%`
                          : `${h * 0.35}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Line-by-Line Fading Lyrics Subtitle Container */}
                <div className="h-7 sm:h-8 flex items-center justify-center overflow-hidden w-full px-1">
                  <AnimatePresence mode="wait">
                    {isPlayingSnippet && activeLine ? (
                      <motion.p
                        key={activeLine.text}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="text-[12.5px] md:text-[13px] text-zinc-200 font-medium leading-tight text-center px-1 italic line-clamp-1 truncate"
                      >
                        &ldquo;{activeLine.text}&rdquo;
                      </motion.p>
                    ) : (
                      <span className="text-[11.5px] md:text-[12px] text-zinc-400 font-mono">
                        {currentTrack.genre}
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Action: Compact Pill */}
              <a
                href={PROFILE.music.spotifyProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-zinc-100 text-zinc-950 text-[12px] font-semibold hover:bg-white transition-colors shadow-sm max-w-[180px] truncate"
              >
                <span className="truncate">Spotify Profile</span>
                <ArrowUpRight size={12} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        {/* Hardware Playback Controls Under the Dial */}
        <div className="mt-8 flex items-center gap-2">
          {/* Previous Track Button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all cursor-pointer active:scale-95"
            title="Previous track"
            aria-label="Previous track"
          >
            <SkipBack size={18} weight="fill" />
          </button>

          {/* Main Play / Preview Pill */}
          <button
            onClick={togglePlayPauseSnippet}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-98 ${
              isPlayingSnippet
                ? "bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800/80"
            }`}
          >
            {isPlayingSnippet ? (
              <Pause size={15} weight="fill" />
            ) : (
              <Play size={15} weight="fill" />
            )}
            <span>{isPlayingSnippet ? "Pause song" : "Preview song"}</span>
          </button>

          {/* Next Track Button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all cursor-pointer active:scale-95"
            title="Next track"
            aria-label="Next track"
          >
            <SkipForward size={18} weight="fill" />
          </button>
        </div>
      </div>

      {/* 6 Curated Spotify Playlists Grid Covered Directly by Custom Cover Art */}
      <div className="w-full max-w-5xl mt-14 sm:mt-20 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center w-full">
          {PROFILE.music.playlists.map((playlist, idx) => {
            const isRevealed = !!revealedPlaylists[idx];

            return (
              <div
                key={idx}
                className="relative w-full max-w-[285px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[415px] sm:h-[435px] md:h-[455px] rounded-[1.75rem] p-1 bg-gradient-to-b from-zinc-800/80 via-zinc-900/40 to-zinc-950 border border-zinc-800/80 shadow-2xl flex items-center justify-center select-none"
              >
                <div className="relative w-full h-full rounded-[calc(1.75rem-4px)] overflow-hidden bg-black border border-zinc-900/90 hover:border-zinc-700/80 transition-colors duration-200">
                  {/* The Live Spotify Playlist Player */}
                  {isRevealed && (
                    <div className="w-full h-full relative">
                      <iframe
                        src={playlist.embedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-full h-full block rounded-[calc(1.75rem-4px)]"
                      />
                    </div>
                  )}

                  {/* Card Picture directly covering the playlist */}
                  <AnimatePresence>
                    {!isRevealed && (
                      <motion.div
                        key="card-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => {
                          sounds.playClick();
                          togglePlaylistReveal(idx);
                        }}
                        className="absolute inset-0 z-20 w-full h-full cursor-pointer select-none bg-black flex items-center justify-center p-0 overflow-hidden"
                        title={`Click to reveal ${playlist.name}`}
                      >
                        <img
                          src="/playlist-cover.png"
                          alt={playlist.name}
                          className="w-full h-full object-cover pointer-events-none rounded-[calc(1.75rem-4px)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
