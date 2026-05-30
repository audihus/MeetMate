"use client";

import React from "react";
import { CheckCircle2, XCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParticipantAttendance {
  name: string;
  email: string;
  status: "Hadir" | "Tidak Hadir";
}

interface AttendanceTableProps {
  participants: ParticipantAttendance[];
}

export default function AttendanceTable({ participants }: AttendanceTableProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header Kecil */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Status Kehadiran
        </h3>
        <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-md text-purple-400 font-mono">
          {participants.filter(p => p.status === "Hadir").length}/{participants.length} Hadir
        </span>
      </div>

      {/* List Style (Bukan tabel lebar lagi agar pas di kolom kiri) */}
      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border",
                participant.status === "Hadir"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              )}>
                <User size={12} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{participant.name}</p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{participant.email}</p>
              </div>
            </div>

            {/* Status Badge Ringkas */}
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide border shrink-0",
              participant.status === "Hadir"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            )}>
              {participant.status === "Hadir" ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
              {participant.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}