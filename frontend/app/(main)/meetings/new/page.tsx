"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MeetingForm from "@/components/meetings/MeetingForm";

export default function NewMeetingPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#0b0a26] via-[#08061a] to-[#050412] text-white font-sans relative overflow-hidden pb-16">
      <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-[#7E61F2]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12">
        {/* BACK NAVIGATION */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6 outline-none"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Dashboard</span>
        </button>

        {/* TITLE */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-400">
            Buat Rapat Baru
          </h1>
          <p className="text-sm text-slate-400 mt-1">Sistem AI akan otomatis memproses ringkasan dan transkrip setelah rapat selesai.</p>
        </div>

        {/* ISOLATED FORM COMPONENT */}
        <MeetingForm />
      </div>
    </div>
  );
}