"use client";

import { motion, useReducedMotion } from "framer-motion";

/** One wave period width; paths use 2 periods for seamless horizontal loop. */
const WAVE_WIDTH = 800;

/** Full-screen fixed SVG waves: 3 horizontal waves, subtle fill, blur, infinite x + gentle y. */
export function FlowingWavesBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      aria-hidden
    >
      <div className="h-full w-full blur-3xl">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${WAVE_WIDTH * 2} 400`}
          preserveAspectRatio="none"
        >
          {/* Wave 1: long wavelength, top — path repeats at 800 for seamless loop */}
          <motion.g
            fill="rgb(248 250 252)"
            style={{ opacity: 0.05 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -WAVE_WIDTH],
                    y: [0, 4, -3, 0],
                  }
            }
            transition={{
              x: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path d="M 0,0 L 800,0 L 800,180 Q 600,220 400,180 Q 200,140 0,180 Z M 800,0 L 1600,0 L 1600,180 Q 1400,220 1200,180 Q 1000,140 800,180 Z" />
          </motion.g>
          {/* Wave 2: medium wavelength, middle */}
          <motion.g
            fill="rgb(241 245 249)"
            style={{ opacity: 0.04 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -WAVE_WIDTH],
                    y: [0, -2, 3, 0],
                  }
            }
            transition={{
              x: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path d="M 0,120 Q 200,80 400,120 Q 600,160 800,120 L 800,280 Q 600,320 400,280 Q 200,240 0,280 Z M 800,120 Q 1000,80 1200,120 Q 1400,160 1600,120 L 1600,280 Q 1400,320 1200,280 Q 1000,240 800,280 Z" />
          </motion.g>
          {/* Wave 3: shorter wavelength, bottom */}
          <motion.g
            fill="rgb(248 250 252)"
            style={{ opacity: 0.06 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -WAVE_WIDTH],
                    y: [0, 3, -2, 0],
                  }
            }
            transition={{
              x: { duration: 15, repeat: Infinity, ease: "linear" },
              y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path d="M 0,220 Q 200,160 400,220 Q 600,280 800,220 L 800,400 L 0,400 Z M 800,220 Q 1000,160 1200,220 Q 1400,280 1600,220 L 1600,400 L 800,400 Z" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
