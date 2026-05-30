"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, FileCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingCardProps {
  id: string;
  title: string;
  status: "Dijadwalkan" | "Selesai" | "Dibatalkan";
  date: string;
  location: string;
  totalParticipants: number;
  attendedParticipants: number;
  hasTranscript: boolean;
}

export default function MeetingCard({
  id,
  title,
  status,
  date,
  location,
  totalParticipants,
  hasTranscript,
}: MeetingCardProps) {
  return (
    <div className="bg-[#120e2e]/40 border border-purple-500/10 backdrop-blur-md rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 group">
      <div className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase",
              status === "Dijadwalkan" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
              status === "Selesai" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
              status === "Dibatalkan" && "bg-red-500/10 text-red-400 border border-red-500/20"
            )}
          >
            {status}
          </span>
          {hasTranscript && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
              <FileCheck size={10} /> AI Ready
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-[#8F75FA] transition-colors">
          {title}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 text-xs text-slate-400 font-normal">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-slate-500" />
            <span className="line-clamp-1">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-slate-500" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={13} className="text-slate-500" />
            <span>{totalParticipants} Peserta Terundang</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t border-purple-950/40 mt-5 pt-4">
        <Link
          href={`/meetings/${id}`}
          className="flex items-center justify-between text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors w-full"
        >
          <span>Lihat Detail Notulensi</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}