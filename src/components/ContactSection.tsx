"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PROFILE } from "../data/profile";
import { sounds } from "../utils/audio";
import {
  DiscordLogo,
  SpotifyLogo,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  SteamLogo,
  Copy,
  Check,
  ArrowUpRight,
} from "@phosphor-icons/react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PROFILE.socials.discord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-8 sm:py-16 px-4 sm:px-6 w-full max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Contact me!
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
          Feel free to reach out to chat, play games, talk music, or connect on my socials.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Discord Card - Primary / Interactive Copy */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg min-h-[160px] sm:min-h-[170px]"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
              <DiscordLogo size={22} weight="fill" />
            </div>

            <button
              onClick={handleCopyDiscord}
              className="px-3.5 py-2 rounded-full text-xs font-mono border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 min-h-[38px]"
              title="Copy Discord Tag"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Tag</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
              Discord
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 font-mono truncate">
              {PROFILE.socials.discord}
            </h3>
          </div>
        </motion.div>

        {/* 2. Spotify Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={PROFILE.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg group cursor-pointer block hover:border-zinc-600 transition-all min-h-[160px] sm:min-h-[170px] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
                <SpotifyLogo size={22} weight="fill" />
              </div>
              <div className="p-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                Spotify Profile
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors truncate">
                flashlight_john
              </h3>
            </div>
          </a>
        </motion.div>

        {/* 3. Instagram Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={PROFILE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg group cursor-pointer block hover:border-zinc-600 transition-all min-h-[160px] sm:min-h-[170px] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
                <InstagramLogo size={22} weight="fill" />
              </div>
              <div className="p-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                Instagram
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors truncate">
                @jxhnhzynh
              </h3>
            </div>
          </a>
        </motion.div>

        {/* 4. LinkedIn Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg group cursor-pointer block hover:border-zinc-600 transition-all min-h-[160px] sm:min-h-[170px] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
                <LinkedinLogo size={22} weight="fill" />
              </div>
              <div className="p-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                LinkedIn
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors truncate">
                John Huynh
              </h3>
            </div>
          </a>
        </motion.div>

        {/* 5. GitHub Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg group cursor-pointer block hover:border-zinc-600 transition-all min-h-[160px] sm:min-h-[170px] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
                <GithubLogo size={22} weight="fill" />
              </div>
              <div className="p-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                GitHub
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors truncate">
                Flashyjohn123
              </h3>
            </div>
          </a>
        </motion.div>

        {/* 6. Steam Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={PROFILE.socials.steam}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/80 shadow-lg group cursor-pointer block hover:border-zinc-600 transition-all min-h-[160px] sm:min-h-[170px] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
                <SteamLogo size={22} weight="fill" />
              </div>
              <div className="p-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                Steam Community
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors truncate">
                Flashyjohn
              </h3>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}