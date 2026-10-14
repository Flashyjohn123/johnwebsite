"use client";

import { useState } from "react";
import { PROFILE } from "../data/profile";
import { sounds } from "../utils/audio";
import { ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  const [revealed, setRevealed] = useState(false);

  const toggleEasterEgg = () => {
    sounds.playVictoryFanfare();
    setRevealed(!revealed);
  };

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-zinc-900 bg-zinc-950 py-16 px-4 sm:px-6 text-center pb-28 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-850 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          title="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp size={14} weight="bold" />
        </button>
      </div>
    </footer>
  );
}
