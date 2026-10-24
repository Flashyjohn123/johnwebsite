"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sounds } from "../utils/audio";
import {
  GraduationCap,
  CaretDown,
  Sparkle,
  BookOpen,
  Compass,
  Certificate,
  UsersThree,
  DeviceTabletSpeaker,
  ChatCircleText,
} from "@phosphor-icons/react";

interface QuestionnaireItem {
  id: number;
  question: string;
  tag: string;
  icon: typeof GraduationCap;
  answer: string | string[];
}

const QUESTIONS: QuestionnaireItem[] = [
  {
    id: 1,
    tag: "Grade Level & Focus",
    question: "What grade levels and core subjects do I specialize in?",
    icon: BookOpen,
    answer:
      "Kindergarten through 6th grade (K–6), with a core focus on foundational literacy, STEM problem solving, and ESL support.",
  },
  {
    id: 2,
    tag: "Teaching Philosophy",
    question: "What is my core educational philosophy in the classroom?",
    icon: Compass,
    answer:
      "Inquiry-based learning that fosters student curiosity, growth mindsets, and self-confidence through active participation.",
  },
  {
    id: 3,
    tag: "Certifications & Core Subjects",
    question: "What state educator certifications and core subjects have I completed?",
    icon: Certificate,
    answer: [
      "Pedagogy and Professional Responsibilities (PPR) EC–12",
      "TExES Core Subjects: Social Studies",
      "TExES Core Subjects: Science",
      "TExES Core Subjects: Mathematics",
    ],
  },
  {
    id: 4,
    tag: "Classroom Management",
    question: "How do I establish classroom dynamics and student rapport?",
    icon: UsersThree,
    answer:
      "Positive reinforcement, structured routines, and a collaborative, respectful team-first environment.",
  },
  {
    id: 5,
    tag: "Educational Technology",
    question: "What educational technologies and interactive media do I leverage?",
    icon: DeviceTabletSpeaker,
    answer:
      "Interactive smartboards, digital storyboards, gamified learning platforms, and modern web resources.",
  },
  {
    id: 6,
    tag: "Communication & Teamwork",
    question: "How do I maintain engagement between school, parents, and colleagues?",
    icon: ChatCircleText,
    answer:
      "Transparent progress tracking, empathetic parent communication, and active interdisciplinary teamwork.",
  },
];

export function SkillsSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    sounds.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="skills" className="relative py-8 sm:py-16 px-4 sm:px-6 w-full max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-zinc-400 mb-2.5 sm:mb-3 font-mono text-xs uppercase tracking-wider">
          <GraduationCap size={16} className="text-zinc-300" />
          <span>Pedagogy & Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Skills & Qualifications
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
          Classroom methodologies, educator certifications, and student-centered teaching standards.
        </p>
      </div>

      {/* Accordion Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {QUESTIONS.map((item) => {
          const isOpen = openId === item.id;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? "bg-zinc-950 border-zinc-700/80 shadow-xl"
                  : "bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer select-none active:bg-zinc-900/40 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div
                    className={`mt-0.5 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      isOpen
                        ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <Icon size={17} weight="fill" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 sm:mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold tracking-tight text-zinc-100 leading-snug">
                      {item.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`mt-1 p-1.5 rounded-full border border-zinc-800/80 text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-zinc-100 border-zinc-700" : ""
                  }`}
                >
                  <CaretDown size={14} weight="bold" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 border-t border-zinc-900">
                      {Array.isArray(item.answer) ? (
                        <div className="flex flex-col gap-2 pt-2.5 sm:pt-3">
                          {item.answer.map((cert, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11.5px] sm:text-xs text-zinc-200 font-medium"
                            >
                              <Sparkle size={13} className="text-emerald-400 shrink-0" weight="fill" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="pt-2.5 sm:pt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
