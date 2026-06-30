"use client";

import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, Zap, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const pieData = [
  { name: "Product Info", value: 42, color: "#6366f1" },
  { name: "Pricing", value: 22, color: "#8b5cf6" },
  { name: "Competitors", value: 18, color: "#a855f7" },
  { name: "Case Studies", value: 12, color: "#d946ef" },
  { name: "Other", value: 6, color: "#64748b" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Documents", value: "128", trend: "+12 this week", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
          { title: "Chats This Week", value: "342", trend: "+18%", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Answers Generated", value: "1,248", trend: "+24%", icon: Zap, color: "text-indigo-600", bg: "bg-indigo-100" },
          { title: "Team Members", value: "16", trend: "+2 new", icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <div className={`p-2 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-sm text-emerald-500 font-medium mt-1">{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Chats */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Chats</h3>
            <button className="text-sm text-purple-600 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Compare us with HubSpot", time: "Today", icon: MessageSquare },
              { title: "Generate proposal for a logistics company", time: "Today", icon: MessageSquare },
              { title: "How do we handle pricing objections?", time: "Yesterday", icon: Users },
              { title: "Prepare for demo with Acme Inc.", time: "Yesterday", icon: Users },
            ].map((chat, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-purple-100 group-hover:text-purple-600 transition">
                    <chat.icon size={16} />
                  </div>
                  <p className="font-medium text-slate-700">{chat.title}</p>
                </div>
                <span className="text-sm text-slate-400">{chat.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut Chart */}
        <Card className="p-6 border-none shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Document Categories</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((entry, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600">{entry.name}</span>
                </div>
                <span className="font-medium text-slate-800">{entry.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
