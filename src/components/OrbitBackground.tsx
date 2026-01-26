"use client";

import { motion } from "framer-motion";

function FloatingParticle({ delay = 0, x, y, type }: { delay?: number; x: string; y: string; type: "triangle" | "square" | "circle" }) {
  const shapes = {
    triangle: "▲",
    square: "■",
    circle: "●"
  };

  return (
    <motion.div
      className="absolute text-yellow-600/10 text-2xl font-bold select-none pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, -20, 0],
        rotate: [0, 180, 360],
        opacity: [0.05, 0.2, 0.05],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      {shapes[type]}
    </motion.div>
  );
}

export default function OrbitBackground() {
  const particles = [
    { x: "10%", y: "20%", type: "triangle" as const, delay: 0 },
    { x: "85%", y: "15%", type: "square" as const, delay: 2 },
    { x: "15%", y: "80%", type: "circle" as const, delay: 4 },
    { x: "75%", y: "75%", type: "triangle" as const, delay: 1 },
    { x: "50%", y: "10%", type: "square" as const, delay: 3 },
    { x: "90%", y: "60%", type: "circle" as const, delay: 5 },
    { x: "5%", y: "45%", type: "triangle" as const, delay: 2.5 },
    { x: "40%", y: "90%", type: "square" as const, delay: 4.5 },
  ];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none" style={{ background: "radial-gradient(circle at center, #fffde7 0%, #fff176 40%, #4caf50 100%)" }}>
      {/* Center point */}
      <div 
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#ffeb3b] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_40px_rgba(255,235,59,0.8)] z-10"
      />
      
      {/* Orbit 1 */}
      <motion.div
        className="absolute top-1/2 left-1/2 border-2 border-[rgba(255,235,59,0.4)] rounded-full w-[300px] h-[300px]"
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ 
          rotate: 360,
          x: ["-50%", "-48%", "-52%", "-50%"],
          y: ["-50%", "-52%", "-48%", "-50%"]
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          },
          x: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Orbit 2 */}
      <motion.div
        className="absolute top-1/2 left-1/2 border-2 border-[rgba(76,175,80,0.3)] rounded-full w-[500px] h-[500px]"
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ 
          rotate: -360,
          x: ["-50%", "-52%", "-48%", "-50%"],
          y: ["-50%", "-48%", "-52%", "-50%"]
        }}
        transition={{
          rotate: {
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          },
          x: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Orbit 3 (Large) */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-[rgba(255,235,59,0.2)] rounded-full w-[800px] h-[800px]"
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ 
          rotate: 360,
          x: ["-50%", "-49%", "-51%", "-50%"],
          y: ["-50%", "-51%", "-49%", "-50%"]
        }}
        transition={{
          rotate: {
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          },
          x: {
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Decorative pulse for center */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#ffeb3b]/20 rounded-full"
        initial={{ x: "-50%", y: "-50%", scale: 1 }}
        animate={{ scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Ambient Light Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[150px]"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
