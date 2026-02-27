'use client';

import { Box } from 'lucide-react';
import { motion } from 'framer-motion';

export function ManufacturingDiagram() {
    return (
        <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center my-12">
            {/* Background Radiating Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[100%] h-[100%] rounded-full border border-blue-900/40 absolute" />
                <div className="w-[75%] h-[75%] rounded-full border border-blue-800/50 absolute border-dashed opacity-50" />
                <div className="w-[50%] h-[50%] rounded-full border border-blue-700/50 absolute" />
            </div>

            {/* Central 3D Box Card */}
            <div className="relative z-10 w-48 h-48 rounded-[2rem] bg-[#080d1f]/90 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                {/* Glowing Horizontal Line Behind Box */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#60a5fa] -translate-y-1/2" />

                {/* React Icon Drop Shadow */}
                <div className="relative z-10 filter drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]">
                    <Box className="w-24 h-24 text-blue-400" strokeWidth={1.5} />
                </div>
            </div>

            {/* Floating Badges */}
            <motion.div
                className="absolute top-[10%] right-[5%] md:-right-[10%] bg-[#080d1f] border border-blue-800/60 rounded-lg px-4 py-2 shadow-[0_0_15px_rgba(30,58,138,0.5)] backdrop-blur-md"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-blue-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Assembly: Nose Cone</span>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-[10%] left-[0%] md:-left-[15%] bg-[#080d1f] border border-blue-800/60 rounded-lg px-4 py-2 shadow-[0_0_15px_rgba(30,58,138,0.5)] backdrop-blur-md"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-blue-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Payload Fairing: LSLV</span>
                </div>
            </motion.div>
        </div>
    );
}
