'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Settings,
  PlusSquare,
  Bot
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    // Advanced dark gradient background
    <div className="flex h-screen bg-[#070f12] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#102421] via-[#070f12] to-[#04080a] text-slate-200 font-sans overflow-hidden">
      
      {/* Glassmorphic Sidebar */}
      <aside className="w-[280px] flex-shrink-0 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between p-4 m-2 rounded-2xl">
        
        <div className="flex flex-col gap-6">
          {/* Logo Area */}
          <div className="flex items-center px-2 py-2">
            <Bot className="w-6 h-6 text-emerald-400 mr-3" />
            <span className="text-xl font-semibold tracking-wide text-white">SalesAI</span>
          </div>

          {/* New Chat Button (Outlined Glass) */}
          <button className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 text-emerald-400 font-medium hover:bg-emerald-500/10 transition-colors">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1 mt-2">
            <div className="text-xs font-semibold text-slate-500 mb-3 px-2 uppercase tracking-wider">Menu</div>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-900/40 text-emerald-300 font-medium border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Bottom Section */}
        <div className="space-y-3">
          {/* Upgrade Card */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <h4 className="text-sm font-medium text-white mb-1">Upgrade Plan</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get advanced AI models, unlimited queries, and custom integrations.
            </p>
            <button className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              Upgrade
            </button>
          </div>

          {/* User Profile Area */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center hover:bg-white/[0.05] transition-colors cursor-pointer">
             <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
             <div className="ml-3 flex flex-col">
                <span className="text-sm font-medium text-white">Acme Corp</span>
                <span className="text-xs text-slate-400">Team Plan</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
