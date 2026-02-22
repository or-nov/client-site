"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobTransition = {
  duration: 25,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "reverse" as const,
};

/** Full-screen fixed aurora: 2–3 blurred blobs, slow floating animation. */
export function GlobalAnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Blob 1: light gray-blue */}
      <motion.div
        className="absolute h-[50rem] w-[50rem] rounded-full opacity-20 blur-[100px] md:h-[60rem] md:w-[60rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 210, 230, 0.5) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 80, -40, 0],
                y: [0, -60, 40, 0],
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={blobTransition}
      />
      {/* Blob 2: faint silver / off-white */}
      <motion.div
        className="absolute h-[45rem] w-[45rem] rounded-full opacity-25 blur-[100px] md:h-[55rem] md:w-[55rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 242, 248, 0.6) 0%, transparent 70%)",
          right: "5%",
          bottom: "15%",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -70, 50, 0],
                y: [0, 50, -30, 0],
                scale: [1, 0.97, 1.03, 1],
              }
        }
        transition={{ ...blobTransition, duration: 28 }}
      />
      {/* Blob 3: soft gray-blue accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px] md:h-[50rem] md:w-[50rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(180, 190, 220, 0.4) 0%, transparent 70%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 60, -40, 0],
                y: [0, -50, 40, 0],
                scale: [1, 1.02, 0.99, 1],
              }
        }
        transition={{ ...blobTransition, duration: 22 }}
      />
    </div>
  );
}
