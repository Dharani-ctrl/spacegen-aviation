'use client';

import { motion } from 'framer-motion';

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030712]">

      {/* Subtle radial/orbital lines imitating the reference image */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-[800px] h-[800px] rounded-full border border-blue-900/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          className="w-[600px] h-[600px] rounded-full border border-blue-900/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          className="w-[400px] h-[400px] rounded-full border border-blue-800/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          className="w-[200px] h-[200px] rounded-full border border-blue-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-950/20"
        />

        {/* Rotating orbital trackers */}
        <motion.div
          className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#60a5fa]" />
        </motion.div>

        <motion.div
          className="w-[400px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-300 absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#93c5fd]" />
        </motion.div>
      </div>

      {/* Large faint diagonal line from the reference */}
      <div className="absolute top-0 right-1/2 w-[2px] h-[150%] bg-gradient-to-b from-transparent via-blue-900/30 to-transparent -rotate-45 transform origin-top" />

      {/* Subtle ambient glow map */}
    </div>
  );
}
