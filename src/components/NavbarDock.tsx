"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { sounds } from "../utils/audio";
import { ConnectModal } from "./ConnectModal";
import {
  House,
  Disc,
  SquaresFour,
  GraduationCap,
  FolderSimple,
  ChatDots,
} from "@phosphor-icons/react";

export function NavbarDock() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const handleNavClick = () => {
    sounds.playClick();
  };

  return (
    <>
      <header className="absolute top-4 sm:top-6 inset-x-0 z-40 w-full px-3 flex justify-center pointer-events-none">
        <div className="flex justify-center w-full">
          {/* Centered Labeled Nav Bar with Backdrop Blur */}
          <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Home */}
            <a
              href="#"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 transition-all active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0"
              aria-label="Home"
            >
              <House size={16} />
              <span className="hidden sm:inline">Home</span>
            </a>

            {/* Vibes */}
            <a
              href="#music"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 transition-all active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0"
              aria-label="Vibes"
            >
              <Disc size={16} />
              <span className="hidden sm:inline">Vibes</span>
            </a>

            {/* About */}
            <a
              href="#about"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 transition-all active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0"
              aria-label="About"
            >
              <SquaresFour size={16} />
              <span className="hidden sm:inline">About</span>
            </a>

            {/* Skills */}
            <a
              href="#skills"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 transition-all active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0"
              aria-label="Skills"
            >
              <GraduationCap size={16} />
              <span className="hidden sm:inline">Skills</span>
            </a>

            {/* Projects */}
            <a
              href="#projects"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 transition-all active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0"
              aria-label="Projects"
            >
              <FolderSimple size={16} />
              <span className="hidden sm:inline">Projects</span>
            </a>

            <div className="h-4 w-px bg-zinc-800 mx-0.5 sm:mx-1" />

            {/* Connect */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsConnectOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-full bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-all cursor-pointer shadow-sm active:scale-95 min-h-[40px] sm:min-h-0"
            >
              <ChatDots size={15} weight="bold" />
              <span>Connect</span>
            </button>
          </nav>
        </div>
      </header>

      <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
    </>
  );
}
