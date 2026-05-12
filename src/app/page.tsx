"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Spline from '@splinetool/react-spline';
import { resumeData } from "@/lib/data";


export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative transition-colors duration-300 overflow-x-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />

      {/* Theme Toggle */}
      {bootComplete && (
        <button 
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 border border-[var(--border-color)] bg-[var(--card-bg)] rounded-full hover:border-green-500 transition-all shadow-lg backdrop-blur-md group"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:rotate-45 transition-transform"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:-rotate-12 transition-transform"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      )}

      {!bootComplete ? (
        <div className="h-screen flex items-center justify-center relative z-10">
          <TerminalBoot />
        </div>
      ) : (
        <div className="relative z-10">
          <HeroSection />

          {/* Phase 3: Project Modules */}
          <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
            {resumeData.projects.map((project: any, index: number) => (
              <ProjectBlueprint
                key={index}
                title={project.title}
                description={project.description}
                hardware={project.hardware}
                software={project.software}
                assetType={project.assetType}
                splineUrl={project.splineUrl}
                imageUrl={project.imageUrl}
                isImageRight={project.assetType === "3d"} // 3D on right, Image on left
              />
            ))}

            <div className="pt-24 pb-32">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-wide">System Architect Gateway</h2>
                <p className="text-gray-500 font-mono text-sm mt-2">Initialize handshake protocol to access credentials.</p>
              </div>
              <TerminalNode />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Module 1: The Boot Sequence
function TerminalBoot() {
  return (
    <div className="font-mono text-green-500 text-lg w-full max-w-2xl p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}><p>{"> ./initialize_systems.sh"}</p></motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.2 }}><p>{"> Loading ROS environments..."}</p></motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.2 }}><p>{"> Establishing AWS cloud uplink..."}</p></motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.2 }}><p>{"> Boot sequence complete."}</p></motion.div>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-3 h-5 bg-green-500 mt-2" />
    </div>
  );
}

// Module 2: The Hero Reveal
function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[var(--foreground)]">
        The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Bright.</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed font-mono">
        {resumeData.personalInfo.tagline}
      </p>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-gray-500 font-mono text-sm tracking-widest uppercase"
      >
        Scroll to view system architecture ↓
      </motion.div>
    </motion.div>
  );
}

// Module 3: The Reusable Blueprint Layout
function ProjectBlueprint({ title, description, hardware, software, assetType, splineUrl, imageUrl, isImageRight }: any) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 ${isImageRight ? 'lg:flex-row-reverse' : ''}`}>

      {/* Visual / 3D Canvas Side */}
      <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] border border-[var(--border-color)] bg-[var(--card-bg)] rounded-lg flex items-center justify-center p-2 relative overflow-hidden group shadow-xl transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        {assetType === "3d" && splineUrl ? (
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <Spline scene={splineUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 rounded"
            />
          </div>
        ) : (
          <span className="text-gray-500 font-mono text-sm text-center border border-dashed border-gray-700 p-4 relative z-10 group-hover:border-green-500/50 transition-colors">
            [ AWAITING FEED ]
          </span>
        )}

        {/* Cyber-Industrial UI Overlays */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 font-mono text-[10px] tracking-widest uppercase opacity-70">
            {assetType === "3d" ? "Live Render" : "System Optic"}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 text-gray-500 font-mono text-[10px] uppercase pointer-events-none">
          {assetType === "3d" ? "Interactive: Drag to Rotate" : "Static Capture"}
        </div>
      </div>

      {/* Engineering Specs Side */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold tracking-wide">{title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

        <div className="space-y-4 pt-4 border-t border-[var(--border-color)] transition-colors duration-300">
          <div>
            <h3 className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-1">Hardware & Edge</h3>
            <p className="font-mono text-gray-400">{hardware}</p>
          </div>
          <div>
            <h3 className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-1">Software Architecture</h3>
            <p className="font-mono text-gray-400">{software}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


// Module 4: The Interactive CLI
function TerminalNode() {
  const [history, setHistory] = useState<{ cmd: string; output: React.ReactNode }[]>([
    { cmd: "", output: "Welcome to the Bright Sefah Network. Type a command or select a node below to begin." }
  ]);

  const commands: Record<string, string | React.ReactNode> = {
    "whoami": (
      <div className="space-y-2">
        <p className="text-[var(--foreground)] font-bold">{resumeData.personalInfo.name}</p>
        <p>{resumeData.personalInfo.title}</p>
        <div className="pt-2 border-t border-[var(--border-color)]">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Education</p>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="mt-1">
              <p className="text-gray-400">{edu.degree} @ {edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.duration}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    "ls skills": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Programming</p>
          <p className="text-gray-400 text-xs">{resumeData.skills.programming.join(", ")}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Embedded & IoT</p>
          <p className="text-gray-400 text-xs">{resumeData.skills.embeddedIoT.join(", ")}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Robotics</p>
          <p className="text-gray-400 text-xs">{resumeData.skills.robotics.join(", ")}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">AI & Data</p>
          <p className="text-gray-400 text-xs">{resumeData.skills.aiData.join(", ")}</p>
        </div>
      </div>
    ),
    "ls experience": (
      <div className="space-y-4">
        {resumeData.experience.slice(0, 3).map((exp, i) => (
          <div key={i}>
            <p className="text-gray-300 font-bold">{exp.role} @ {exp.company}</p>
            <p className="text-[10px] text-gray-500">{exp.duration}</p>
            <ul className="list-disc list-inside text-[10px] text-gray-400 mt-1">
              {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
          </div>
        ))}
        <p className="text-[10px] text-yellow-500/70 italic">... run `cat full_experience.log` for more.</p>
      </div>
    ),
    "cat honors.log": (
      <div className="space-y-1">
        {resumeData.honors.map((h, i) => (
          <p key={i} className="text-xs">
            <span className="text-green-500">[{h.year}]</span> {h.position} - {h.title}
          </p>
        ))}
      </div>
    ),
    "ls leadership": (
      <div className="space-y-1">
        {resumeData.leadership.map((l, i) => (
          <p key={i} className="text-xs">
            <span className="text-gray-500">{l.year}</span> | {l.role} @ {l.organization}
          </p>
        ))}
      </div>
    ),
    "cat full_experience.log": (
      <div className="space-y-4">
        {resumeData.experience.map((exp, i) => (
          <div key={i} className="border-l border-[var(--border-color)] pl-3">
            <p className="text-gray-300 text-xs font-bold">{exp.role} @ {exp.company}</p>
            <p className="text-[10px] text-gray-500">{exp.duration}</p>
            <ul className="list-disc list-inside text-[10px] text-gray-400 mt-1">
              {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
          </div>
        ))}
      </div>
    ),
    "wget resume.pdf": (
      <div className="text-yellow-400">
        <p>Resolving host... done.</p>
        <p>Connecting to server... connected.</p>
        <p>Downloading [===================================] 100%</p>
        <p>File saved: /public/resume.pdf</p>
      </div>
    ),
    "clear": ""
  };

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    
    if (cmd === "wget resume.pdf") {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Bright_Sefah_Intelligent_Systems.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    const output = commands[cmd] || `Command not found: ${cmd}`;
    setHistory((prev) => [...prev, { cmd, output }]);
  };

  return (
    <div className="max-w-4xl mx-auto w-full border border-[var(--border-color)] bg-[var(--terminal-bg)] rounded-lg overflow-hidden font-mono text-sm shadow-2xl transition-all duration-300">
      <div className="bg-[var(--terminal-header)] border-b border-[var(--border-color)] p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-4 text-gray-500 text-xs tracking-widest">guest@intelligent-systems:~</span>
      </div>

      <div className="p-6 h-96 overflow-y-auto space-y-4">
        {history.map((entry, index) => (
          <div key={index}>
            {entry.cmd && (
              <div className="flex gap-2 text-green-500 mb-2">
                <span>guest@intelligent-systems:~$</span>
                <span>{entry.cmd}</span>
              </div>
            )}
            <div className="text-gray-400 pl-4">{entry.output}</div>
          </div>
        ))}
        <div className="flex gap-2 text-green-500 mt-4">
          <span>guest@intelligent-systems:~$</span>
          <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
        </div>
      </div>

      <div className="bg-[var(--terminal-header)] border-t border-[var(--border-color)] p-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Available Network Commands</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(commands).filter(cmd => cmd !== "clear").map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-3 py-1 bg-[var(--card-bg)] hover:bg-[var(--border-color)] text-green-500 border border-[var(--border-color)] hover:border-green-500 rounded transition-all text-xs"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={() => handleCommand("clear")}
            className="px-3 py-1 bg-[var(--card-bg)] hover:bg-red-900/30 text-red-500 border border-[var(--border-color)] hover:border-red-500 rounded transition-all text-xs"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
