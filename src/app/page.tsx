"use client";
// import { JSX } from "react";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Spline from '@splinetool/react-spline';


export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Global Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {!bootComplete ? (
        <div className="h-screen flex items-center justify-center relative z-10">
          <TerminalBoot />
        </div>
      ) : (
        <div className="relative z-10">
          <HeroSection />

          {/* Phase 3: Project Modules */}
          <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">

            <ProjectBlueprint
              title="AIEAR: Autonomous Indoor Emergency Aid Robot"
              description="Rapid, reliable autonomous navigation for critical indoor response. Engineered to navigate complex environments without human intervention."
              hardware="Custom PLA chassis (Ender 3), integrated sensor array, real-time compute units."
              software="ROS, C++, Python, Nav2 (Dynamic path planning & obstacle avoidance)."
              splineUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" // <-- The live 3D feed
              isImageRight={false}
            />

            <ProjectBlueprint
              title="Orcta Trace: IoT Fleet Management"
              description="Real-time tracking, ledger management, and distributed system orchestration for sustainable transport networks."
              hardware="ESP32 & Arduino edge nodes, high-frequency telemetry transmitters."
              software="AWS Infrastructure, MQTT, C++, Systemd deployment orchestration."
              visualPlaceholder="[ SIMULATED TERMINAL: LIVE TELEMETRY FEED ]"
              isImageRight={true}
            />

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

// Module 1: The Boot Sequence (Unchanged)
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

// Module 2: The Hero Reveal (Adjusted for scrolling)
function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
        The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Bright.</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed font-mono">
        Architecting the bridge between embedded hardware, cloud infrastructure, and autonomous robotics—<br className="hidden md:block" />for Africa, by an African.
      </p>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-gray-600 font-mono text-sm tracking-widest uppercase"
      >
        Scroll to view system architecture ↓
      </motion.div>
    </motion.div>
  );
}

// Module 3: The Reusable Blueprint Layout
// Module 3: The Reusable Blueprint Layout (Upgraded with Spline)
function ProjectBlueprint({ title, description, hardware, software, visualPlaceholder, splineUrl, isImageRight }: any) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 ${isImageRight ? 'lg:flex-row-reverse' : ''}`}>

      {/* Visual / 3D Canvas Side */}
      <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] border border-gray-800 bg-gray-900/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Logic: If there is a Spline URL, render the 3D model. If not, show the text placeholder. */}
        {splineUrl ? (
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <Spline scene={splineUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : (
          <span className="text-gray-600 font-mono text-sm text-center border border-dashed border-gray-700 p-4 relative z-10 group-hover:border-green-500/50 transition-colors">
            {visualPlaceholder}
          </span>
        )}

        {/* Cyber-Industrial UI Overlays */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 font-mono text-[10px] tracking-widest uppercase opacity-70">Live Canvas</span>
        </div>
        <div className="absolute bottom-4 right-4 text-gray-700 font-mono text-[10px] uppercase pointer-events-none">
          {splineUrl ? "Interactive: Drag to Rotate" : "Awaiting Feed"}
        </div>
      </div>

      {/* Engineering Specs Side */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold tracking-wide">{title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

        <div className="space-y-4 pt-4 border-t border-gray-800">
          <div>
            <h3 className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-1">Hardware & Edge</h3>
            <p className="font-mono text-gray-300">{hardware}</p>
          </div>
          <div>
            <h3 className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-1">Software Architecture</h3>
            <p className="font-mono text-gray-300">{software}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


// Module 4: The Interactive CLI (About & Contact)
function TerminalNode() {
  // This state array acts as our memory buffer for the terminal output
  const [history, setHistory] = useState<{ cmd: string; output: React.ReactNode }[]>([
    { cmd: "", output: "Welcome to the Bright Sefah Network. Type a command or select a node below to begin." }
  ]);

  // The database of available commands
  const commands: Record<string, string | React.ReactNode> = {
    "whoami": (
      <div className="space-y-1">
        <p>Bright Sefah.</p>
        <p>Role: 4th-Year Computer Science & Engineering Student (UMaT).</p>
        <p>Certifications: AWS Certified Cloud Practitioner.</p>
        <p>Status: Architecting intelligent systems that bridge software and the physical world.</p>
      </div>
    ),
    "cat tech_stack.json": (
      <pre className="text-gray-300">
        {`{
  "Software & Logic": ["C++", "Python", "ROS / Nav2"],
  "Cloud & Infrastructure": ["AWS", "Systemd", "Linux Administration"],
  "Hardware & Edge": ["ESP32", "Raspberry Pi", "IoT Telemetry"],
  "Prototyping": ["Creality Ender 3", "PLA Fabrication"]
}`}
      </pre>
    ),
    "history | grep leadership": (
      <div className="space-y-1">
        <p>[1] Robotics Lead @ Orcta Technologies</p>
        <p>[2] President @ Aaenics-UMaT</p>
        <p>[3] Vice Chair @ IEEE Region 8 Student Branch (UMaT Chapter)</p>
        <p>[4] International Mentor @ World Robotics Olympiad (WRO)</p>
      </div>
    ),
    "wget resume.pdf": (
      <div className="text-yellow-400">
        <p>Resolving host... done.</p>
        <p>Connecting to server... connected.</p>
        <p>Downloading [===================================] 100%</p>
        <p>File saved.</p>
      </div>
    ),
    "clear": ""
  };

  // The execution handler
  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    
    // Intercept the wget command to trigger the actual file download
    if (cmd === "wget resume.pdf") {
      const link = document.createElement("a");
      link.href = "/resume.pdf"; // This looks in the public folder
      link.download = "Bright_Sefah_Intelligent_Systems.pdf"; // The name the file saves as on their computer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    const output = commands[cmd] || `Command not found: ${cmd}`;
    // Append the new command and output to the memory buffer
    setHistory((prev) => [...prev, { cmd, output }]);
  };

  return (
    <div className="max-w-4xl mx-auto w-full border border-gray-800 bg-black rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-4 text-gray-500 text-xs tracking-widest">guest@intelligent-systems:~</span>
      </div>

      {/* Terminal Display */}
      <div className="p-6 h-96 overflow-y-auto space-y-4">
        {history.map((entry, index) => (
          <div key={index}>
            {entry.cmd && (
              <div className="flex gap-2 text-green-500 mb-2">
                <span>guest@intelligent-systems:~$</span>
                <span>{entry.cmd}</span>
              </div>
            )}
            <div className="text-gray-300 pl-4">{entry.output}</div>
          </div>
        ))}
        {/* Blinking Cursor at the end */}
        <div className="flex gap-2 text-green-500 mt-4">
          <span>guest@intelligent-systems:~$</span>
          <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
        </div>
      </div>

      {/* Interactive Command Bay */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Available Network Commands</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(commands).map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-green-400 border border-gray-700 hover:border-green-500 rounded transition-colors text-xs"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}