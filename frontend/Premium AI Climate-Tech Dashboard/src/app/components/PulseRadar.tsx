import { motion } from 'motion/react';

export function PulseRadar() {
  return (
    <div className="relative flex h-32 items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute size-28 rounded-full border-2 border-teal-500/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        {/* Middle pulse ring */}
        <motion.div
          className="absolute size-28 rounded-full border-2 border-emerald-500/40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.4,
          }}
        />
        {/* Inner pulse ring */}
        <motion.div
          className="absolute size-28 rounded-full border-2 border-teal-400/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.8,
          }}
        />
        {/* Center dot */}
        <div className="relative z-10 size-3 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg shadow-teal-500/50">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <p className="text-xs text-slate-500">Scanning environment</p>
      </div>
    </div>
  );
}
