"use client";

import { motion } from "motion/react";
import { sounds } from "../utils/audio";
import { FolderSimple } from "@phosphor-icons/react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  isUpcoming?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "ham",
    title: "HAM",
    description: "Check out teamham! HAM is a group of friends who make things on the internet.",
    url: "https://teamham.world/",
    isUpcoming: false,
  },
  {
    id: "project-2",
    title: "To be continued...",
    description: "New creation in development. Stay tuned for updates.",
    isUpcoming: true,
  },
  {
    id: "project-3",
    title: "To be continued...",
    description: "Future internet experiment and collaborative project.",
    isUpcoming: true,
  },
  {
    id: "project-4",
    title: "To be continued...",
    description: "Another exciting concept currently in the works.",
    isUpcoming: true,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-8 sm:py-16 px-4 sm:px-6 w-full max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-zinc-400 mb-2.5 sm:mb-3 font-mono text-xs uppercase tracking-wider">
          <FolderSimple size={16} className="text-zinc-300" />
          <span>Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Projects:
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {PROJECTS.map((project) => {
          if (!project.isUpcoming && project.url) {
            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="h-full rounded-2xl bg-zinc-950 p-5 sm:p-8 flex flex-col justify-between border border-zinc-800/80 group-hover:border-zinc-600 transition-all cursor-pointer block min-h-[170px] sm:min-h-[190px] shadow-lg active:scale-[0.99]"
                >
                  <div>
                    <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2 sm:mb-2.5 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="text-zinc-300 group-hover:text-white transition-colors">teamham.world</span>
                    <span>Visit website &rarr;</span>
                  </div>
                </a>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-full rounded-2xl bg-zinc-950/70 p-5 sm:p-8 flex flex-col justify-between border border-zinc-800/60 min-h-[170px] sm:min-h-[190px] shadow-md">
                <div>
                  <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-400 mb-2 sm:mb-2.5 font-mono italic">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-zinc-900/60 flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span>waiting</span>
                  <span>Coming soon</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}