"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { createInspection } from "./actions";
import {
  ArrowLeft,
  Send,
  Sparkles,
  ShieldAlert,
  Loader2,
  HardHat,
  User,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function NewInspectionForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    riskLevel: string;
    issueType: string;
    recommendation: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inspector, setInspector] = useState("");

  const handleAnalyze = async () => {
    if (!title || !description) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze");
      }
      
      setAiResult(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An unexpected error occurred during AI analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

    return (
      <div className="min-h-screen text-zinc-900">
        <Navbar />
  
        <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-black transition-colors mb-8 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
  
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-2 text-zinc-900">
              New Quality Inspection
            </h1>
            <p className="text-zinc-600 font-medium">
              Record field findings and get instant AI-powered risk assessment.
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Side */}
            <form action={createInspection} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Inspection Title
                </label>
                <div className="relative">
                  <HardHat className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., HVAC Duct Leakage Test"
                    className="w-full bg-white/40 border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-500 transition-all text-sm font-medium shadow-sm"
                    required
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Inspector Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    name="inspector"
                    value={inspector}
                    onChange={(e) => setInspector(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full bg-white/40 border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-500 transition-all text-sm font-medium shadow-sm"
                    required
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Detailed Findings
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the observation, including location and specific details..."
                  className="w-full bg-white/40 border border-black/5 rounded-2xl py-4 px-4 min-h-[150px] focus:outline-none focus:border-yellow-500 transition-all text-sm font-medium resize-none shadow-sm"
                  required
                />
              </div>
  
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Initial Score (0-100)
                </label>
                <input
                  name="score"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="100"
                  className="w-full bg-white/40 border border-black/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-yellow-500 transition-all text-sm font-medium shadow-sm"
                  required
                />
              </div>
  
              {/* Hidden AI inputs for server action */}
              <input
                type="hidden"
                name="aiSeverity"
                value={aiResult?.riskLevel || ""}
              />
              <input
                type="hidden"
                name="aiSuggestion"
                value={aiResult?.recommendation || ""}
              />
  
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !title || !description}
                  className="flex-1 bg-black/5 hover:bg-black/10 border border-black/5 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-zinc-800"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-600" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  )}
                  Run AI Pulse Analysis
                </button>
  
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Save Inspection
                </button>
              </div>
            </form>
  
            {/* AI Output Side */}
            <div className="bg-white/40 border border-white/40 rounded-3xl p-8 h-fit min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-md shadow-sm">
              <AnimatePresence mode="wait">
                {aiResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-left w-full"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-yellow-500/20 rounded-2xl">
                        <Sparkles className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-zinc-900">AI Pulse Analysis</h3>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                          Real-time Insight
                        </p>
                      </div>
                    </div>
  
                        <div className="space-y-4">
                          <p className="text-sm font-bold text-zinc-800">
                            Risk Level: <span className={
                              aiResult.riskLevel.toLowerCase() === "critical"
                                ? "text-red-600"
                                : aiResult.riskLevel.toLowerCase() === "high"
                                ? "text-orange-600"
                                : "text-yellow-600"
                            }>{aiResult.riskLevel}</span>
                          </p>
  
                          <p className="text-sm font-bold text-zinc-800">
                            Issue Type: <span className="text-zinc-600 font-medium">{aiResult.issueType}</span>
                          </p>
  
                          <div className="pt-2">
                            <p className="text-sm font-bold text-zinc-800 mb-1">Recommendation:</p>
                            <p className="text-sm text-zinc-700 leading-relaxed bg-white/40 p-4 rounded-2xl border border-black/5 font-medium">
                              {aiResult.recommendation}
                            </p>
                          </div>
                        </div>
  
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-black/5">
                      <Sparkles className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">AI Assistant Idle</h3>
                    <p className="text-zinc-600 text-sm max-w-[250px] font-medium">
                      Fill out the findings and click "Run AI Pulse Analysis" to
                      get expert insights.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
  
              {/* Decorative Background for AI Side */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full -z-10" />
            </div>
          </div>
        </main>
      </div>
    );
}
