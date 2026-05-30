"use client";

import React from "react";
import { Mail, UserCheck } from "lucide-react";

interface ParticipantListProps {
  emails: string[];
}

export default function ParticipantList({ emails }: ParticipantListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <UserCheck size={14} className="text-purple-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Daftar Undangan ({emails.length})
        </h3>
      </div>

      <div className="max-h-[180px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition"
            >
              <Mail size={12} className="text-slate-500" />
              <span className="text-xs text-slate-300 font-mono truncate">{email}</span>
            </div>
          ))
        ) : (
          <p className="text-xs italic text-slate-500">Tidak ada peserta yang diundang.</p>
        )}
      </div>
    </div>
  );
}