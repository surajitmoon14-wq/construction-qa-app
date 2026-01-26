"use client";

import { motion } from "framer-motion";

export default function YellowOrbit() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.15) 0%, rgba(234,179,8,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-20%", "120%", "-20%"],
          y: ["-20%", "80%", "120%", "-20%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: ["110%", "-10%", "110%"],
          y: ["110%", "20%", "-10%", "110%"],
          scale: [0.8, 1.1, 0.9, 0.8],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
