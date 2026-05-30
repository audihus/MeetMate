"use client";

import { useState, useRef, useEffect } from "react";
import { Video, CheckSquare, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // State dinamis untuk nama profil di navbar
    const [profileName, setProfileName] = useState("John Doe");

    // Fungsi mengambil nama & membuat inisial (cth: John Doe -> JD)
    const loadProfileData = () => {
        const savedProfile = localStorage.getItem("user_profile");
        if (savedProfile) {
            const parsed = JSON.parse(savedProfile);
            if (parsed.name) setProfileName(parsed.name);
        }
    };

    const getInitials = (name: string) => {
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    useEffect(() => {
        // Ambil data saat pertama kali load
        loadProfileData();

        // Daftarkan event listener agar jika user klik 'Save' di page profile, navbar langsung merespon otomatis
        window.addEventListener("profileUpdate", loadProfileData);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("profileUpdate", loadProfileData);
        };
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#08071a] overflow-x-hidden">
            <header className="w-full border-b border-purple-950/30 bg-[#08071a]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-3 items-center">

                    {/* Logo */}
                    <div className="flex items-center justify-start gap-3">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#7E61F2] to-[#1D008C] flex items-center justify-center shadow-[0_0_15px_rgba(126,97,242,0.2)]">
                            <Video size={14} className="text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-wide text-white">MeetMate</span>
                    </div>

                    {/* Navigasi */}
                    <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium">
                        <Link href="/meetings" className="text-white hover:text-[#7E61F2] transition-colors flex items-center gap-2">
                            <Video size={16} className="text-purple-400" /> Rapat
                        </Link>
                        <Link href="/action-items" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <CheckSquare size={16} /> Tugas Saya
                        </Link>
                    </nav>

                    {/* Avatar & Dropdown Dinamis */}
                    <div className="flex items-center justify-end relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-3 bg-[#130f26]/40 border border-purple-950/40 px-3 py-1.5 rounded-full hover:border-purple-500/30 transition-all cursor-pointer"
                        >
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#7E61F2] to-[#6344E3] text-[10px] font-bold flex items-center justify-center text-white">
                                {getInitials(profileName)}
                            </div>
                            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">{profileName}</span>
                        </button>

                        {/* Menu Pop-up */}
                        {isOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-[#130E29] border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition"
                                >
                                    <User size={14} /> Personal Info
                                </Link>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="flex items-center gap-3 px-4 py-3 text-xs text-rose-400 hover:bg-rose-500/10 w-full transition"
                                >
                                    <LogOut size={14} /> Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="w-full flex-1">{children}</main>
        </div>
    );
}