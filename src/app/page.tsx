"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  HardHat, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg className="absolute w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(234,179,8,0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent z-10"
      animate={{
        top: ["0%", "100%"],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen text-zinc-900 selection:bg-yellow-500 selection:text-black overflow-hidden bg-transparent">
      <Navbar />
      <ScanLine />
      <GridPattern />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 rounded-full mb-8 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-700">AI-Powered Construction QA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-zinc-900"
          >
            CONSTRUCT WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-green-600 italic">PRECISION.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-700 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Quality Pulse is the next-generation QA platform for construction. Real-time metrics, 
            AI-driven risk assessment, and seamless compliance tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/dashboard"
              className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-xl hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white/10 backdrop-blur-[2px]">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Engineered for Excellence</h2>
            <div className="w-20 h-1 bg-yellow-500" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-yellow-600" />,
                title: "Real-time Pulse",
                description: "Monitor construction quality metrics in real-time with our advanced analytics engine."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
                title: "AI Compliance",
                description: "Groq-powered AI analyzes inspections and flags potential safety or quality risks instantly."
              },
              {
                icon: <HardHat className="w-8 h-8 text-yellow-600" />,
                title: "Field-Ready",
                description: "Optimized for mobile field reports with offline support and intuitive report generation."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-8 bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="mb-6 p-3 bg-yellow-100 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-black/5 bg-yellow-50/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Compliance Rate", value: "99.8%" },
              { label: "Inspections/Mo", value: "12k+" },
              { label: "Risk Mitigation", value: "45%" },
              { label: "Active Sites", value: "250+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-yellow-600 mb-2">{stat.value}</div>
                <div className="text-zinc-600 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 bg-white/20 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-xl">QualityPulse</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-600">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-black transition-colors">Documentation</Link>
          </div>
          <div className="text-zinc-500 text-sm">
            © 2026 QualityPulse Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
