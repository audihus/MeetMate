"use client";

import { useState } from "react";
import { Video, CheckCircle2, ArrowRight } from "lucide-react";

interface CheckInPageProps {
  params: {
    token: string;
  };
}

export default function CheckInPage({ params }: CheckInPageProps) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    // Simulasi hit API Backend ntar
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Mini Header */}
      <header className="border-b border-gray-800/60 bg-[#0B0F19]/50 backdrop-blur-md py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#7E61F2] to-[#1D008C] flex items-center justify-center">
            <Video size={12} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-gray-300">MeetMate Presence</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#111625] border border-gray-800/80 rounded-2xl p-8 shadow-xl relative z-10">
          {!submitted ? (
            <>
              {/* Form Presensi */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  Public Access
                </span>
                <h2 className="text-xl font-bold mt-3 text-white">Konfirmasi Kehadiran Rapat</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Silakan isi nama Anda untuk bergabung ke dalam daftar presensi MeetMate.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama sesuai kartu identitas"
                    className="w-full bg-[#080B13] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Instansi / Perusahaan (Opsional)</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Contoh: Universitas Dian Nuswantoro"
                    className="w-full bg-[#080B13] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition"
                  />
                </div>

                {/* Token Tracker Hidden/Info Note */}
                <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-3 text-[11px] text-gray-500 font-mono">
                  Room Token ID: {params.token.substring(0, 12)}...
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Check In Sekarang <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Sukses State */
            <div className="text-center py-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-lg font-bold text-white">Presensi Berhasil Dicatat!</h3>
              <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
                Terima kasih, <span className="text-indigo-400 font-medium">{name}</span>. Kehadiran Anda telah sukses direkam ke dalam sistem MeetMate.
              </p>
              <div className="text-xs text-gray-500 mt-6 pt-6 border-t border-gray-800/60 w-full">
                Anda sekarang bisa menutup tab halaman ini dengan aman.
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Ramping Footer */}
      <footer className="py-4 text-center text-[11px] text-gray-600 border-t border-gray-900">
        © {new Date().getFullYear()} MeetMate Platform. All rights reserved.
      </footer>
    </div>
  );
}