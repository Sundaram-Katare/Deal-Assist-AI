import { UserButton } from "@clerk/nextjs";
import { Search, Home, MessageSquare, FileText, LayoutTemplate, BarChart2, Users, Settings } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Matching the dark navy design */}
      <aside className="w-64 bg-[#11111f] text-slate-300 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 text-white font-bold text-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-xs">AI</div>
            Sales Copilot
          </div>
          
          <nav className="px-4 space-y-2 mt-4">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#00c896] text-white rounded-xl font-medium shadow-lg shadow-purple-500/20">
              <Home size={20} /> Dashboard
            </Link>
            <Link href="/dashboard/chat" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <MessageSquare size={20} /> Chat
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <FileText size={20} /> Documents
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <LayoutTemplate size={20} /> Templates
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <BarChart2 size={20} /> Insights
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <Users size={20} /> Competitors
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
              <Settings size={20} /> Settings
            </Link>
          </nav>
        </div>

        {/* Tenant Switcher Mockup */}
        <div className="p-4 m-4 bg-grey-900 rounded-xl flex items-center gap-3 border border-white/10 cursor-pointer hover:bg-white/10 transition">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">A</div>
          <div>
            <p className="text-white text-sm font-medium">Acme Corp</p>
            <p className="text-xs text-slate-400">Team Plan</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-black backdrop-blur-md border-b px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search anything..." className="pl-10 bg-slate-100/50 border-none rounded-full focus-visible:ring-purple-500" />
            </div>
            <UserButton  />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}
