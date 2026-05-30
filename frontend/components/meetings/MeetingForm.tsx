"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Type, MapPin, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";

export default function MeetingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    dateTime: "",
    description: "",
    agenda: "",
  });
  const [emailInput, setEmailInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddParticipant = () => {
    if (!emailInput) return;
    if (!emailInput.includes("@")) {
      toast.error("Format email tidak valid!");
      return;
    }
    if (participants.includes(emailInput)) {
      toast.error("Email sudah ditambahkan!");
      return;
    }
    setParticipants([...participants, emailInput]);
    setEmailInput("");
  };

  const handleRemoveParticipant = (email: string) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputDate = new Date(formData.dateTime);
    const now = new Date();
    const status = inputDate < now ? ("Selesai" as const) : ("Dijadwalkan" as const);

    const formattedDate =
      inputDate.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) + ` pukul ${inputDate.getHours()}.${inputDate.getMinutes().toString().padStart(2, "0")}`;

    const newMeeting = {
      id: Date.now().toString(),
      title: formData.title,
      location: formData.location,
      date: formattedDate,
      status: status,
      totalParticipants: participants.length + 1, // +1 untuk pemilik rapat (John)
      attendedParticipants: 0,
      hasTranscript: false,
      // SIMPAN EMAILS DI SINI AGAR DINAMIS
      invitedEmails: ["john.doe@company.com", ...participants]
    };

    const existingMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    localStorage.setItem("meetings", JSON.stringify([...existingMeetings, newMeeting]));

    toast.success("Rapat berhasil dijadwalkan!");
    setTimeout(() => router.push("/meetings"), 1000);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#120e2e]/40 border border-purple-500/10 backdrop-blur-md rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8"
    >
      {/* SECTION 1: INFORMASI UTAMA */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider border-b border-purple-950/40 pb-2">
          1. Detail Rapat
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <Type size={14} className="text-slate-500" /> Judul Rapat <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Weekly Standup Sprint"
              className="w-full px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <MapPin size={14} className="text-slate-500" /> Lokasi / Tautan Rapat <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Zoom / Ruang Rapat Lt. 3"
              className="w-full px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <Calendar size={14} className="text-slate-500" /> Jadwal & Waktu Pelaksanaan <span className="text-purple-400">*</span>
            </label>
            <input
              type="datetime-local"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all [color-scheme:dark]"
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: KONTEN & AGENDA */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider border-b border-purple-950/40 pb-2">
          2. Deskripsi & Agenda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <FileText size={14} className="text-slate-500" /> Deskripsi Singkat
            </label>
            <textarea
              rows={4}
              placeholder="Berikan gambaran ringkas mengenai topik rapat utama..."
              className="w-full px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <FileText size={14} className="text-slate-500" /> Poin-Poin Agenda
            </label>
            <textarea
              rows={4}
              placeholder="1. Pembuka&#10;2. Pembahasan Sprint 24&#10;3. Evaluasi Kendala"
              className="w-full px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: PESERTA */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider border-b border-purple-950/40 pb-2">
          3. Distribusi Undangan
        </h2>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400">Undang Peserta Rapat (Email)</label>
          <div className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddParticipant())}
              placeholder="Ketik email rekan tim kamu di sini..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#050412]/80 border border-purple-950/50 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            />
            <button
              type="button"
              onClick={handleAddParticipant}
              className="px-4 rounded-xl bg-[#08061a] border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center outline-none"
            >
              <Plus size={18} />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Tekan Enter atau klik tombol + untuk memasukkan email ke dalam list undangan.
          </p>

          {participants.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {participants.map((email) => (
                <span
                  key={email}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#7E61F2]/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs font-medium backdrop-blur-sm"
                >
                  <span>{email}</span>
                  <X
                    size={12}
                    className="cursor-pointer text-purple-400 hover:text-red-400 transition-colors"
                    onClick={() => handleRemoveParticipant(email)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS BUTTON */}
      <div className="border-t border-purple-950/40 pt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-purple-950 text-slate-400 hover:text-white hover:bg-purple-950/20 font-semibold text-sm transition-all"
        >
          Batalkan
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#7E61F2] to-[#6344E3] hover:from-[#8F75FA] hover:to-[#7254F5] text-white font-bold text-sm shadow-[0_4px_20px_rgba(126,97,242,0.3)] hover:shadow-[0_4px_25px_rgba(126,97,242,0.5)] transition-all duration-300"
        >
          Jadwalkan Pertemuan
        </button>
      </div>
    </form>
  );
}