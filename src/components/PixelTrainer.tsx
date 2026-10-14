"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/audio";

export function PixelTrainer() {
  const [bouncing, setBouncing] = useState(false);

  const handleVictiniClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playVictoryFanfare();

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#e4e4e7", "#fbbf24", "#f59e0b"],
      shapes: ["star", "circle"],
      disableForReducedMotion: true,
    });
  };

  const handlePichuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playDialTick(1.3);
  };

  const handleAvatarClick = () => {
    sounds.playClick();
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);
  };

  return (
    <div className="relative flex items-end justify-center gap-4 sm:gap-7 select-none py-2">
      {/* Ukulele Pichu (Left) */}
      <motion.button
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePichuClick}
        className="cursor-pointer p-1 rounded-xl hover:bg-zinc-900/40 transition-colors flex items-end justify-center"
        title="Ukulele Pichu"
      >
        <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-end justify-center">
          <Image
            src="/ukulele-pichu.png"
            alt="Ukulele Pichu"
            width={72}
            height={72}
            className="w-auto h-14 sm:h-18 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            priority
          />
        </div>
      </motion.button>

      {/* Center: John's Custom Avatar (Chibi Anime Style) */}
      <motion.button
        animate={bouncing ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleAvatarClick}
        className="cursor-pointer p-1 rounded-2xl hover:bg-zinc-900/40 transition-colors flex flex-col items-center"
        title="John Huynh"
      >
        <div className="relative w-28 h-32 sm:w-36 sm:h-40 flex items-center justify-center">
          <svg
            viewBox="0 0 200 230"
            className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Soft Shadow Base */}
            <ellipse cx="100" cy="222" rx="60" ry="8" fill="#000000" fillOpacity="0.4" />

            {/* Back Hair Volume */}
            <path
              d="M48 95 C40 60 65 30 100 28 C135 30 160 60 152 95 C158 110 156 125 150 135 C146 120 144 105 140 100 C140 80 135 60 100 58 C65 60 60 80 60 100 C56 105 54 120 50 135 C44 125 42 110 48 95 Z"
              fill="#18181b"
            />

            {/* Neck */}
            <path
              d="M82 142 L82 178 C82 184 90 188 100 188 C110 188 118 184 118 178 L118 142 Z"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3"
            />
            {/* Neck Shadow under Chin */}
            <path
              d="M83 144 C92 154 108 154 117 144 L117 156 C108 163 92 163 83 156 Z"
              fill="#fdba74"
            />

            {/* Shoulders & Dark Streetwear Collared Shirt */}
            <path
              d="M40 226 L42 202 C44 186 64 176 80 174 L90 186 L100 192 L110 186 L120 174 C136 176 156 186 158 202 L160 226 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="3"
            />
            {/* Inner Black Undershirt scoop */}
            <path
              d="M90 186 C90 198 110 198 110 186 C110 180 90 180 90 186 Z"
              fill="#09090b"
            />
            {/* Left Shirt Collar Flap */}
            <path
              d="M78 174 L92 195 L95 180 L84 172 Z"
              fill="#27272a"
              stroke="#18181b"
              strokeWidth="2.5"
            />
            {/* Right Shirt Collar Flap */}
            <path
              d="M122 174 L108 195 L105 180 L116 172 Z"
              fill="#27272a"
              stroke="#18181b"
              strokeWidth="2.5"
            />

            {/* Left Ear */}
            <path
              d="M58 108 C50 108 48 124 56 132 C58 134 62 134 64 128"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3"
            />
            <path d="M54 116 C53 122 56 124 58 123" stroke="#fba76a" strokeWidth="2" strokeLinecap="round" />
            {/* Left Earring (Silver Hoop) */}
            <circle cx="53" cy="130" r="4.5" fill="none" stroke="#e4e4e7" strokeWidth="2" />
            <circle cx="53" cy="130" r="4.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Right Ear */}
            <path
              d="M142 108 C150 108 152 124 144 132 C142 134 138 134 136 128"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3"
            />
            <path d="M146 116 C147 122 144 124 142 123" stroke="#fba76a" strokeWidth="2" strokeLinecap="round" />
            {/* Right Earring (Silver Hoop) */}
            <circle cx="147" cy="130" r="4.5" fill="none" stroke="#e4e4e7" strokeWidth="2" />
            <circle cx="147" cy="130" r="4.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Head / Face Base */}
            <path
              d="M60 92 C60 68 76 56 100 56 C124 56 140 68 140 92 C140 120 134 144 100 152 C66 144 60 120 60 92 Z"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3.5"
            />

            {/* Subtle Cheerful Cheek Blush */}
            <ellipse cx="73" cy="122" rx="7" ry="4" fill="#fb7185" fillOpacity="0.25" />
            <ellipse cx="127" cy="122" rx="7" ry="4" fill="#fb7185" fillOpacity="0.25" />

            {/* Eyebrows (Clean & Expressive) */}
            <path
              d="M70 96 C74 94 82 94 87 97"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M113 97 C118 94 126 94 130 96"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Left Eye (Expressive, No Glasses) */}
            <path
              d="M69 111 C74 106 84 106 88 111"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse cx="78.5" cy="113" rx="5.5" ry="6" fill="#18181b" />
            <circle cx="76.5" cy="111" r="2" fill="#ffffff" />
            <circle cx="80.5" cy="115" r="1" fill="#ffffff" />

            {/* Right Eye (Expressive, No Glasses) */}
            <path
              d="M112 111 C116 106 126 106 131 111"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse cx="121.5" cy="113" rx="5.5" ry="6" fill="#18181b" />
            <circle cx="119.5" cy="111" r="2" fill="#ffffff" />
            <circle cx="123.5" cy="115" r="1" fill="#ffffff" />

            {/* Minimal Anime Nose */}
            <path
              d="M99 120 C101 122 101 124 99 125"
              stroke="#ea580c"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Closed-Mouth Smile (Friendly, No Teeth Showing) */}
            <path
              d="M87 133 C94 140 106 140 113 133"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Smile Corner Accents */}
            <path d="M86 132 C86 134 88 135 89 135" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <path d="M114 132 C114 134 112 135 111 135" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

            {/* Asian Middle Part / Curtain Bangs Hair (Front Layer) */}
            {/* Center Part Line starts at x=100, parting outward */}
            <path
              d="M100 48 
                 C92 48 80 50 68 62 
                 C56 74 52 90 52 108 
                 C52 114 56 118 60 114 
                 C64 108 66 94 72 86 
                 C78 78 86 76 96 82 
                 C98 84 99 90 100 94
                 C101 90 102 84 104 82
                 C114 76 122 78 128 86
                 C134 94 136 108 140 114
                 C144 118 148 114 148 108
                 C148 90 144 74 132 62
                 C120 50 108 48 100 48 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.5"
            />

            {/* Hair Textured Highlights & Strands */}
            {/* Left flow strand */}
            <path
              d="M62 68 C72 58 84 58 95 65"
              stroke="#3f3f46"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M58 88 C66 78 76 74 88 78"
              stroke="#27272a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Right flow strand */}
            <path
              d="M138 68 C128 58 116 58 105 65"
              stroke="#3f3f46"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M142 88 C134 78 124 74 112 78"
              stroke="#27272a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Top Hair Tufts for Texture */}
            <path
              d="M85 36 C88 28 96 28 100 34 C104 28 112 28 115 36"
              stroke="#18181b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="#18181b"
            />
            <path
              d="M65 48 C62 40 70 38 76 44"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="#18181b"
            />
            <path
              d="M135 48 C138 40 130 38 124 44"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="#18181b"
            />

            {/* Hand with Peace Sign ✌️ (Right side near cheek/shoulder) */}
            {/* Sleeve Cuff */}
            <path
              d="M150 188 L168 184 L174 200 L156 204 Z"
              fill="#27272a"
              stroke="#18181b"
              strokeWidth="3"
            />
            {/* Forearm skin into hand */}
            <path
              d="M156 186 L158 168 L170 166 L168 184 Z"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="2.5"
            />

            {/* Hand Palm base */}
            <ellipse cx="166" cy="158" rx="9" ry="8" fill="#fed7aa" stroke="#18181b" strokeWidth="3" />

            {/* Curled Ring Finger & Pinky */}
            <path
              d="M168 152 C174 153 176 160 172 164"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="2.5"
            />
            {/* Thumb holding them down */}
            <path
              d="M158 156 C162 153 167 155 168 160"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="2.5"
            />

            {/* Index Finger (Pointing up-left in V) */}
            <path
              d="M158 154 L150 132 C149 127 155 125 158 129 L165 150 Z"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Middle Finger (Pointing up-right in V) */}
            <path
              d="M165 150 L166 128 C167 123 173 124 174 129 L173 152 Z"
              fill="#fed7aa"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Finger Creases */}
            <line x1="154" y1="138" x2="157" y2="139" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="168" y1="137" x2="171" y2="138" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.button>

      {/* Victini (Right) */}
      <motion.button
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleVictiniClick}
        className="cursor-pointer p-1 rounded-xl hover:bg-zinc-900/40 transition-colors flex items-end justify-center"
        title="Victini"
      >
        <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-end justify-center">
          <Image
            src="/victini.png"
            alt="Victini"
            width={72}
            height={72}
            className="w-auto h-14 sm:h-18 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            priority
          />
        </div>
      </motion.button>
    </div>
  );
}
