"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFlying, setIsFlying] = useState(false);

    // State Input Form
    const [email, setEmail] = useState("");
    const [otpArray, setOtpArray] = useState(["", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State Tambahan untuk Penyelarasan UX
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Mekanisme Hitung Mundur Resend OTP
    useEffect(() => {
        if (step !== 2 || timer === 0) {
            if (timer === 0) setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleRequestReset = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
            setTimer(60);
            setCanResend(false);
            toast.info("Kode OTP 4-digit telah dikirim ke email Anda.");
        }, 800);
    };

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "");
        if (!value && element.value !== "") return;

        const newOtp = [...otpArray];
        newOtp[index] = value;
        setOtpArray(newOtp);

        if (value && element.nextElementSibling) {
            (element.nextElementSibling as HTMLInputElement).focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otpArray[index] && e.currentTarget.previousElementSibling) {
            (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
        }
    };

    const handleResendOtp = () => {
        if (!canResend) return;
        setTimer(60);
        setCanResend(false);
        setOtpArray(["", "", "", ""]);
        toast.success("Kode OTP baru berhasil dikirim ulang!");
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        const finalOtp = otpArray.join("");
        if (finalOtp.length < 4) {
            toast.error("Harap isi lengkap 4-digit kode keamanan!");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
            toast.success("Kode terverifikasi! Silakan atur sandi baru.");
        }, 800);
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Konfirmasi password baru tidak cocok!");
            return;
        }

        setIsLoading(true);

        // PENYESUAIAN: Perbarui profil di localStorage berdasarkan email yang baru di-reset kuncinya
        const emailPrefix = email.split("@")[0];
        const generatedName = emailPrefix
            .split(/[._-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const updatedSession = {
            name: generatedName || "User MeetMate",
            email: email,
            role: "Team Member",
            department: "Product Development",
            joinDate: "Mei 2026",
            bio: "Kata sandi akun berhasil diperbarui melalui sistem pemulihan."
        };
        localStorage.setItem("user_profile", JSON.stringify(updatedSession));

        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("profileUpdate"));
        }

        toast.success("Password Anda berhasil diperbarui!");

        setTimeout(() => {
            setIsFlying(true);
            setTimeout(() => {
                router.push("/login");
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
                            Amankan Kembali <br />
                            <span className="bg-gradient-to-r from-[#AD99FF] via-[#7E61F2] to-indigo-400 bg-clip-text text-transparent">
                                Akun Anda.
                            </span>
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Jangan khawatir, ikuti langkah mudah pemulihan kata sandi untuk kembali mengelola asisten rapat pintar Anda.
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
                        {/* ================= STEP 1: EMAIL REQUEST ================= */}
                        {step === 1 && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Lupa Password?</h2>
                                    <p className="text-xs text-slate-400 mt-1.5">Masukkan email terdaftar Anda untuk menerima kode verifikasi pemulihan</p>
                                </div>

                                <form onSubmit={handleRequestReset} className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all focus:ring-1 focus:ring-[#7E61F2]"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 mt-4 rounded-xl bg-[#7E61F2] hover:bg-[#694ee4] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(126,97,242,0.3)] active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isLoading ? "Mengirim..." : "Kirim Kode Verifikasi"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ================= STEP 2: VERIFIKASI OTP ================= */}
                        {step === 2 && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Verifikasi OTP</h2>
                                    <p className="text-xs text-slate-400 mt-1.5">Kami telah mengirimkan kode keamanan ke <span className="font-semibold text-slate-200">{email}</span></p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-5">
                                    <div className="flex justify-center gap-3">
                                        {otpArray.map((data, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength={1}
                                                value={data}
                                                onChange={(e) => handleOtpChange(e.target, index)}
                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                className="w-12 h-12 border border-white/10 bg-white/[0.03] rounded-xl text-center text-lg font-bold text-white focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all"
                                                required
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center text-xs mt-4">
                                        {canResend ? (
                                            <button type="button" onClick={handleResendOtp} className="font-bold text-[#AD99FF] hover:text-[#7E61F2] hover:underline transition-all">Kirim ulang kode baru</button>
                                        ) : (
                                            <p className="text-slate-400">Kirim ulang kode dalam <span className="font-bold text-slate-200">{timer}s</span></p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 mt-2 rounded-xl bg-[#7E61F2] hover:bg-[#694ee4] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(126,97,242,0.3)] active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isLoading ? "Memverifikasi..." : "Verifikasi Kode"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ================= STEP 3: ATUR ULANG PASSWORD ================= */}
                        {step === 3 && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Atur Ulang Password</h2>
                                    <p className="text-xs text-slate-400 mt-1.5">Buat password baru yang aman dan kuat untuk akun Anda</p>
                                </div>

                                <form onSubmit={handleResetPassword} className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password Baru</label>
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all focus:ring-1 focus:ring-[#7E61F2]"
                                                required
                                            />
                                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Konfirmasi Password Baru</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPass ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:border-[#7E61F2] focus:bg-[#070412] focus:outline-none transition-all focus:ring-1 focus:ring-[#7E61F2]"
                                                required
                                            />
                                            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                                                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 mt-4 rounded-xl bg-[#7E61F2] hover:bg-[#694ee4] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(126,97,242,0.3)] active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isLoading ? "Menyimpan..." : "Perbarui & Masuk"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Link Kembali ke Halaman Masuk */}
                        {step < 3 && (
                            <div className="text-center mt-6">
                                <Link href="/login" className="text-xs font-semibold text-[#AD99FF] hover:text-[#7E61F2] hover:underline transition-colors block">
                                    Kembali ke halaman masuk
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}