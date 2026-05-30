"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, User, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "Belum Diisi", color: "bg-slate-700" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const pass = formData.password;
    if (!pass) {
      setPasswordStrength({ score: 0, label: "Belum Diisi", color: "bg-slate-700" });
      return;
    }
    let score = 0;
    if (pass.length >= 8) score += 2;
    if (/[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) setPasswordStrength({ score: 1, label: "Weak", color: "bg-rose-500" });
    else if (score <= 4) setPasswordStrength({ score: 2, label: "Medium", color: "bg-amber-500" });
    else setPasswordStrength({ score: 3, label: "Strong", color: "bg-emerald-500" });
  }, [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordStrength.score === 1) {
      toast.error("Password terlalu lemah! Gunakan minimal 8 karakter.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }

    setIsLoading(true);

    // PENYESUAIAN: Simpan data registrasi ke localStorage agar tersinkronisasi
    const userSession = {
      name: formData.name,
      email: formData.email,
      role: "Team Member",
      department: "Product Development",
      joinDate: "Mei 2026",
      bio: "Akun baru MeetMate yang berhasil terdaftar."
    };
    localStorage.setItem("user_profile", JSON.stringify(userSession));

    // Memicu event update profil jika layout membutuhkannya seketika
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("profileUpdate"));
    }

    toast.success("Pendaftaran berhasil! Mengalihkan ke halaman login...");
    setTimeout(() => {
      setIsFlying(true);
      setTimeout(() => router.push("/login"), 1000);
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

        {/* TATA LETAK KIRI: Branding & Copywriting */}
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
              Mulai Sesi Rapat <br />
              <span className="bg-gradient-to-r from-[#AD99FF] via-[#7E61F2] to-indigo-400 bg-clip-text text-transparent">
                Pintar Anda.
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Gabung sekarang dan nikmati pencatatan berbasis AI otomatis, pembuatan poin tugas instan, dan kolaborasi cerdas.
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

        {/* TATA LETAK KANAN: Form Boks Kaca Futuristik */}
        <div className="w-full lg:col-span-7 flex justify-center lg:justify-end">
          <div
            className={`w-full max-w-lg bg-[#0F0A24]/40 backdrop-blur-2xl rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.06] p-8 md:p-10
              transition-all duration-1000 ease-in-out transform relative overflow-hidden
              ${isFlying ? "opacity-0 -translate-y-[100vh] scale-75 rotate-6 blur-md" : "opacity-100 translate-y-0 scale-100"}`}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="mb-8">
              <h2 className="text-2xl font-extrabold tracking-wide text-white">Daftar Akun Baru</h2>
              <p className="text-xs text-slate-400 mt-2 font-medium">Lengkapi data akun MeetMate Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FIELD NAMA */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Nama Lengkap</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    disabled={isLoading}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-white focus:border-[#7E61F2] focus:bg-[#070412]/80 focus:outline-none focus:ring-1 focus:ring-[#7E61F2]/30 transition-all placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              {/* FIELD EMAIL */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    disabled={isLoading}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-white focus:border-[#7E61F2] focus:bg-[#070412]/80 focus:outline-none focus:ring-1 focus:ring-[#7E61F2]/30 transition-all placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              {/* FIELD PASSWORD */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    disabled={isLoading}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-white focus:border-[#7E61F2] focus:bg-[#070412]/80 focus:outline-none focus:ring-1 focus:ring-[#7E61F2]/30 transition-all placeholder-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="pt-1 space-y-1.5 px-0.5">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-500">Kekuatan Sandi:</span>
                      <span className={passwordStrength.score === 1 ? "text-rose-400" : passwordStrength.score === 2 ? "text-amber-400" : "text-emerald-400"}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-[3px] w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${passwordStrength.color} transition-all duration-500`} style={{ width: passwordStrength.score === 1 ? "33%" : passwordStrength.score === 2 ? "66%" : "100%" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* FIELD KONFIRMASI PASSWORD */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-purple-300/60 uppercase tracking-widest">Konfirmasi Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    disabled={isLoading}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-10 py-3 rounded-xl border bg-white/[0.03] text-sm text-white focus:bg-[#070412]/80 focus:outline-none focus:ring-1 transition-all placeholder-slate-600 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "border-rose-500/40 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-white/5 focus:border-[#7E61F2] focus:ring-[#7E61F2]/30"
                      }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-[10px] text-rose-400 font-medium tracking-wide">Sandi tidak cocok!</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#5A39E3] to-[#7E61F2] hover:opacity-90 text-white font-bold text-sm transition-all shadow-xl shadow-[#7E61F2]/20 active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? "Mendaftarkan..." : "Daftar Akun Baru"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-xs text-slate-400 font-medium">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="font-bold text-[#AD99FF] hover:underline ml-0.5">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}