"use client";

import { useState } from "react";
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

export type TabId = "home" | "vibes" | "about" | "skills" | "projects" | "contact";

interface NavbarDockProps {
  activeTab?: TabId;
  onSelectTab?: (tab: TabId) => void;
}

export function NavbarDock({ activeTab = "home", onSelectTab }: NavbarDockProps) {
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const handleTabClick = (tab: TabId) => {
    sounds.playClick();
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  const navItems: { id: TabId; label: string; icon: typeof House }[] = [
    { id: "home", label: "Home", icon: House },
    { id: "vibes", label: "Vibes", icon: Disc },
    { id: "about", label: "About", icon: SquaresFour },
    { id: "skills", label: "Skills", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderSimple },
  ];

  return (
    <>
      <header className="absolute top-4 sm:top-6 inset-x-0 z-40 w-full px-3 flex justify-center pointer-events-none">
        <div className="flex justify-center w-full">
          {/* Centered Labeled Nav Bar with Backdrop Blur */}
          <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 cursor-pointer min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 ${
                    isActive
                      ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850/70 border border-transparent"
                  }`}
                  aria-label={item.label}
                >
                  <Icon size={16} weight={isActive ? "fill" : "regular"} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}

            <div className="h-4 w-px bg-zinc-800 mx-0.5 sm:mx-1" />

            {/* Connect */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setIsConnectOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-full bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-all cursor-pointer shadow-sm active:scale-95 min-h-[38px] sm:min-h-0"
            >
              <ChatDots size={15} weight="bold" />
              <span>Connect</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Connect Modal Overlay */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />
    </>
  );
}
