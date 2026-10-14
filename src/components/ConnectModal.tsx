"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROFILE } from "../data/profile";
import { sounds } from "../utils/audio";
import {
  X,
  Copy,
  Check,
  DiscordLogo,
  SpotifyLogo,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [copied, setCopied] = useState(false);

  const copyDiscord = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PROFILE.socials.discord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-[340px] sm:max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-zinc-800/80">
              <h3 className="font-semibold text-zinc-100 text-base">Contact & Socials</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Discord Copy Box */}
            <div className="mt-4 sm:mt-5">
              <span className="text-xs font-mono text-zinc-400 block mb-2">Discord</span>
              <button
                onClick={copyDiscord}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 cursor-pointer transition-all active:scale-98 text-left min-h-[46px]"
              >
                <div className="flex items-center gap-2.5">
                  <DiscordLogo size={18} className="text-zinc-400" />
                  <span className="font-mono text-xs text-zinc-200">
                    {PROFILE.socials.discord}
                  </span>
                </div>
                <div className="text-zinc-400">
                  {copied ? (
                    <span className="text-[11px] font-mono text-zinc-300 flex items-center gap-1">
                      <Check size={14} className="text-emerald-400" /> Copied
                    </span>
                  ) : (
                    <Copy size={15} />
                  )}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-4 sm:mt-5 space-y-2">
              <span className="text-xs font-mono text-zinc-400 block mb-1">Profiles</span>
              <a
                href={PROFILE.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all active:scale-98 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <SpotifyLogo size={17} />
                  <span>Spotify</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-400" />
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all active:scale-98 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <GithubLogo size={17} />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-400" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all active:scale-98 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinLogo size={17} />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-400" />
              </a>
              <a
                href={PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all active:scale-98 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramLogo size={17} />
                  <span>Instagram</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-400" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
