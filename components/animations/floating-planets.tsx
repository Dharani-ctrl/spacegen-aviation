'use client';

import { motion } from 'framer-motion';

interface Planet {
  size: number;
  color: string;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

const planets: Planet[] = [
  { size: 120, color: 'from-blue-500 to-cyan-400', top: '10%', left: '10%', duration: 30, delay: 0 },
  { size: 80, color: 'from-purple-500 to-pink-400', top: '60%', left: '20%', duration: 35, delay: 2 },
  { size: 100, color: 'from-yellow-500 to-orange-400', top: '30%', left: '75%', duration: 40, delay: 4 },
  { size: 60, color: 'from-green-500 to-emerald-400', top: '70%', left: '80%', duration: 32, delay: 1 },
];

export function FloatingPlanets() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {planets.map((planet, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full"
          style={{
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            top: planet.top,
            left: planet.left,
            background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            delay: planet.delay,
            ease: 'easeInOut',
          }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${planet.color} blur-2xl`} />
        </motion.div>
      ))}
    </div>
  );
}
