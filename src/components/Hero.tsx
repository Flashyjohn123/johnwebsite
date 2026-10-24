"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative w-full max-w-6xl mx-auto py-8 sm:py-16 px-4 sm:px-6 flex flex-col justify-center items-center text-center overflow-hidden">
      <div className="max-w-3xl flex flex-col items-center text-center w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-100 leading-[1.05] sm:leading-[0.95]"
        >
          John Huynh
        </motion.h1>

        {/* Narrative Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 sm:mt-6 text-sm sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal px-2 sm:px-0"
        >
          Studying Elementary Education to inspire curiosity and foundational confidence in K–6th grade classrooms. When not working or growing my educational mind, I am hitting the gym, hitting a yellow greenish ball back and forth, or losing on Valorant and TFT.
        </motion.p>

        {/* Quote Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-7 sm:mt-8 flex flex-col items-center w-full px-2 sm:px-0"
        >
          <div className="relative w-full max-w-lg px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 shadow-2xl backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-2 mb-2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
              <span>🏴‍☠️</span>
              <span>Monkey D. Luffy</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-mono italic leading-relaxed">
              &ldquo;It&rsquo;s not about whether I can or not. I&rsquo;m gonna do it because I want to.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
