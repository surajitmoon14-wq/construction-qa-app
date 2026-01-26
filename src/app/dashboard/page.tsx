import { db } from "@/lib/db";
import { inspections, pulseMetrics, issues } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import PulseChart from "@/components/PulseChart";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const allInspections = await db.select().from(inspections).orderBy(desc(inspections.date));
  const recentIssues = await db.select().from(issues).limit(5).orderBy(desc(issues.createdAt));
  const metrics = await db.select().from(pulseMetrics).orderBy(pulseMetrics.date);

  const stats = [
    { label: "Avg. Quality Score", value: "88%", icon: <TrendingUp className="text-emerald-500" />, trend: "+2.4%" },
    { label: "Open Issues", value: recentIssues.length.toString(), icon: <AlertTriangle className="text-yellow-500" />, trend: "-12%" },
    { label: "Compliance Rate", value: "94.2%", icon: <CheckCircle2 className="text-blue-500" />, trend: "+0.8%" },
    { label: "Pending Tasks", value: "18", icon: <Clock className="text-zinc-500" />, trend: "5 new" },
  ];

  const chartData = metrics.map(m => ({
    name: m.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: m.avgScore,
    issues: m.issueCount,
  }));

  return (
    <div className="min-h-screen text-zinc-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 text-zinc-900">Project Command Center</h1>
            <p className="text-zinc-600 font-medium">Real-time quality monitoring for Skyline Tower Phase 1</p>
          </div>
          <Link 
            href="/inspections/new"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Inspection
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/40 border border-white/40 p-6 rounded-3xl backdrop-blur-md shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-yellow-100 rounded-xl">{stat.icon}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-600' : 'bg-zinc-500/20 text-zinc-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-black mb-1 text-zinc-900">{stat.value}</div>
              <div className="text-zinc-600 text-sm font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pulse Chart */}
          <div className="lg:col-span-2 bg-white/40 border border-white/40 p-8 rounded-3xl backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Quality Pulse</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">7-Day Trend Analysis</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-xs text-zinc-600 font-bold">Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-zinc-600 font-bold">Issues</span>
                </div>
              </div>
            </div>
            
            <PulseChart data={chartData} />
          </div>

          {/* Recent Issues List */}
          <div className="bg-white/40 border border-white/40 p-8 rounded-3xl backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-zinc-900">Critical Issues</h3>
              <button className="text-zinc-500 hover:text-black transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex gap-4 group cursor-pointer">
                  <div className={`p-2 rounded-xl h-fit ${issue.severity === 'high' ? 'bg-red-500/20 text-red-600' : 'bg-yellow-500/20 text-yellow-600'}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm group-hover:text-yellow-600 transition-colors text-zinc-800">{issue.description}</h4>
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1 font-medium">{issue.aiSuggestion}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/5 text-zinc-600">
                        {issue.severity}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-bold">
                        {issue.createdAt?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-white/20 hover:bg-white/40 rounded-xl text-sm font-bold transition-all border border-black/5 text-zinc-700">
              View All Issues
            </button>
          </div>
        </div>

        {/* Recent Inspections Table-like List */}
        <div className="mt-8 bg-white/40 border border-white/40 rounded-3xl overflow-hidden backdrop-blur-md shadow-sm">
          <div className="p-8 border-b border-black/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-zinc-900">Recent Inspections</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-zinc-600 cursor-pointer hover:bg-white/60">All</span>
              <span className="px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-zinc-600 cursor-pointer hover:bg-white/60">Completed</span>
              <span className="px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-zinc-600 cursor-pointer hover:bg-white/60">Flagged</span>
            </div>
          </div>
          
          <div className="divide-y divide-black/5">
            {allInspections.map((insp) => (
              <div key={insp.id} className="p-6 hover:bg-white/40 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-zinc-800">{insp.title}</h4>
                    {insp.status === 'completed' ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">Pass</span>
                    ) : (
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded-full font-black uppercase">Review</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 italic font-medium">Inspected by {insp.inspector}</p>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Score</div>
                    <div className={`text-xl font-black ${insp.score! > 80 ? 'text-emerald-600' : 'text-yellow-600'}`}>{insp.score}</div>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Date</div>
                    <div className="text-sm font-bold text-zinc-700">{insp.date.toLocaleDateString()}</div>
                  </div>
                  <button className="p-2 hover:bg-white/40 rounded-lg transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
