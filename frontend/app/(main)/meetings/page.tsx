"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Plus, ChevronDown } from "lucide-react";
import MeetingCard from "@/components/meetings/MeetingCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const INITIAL_MEETINGS = [
  {
    id: "1",
    title: "Weekly Standup Meeting - Sprint 24",
    status: "Dijadwalkan" as const,
    date: "Jumat, 20 Desember 2024 pukul 16.00",
    location: "Ruang Meeting Lantai 3",
    totalParticipants: 8,
    attendedParticipants: 0,
    hasTranscript: false,
  },
];

export default function MeetingsDashboard() {
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua Status");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    setMeetings([...INITIAL_MEETINGS, ...savedMeetings]);
    setIsLoaded(true);
  }, []);

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "Semua Status" || meeting.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  if (!isLoaded) return null;

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#0b0a26] via-[#08061a] to-[#050412] text-white font-sans relative overflow-hidden pb-12">
      <div className="absolute top-[-10%] left-[-5%] w-[900px] h-[900px] bg-[#7E61F2]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-purple-950/20 rounded-full blur-[130px] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10 space-y-10">
        {/* HEADER SECTION */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-400">
            Selamat datang, John!
          </h1>
          <p className="text-sm text-slate-400">Kelola dan tinjau riwayat rapat pintar Anda dengan mudah.</p>
        </div>

        {/* UTILITY BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#120e2e]/40 p-4 rounded-2xl border border-purple-500/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Cari rapat berdasarkan nama atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#08061a]/90 border border-purple-500/20 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#08061a]/90 border border-purple-500/20 text-sm font-semibold text-slate-300 hover:text-white hover:border-purple-500/40 transition-all outline-none">
                <Filter size={16} className="text-purple-400" />
                <span>{statusFilter}</span>
                <ChevronDown size={14} className="opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#120e2e] border border-purple-950/60 text-slate-200 rounded-xl shadow-2xl p-1 min-w-[160px]">
                {["Semua Status", "Dijadwalkan", "Selesai", "Dibatalkan"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="rounded-lg px-3 py-2 text-sm focus:bg-purple-600 focus:text-white cursor-pointer transition-colors"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/meetings/new"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#7E61F2] to-[#6344E3] hover:from-[#8F75FA] hover:to-[#7254F5] text-sm font-bold text-white shadow-[0_4px_20px_rgba(126,97,242,0.3)] hover:shadow-[0_4px_25px_rgba(126,97,242,0.5)] transition-all duration-300"
            >
              <Plus size={16} />
              <span>Buat Meeting Baru</span>
            </Link>
          </div>
        </div>

        {/* LIST CARDS GRID */}
        {filteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} {...meeting} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#120e2e]/20 rounded-2xl border border-dashed border-purple-950/30">
            <p className="text-slate-500 text-sm">Tidak ada jadwal rapat yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </main>
    </div>
  );
}