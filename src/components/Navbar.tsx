import Link from "next/link";
import { Activity, ShieldCheck, BarChart3, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-yellow-500 p-1.5 rounded-lg">
            <Activity className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">Quality<span className="text-yellow-500">Pulse</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-sm font-medium hover:text-yellow-500 transition-colors">Dashboard</Link>
          <Link href="/inspections" className="text-sm font-medium hover:text-yellow-500 transition-colors">Inspections</Link>
          <Link href="/reports" className="text-sm font-medium hover:text-yellow-500 transition-colors">Reports</Link>
        </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
              Launch App
            </Link>
          </div>
      </div>
    </nav>
  );
}
