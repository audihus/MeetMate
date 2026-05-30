"use client";

import React from "react";
import { CheckCircle2, Square, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Interface disamakan dengan struktur global agar serasi
interface ActionItem {
  id: string | number;
  task: string;
  assignee: string;
  dueDate?: string; // Menambahkan opsional tenggat waktu
  status: "Aktif" | "Terlambat" | "Selesai"; // Menambahkan status Terlambat
  priority: "Tinggi" | "Sedang";
}

interface ActionItemListProps {
  items: ActionItem[];
  onToggle: (id: string | number) => void; // Mengubah tipe id agar menerima string
}

export default function ActionItemList({ items, onToggle }: ActionItemListProps) {
  // Fungsi pembantu format tanggal ringan khusus komponen internal
  const formatShortDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={cn(
            "flex items-start gap-3.5 p-4 border border-white/5 rounded-xl cursor-pointer transition bg-white/[0.01]",
            item.status === "Selesai" ? "bg-black/20 opacity-50" : "hover:bg-white/5 hover:border-white/10"
          )}
        >
          {/* Icon Indikator */}
          {item.status === "Selesai" ? (
            <CheckCircle2 className="text-emerald-400 mt-0.5 shrink-0" size={18} />
          ) : (
            <Square className={cn("mt-0.5 shrink-0", item.status === "Terlambat" ? "text-rose-400/40" : "text-purple-400/40")} size={18} />
          )}

          {/* Konten Teks */}
          <div className="flex-1 min-w-0">
            <p className={cn("text-xs font-semibold text-slate-200 truncate", item.status === "Selesai" && "line-through text-slate-500")}>
              {item.task}
            </p>

            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><Users size={11} /> {item.assignee}</span>
              {item.dueDate && (
                <span className="flex items-center gap-1"><Clock size={11} /> {formatShortDate(item.dueDate)}</span>
              )}
            </div>
          </div>

          {/* Badge Badge Status & Prioritas */}
          <div className="flex items-center gap-2 shrink-0">
            {item.status === "Terlambat" && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded">
                Terlambat
              </span>
            )}
            <span className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded border",
              item.priority === "Tinggi" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
            )}>
              {item.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}