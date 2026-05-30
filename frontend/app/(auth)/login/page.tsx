"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Ekstrak nama otomatis dari email input (Contoh: dimas.pratama@mail.com -> Dimas Pratama)
    const emailPrefix = formData.email.split("@")[0];
    const generatedName = emailPrefix
      .split(/[._-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // 2. Siapkan object user session baru
    const userSession = {
      name: generatedName || "User MeetMate",
      email: formData.email,
      role: "Team Member",
      department: "Product Development",
      joinDate: "Mei 2026",
      bio: "Berhasil login ke MeetMate menggunakan akun pribadi."
    };

    // 3. Simpan ke localStorage agar dibaca oleh layout & halaman profil
    localStorage.setItem("user_profile", JSON.stringify(userSession));

    // 4. Picu event agar layout navbar langsung ter-update seketika
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("profileUpdate"));
    }

    // Toast sukses kosmetik sebelum animasi flying dipicu
    toast.success("Login berhasil! Menyiapkan dashboard Anda...");

    setTimeout(() => {
      setIsFlying(true);
      setTimeout(() => {
        router.push("/meetings");
      }, 1000);
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-[#070412] text-white font-sans overflow-hidden relative items-center justify-center">

      {/* BACKGROUND GRAPHICS: Pendaran abstrak mewah (Glow Orbs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7E61F2]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* TATA LETAK KIRI: Branding & Copywriting (Komposisi 5 Kolom) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col space-y-8 text-left">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-[#1D008C] to-[#7E61F2] shadow-[0_0_20px_rgba(126,97,242,0.5)] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white animate-ping" />
            </div>
            <span className="font-bold text-base tracking-widest bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MEETMATE</span>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-[#AD99FF] font-medium">
              <Sparkles size={12} /> Powered by Advanced AI Insights
            </div>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Selamat Datang <br />
              <span className="bg-gradient-to-r from-[#AD99FF] via-[#7E61F2] to-indigo-400 bg-clip-text text-transparent">
                Kembali.
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Masuk kembali untuk mengakses semua transkrip rapat otomatis, ringkasan berbasis AI, dan poin tugas penting Anda.
            </p>
          </div>

          <div className="pt-4">
            <div className="w-full max-w-[280px] p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm shadow-inner flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#7E61F2]/10 text-[#7E61F2]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Keamanan Terjamin</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Enkripsi end-to-end data rapat</p>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500">&copy; {new Date().getFullYear()} MeetMate. All rights reserved.</div>
        </div>

        {/* BAGIAN KANAN: Form Wrapper */}
        <div className="w-full lg:col-span-7 flex items-center justify-center p-6 lg:p-12 relative z-10">
          <div
            className={`w-full max-w-md bg-[#0F0A24] rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-white/10 p-8 md:p-10 text-white
            transition-all duration-1000 ease-in-out transform
            ${isFlying ? "opacity-0 -translate-y-[100vh] scale-75 rotate-12 blur-sm pointer-events-none" : "opacity-100 translate-y-0 scale-100"}`}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Masuk ke Akun Anda</h2>
              <p className="text-xs text-slate-400 mt-1.5">Silakan masukkan kredensial terdaftar untuk melanjutkan</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all focus:ring-1 focus:ring-[#7E61F2]"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Password</label>
                  <Link href="/forgot-password" className="text-[11px] font-semibold text-slate-400 hover:text-[#AD99FF] hover:underline transition-colors">Lupa Password?</Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all focus:ring-1 focus:ring-[#7E61F2]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-4 rounded-xl bg-[#7E61F2] hover:bg-[#694ee4] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(126,97,242,0.3)] active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Memverifikasi..." : "Masuk Sekarang"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-xs text-slate-400">
                Belum terdaftar?{" "}
                <Link href="/register" className="font-semibold text-[#AD99FF] hover:text-[#7E61F2] hover:underline transition-colors">Daftar akun gratis</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}