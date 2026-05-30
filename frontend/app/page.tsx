"use client";

import { useState } from "react";
import Link from "next/link";
// Import ikon kamera video dari lucide-react
import { Video } from "lucide-react";

export default function LandingPage() {
  // State untuk mengontrol Accordion FAQ yang aktif
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Format file apa saja yang didukung oleh MeetMate?",
      answer: "MeetMate mendukung format audio dan video populer seperti MP3, WAV, M4A, MP4, dan MKV dengan ukuran maksimal hingga 100MB per unggahan."
    },
    {
      question: "Berapa lama waktu yang dibutuhkan AI untuk memproses rapat?",
      answer: "Rata-rata proses transkripsi dan perangkuman memakan waktu sekitar 15-20% dari total durasi video/audio yang Anda unggah. Sebagai contoh, rapat berdurasi 1 jam akan selesai diproses dalam waktu 8-12 menit saja."
    },
    {
      question: "Apakah data rekaman rapat saya aman di MeetMate?",
      answer: "Sangat aman. Kami menerapkan enkripsi end-to-end untuk setiap file yang diunggah. Data rekaman dan transkrip Anda bersifat rahasia dan tidak akan pernah digunakan sebagai data pelatihan untuk model AI publik luar."
    },
    {
      question: "Apakah MeetMate bisa mendeteksi bahasa kasual atau campuran (Indish/Jaksel)?",
      answer: "Ya! Model AI kami sudah dioptimalkan untuk memahami konteks percakapan formal bahasa Indonesia maupun bahasa kasual sehari-hari, termasuk istilah-istilah bahasa Inggris yang sering terselip di dunia profesional."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. NAVBAR */}
      <header className="border-b border-gray-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0B0F19]/90">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* IMPLEMENTASI LOGO BARU DI NAVBAR */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#7E61F2] to-[#1D008C] flex items-center justify-center shadow-[0_0_20px_rgba(126,97,242,0.3)] group-hover:scale-105 transition duration-200">
              <Video size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
              MeetMate
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition">Fitur</a>
            <a href="#cara-kerja" className="hover:text-white transition">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-white transition">Testimoni</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Masuk
            </Link>
            <Link href="/register" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/20">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
          ✨ AI-Powered Meeting Assistant
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.15] mb-6">
          Notulensi Rapat Jadi <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Lebih Mudah</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Ubah rekaman rapat menjadi transkrip teks, ringkasan otomatis, dan daftar action items terstruktur dalam hitungan detik menggunakan kecerdasan buatan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-medium transition text-base shadow-xl shadow-indigo-600/25">
            Mulai Sekarang
          </Link>
          <a href="#cara-kerja" className="w-full sm:w-auto bg-gray-800/50 hover:bg-gray-800 text-gray-300 px-8 py-4 rounded-xl font-medium transition text-base border border-gray-700/50">
            Lihat Demo
          </a>
        </div>
      </section>

      {/* 3. FEATURE HIGHLIGHTS */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Semua yang Anda Butuhkan untuk Notulensi</h2>
          <p className="text-gray-400">Fokus saja pada diskusi rapat, biar MeetMate yang mencatat dan merangkum semuanya.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#111625] border border-gray-800/60 p-8 rounded-2xl hover:border-indigo-500/40 transition group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">📝</div>
            <h3 className="text-xl font-bold mb-3">Transkrip Otomatis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Mengonversi suara dari rekaman rapat menjadi teks bahasa Indonesia dengan akurasi tinggi.</p>
          </div>
          <div className="bg-[#111625] border border-gray-800/60 p-8 rounded-2xl hover:border-purple-500/40 transition group">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition">✨</div>
            <h3 className="text-xl font-bold mb-3">Ringkasan AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Mendapatkan poin-poin penting dan kesimpulan rapat tanpa harus membaca seluruh transkrip.</p>
          </div>
          <div className="bg-[#111625] border border-gray-800/60 p-8 rounded-2xl hover:border-pink-500/40 transition group">
            <div className="h-12 w-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-pink-600 group-hover:text-white transition">🎯</div>
            <h3 className="text-xl font-bold mb-3">Action Items</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Mendeteksi tugas, penanggung jawab, dan tenggat waktu secara otomatis dari percakapan rapat.</p>
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA */}
      <section id="cara-kerja" className="bg-[#080B13] py-20 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Cara Kerja MeetMate</h2>
            <p className="text-gray-400">Hanya butuh 3 langkah mudah sampai ringkasan rapatmu siap digunakan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 font-bold">1</div>
              <h4 className="text-lg font-bold mb-2">Unggah Rekaman</h4>
              <p className="text-gray-400 text-sm">Upload file audio atau video hasil rapat yang sudah selesai dilaksanakan.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 font-bold">2</div>
              <h4 className="text-lg font-bold mb-2">Proses Analisis AI</h4>
              <p className="text-gray-400 text-sm">AI kami bekerja mengekstrak suara, melakukan transkripsi, hingga membuat summary.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 font-bold">3</div>
              <h4 className="text-lg font-bold mb-2">Selesai & Bagikan</h4>
              <p className="text-gray-400 text-sm">Notulensi matang siap dibaca, diedit, atau langsung dibagikan ke tim kerja.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONI SECTION */}
      <section id="testimoni" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Apa Kata Mereka Tentang MeetMate?</h2>
          <p className="text-gray-400">Telah membantu ratusan profesional menghemat jam kerja mereka dari mencatat notulen manual.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#111625] border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-amber-400 flex gap-1 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &ldquo;Bener-bener *life saver* buat Scrum Master kayak aku. Gak perlu lagi pusing dengerin ulang rekaman sejam buat bikin sprint review note. Sekali upload langsung beres!&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 border-t border-gray-800/60 pt-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">AS</div>
              <div>
                <h5 className="font-bold text-sm">Aris Setiawan</h5>
                <p className="text-xs text-gray-500">Project Manager / Tech Corp</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111625] border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-amber-400 flex gap-1 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &ldquo;Akurasi transkripsi bahasa Indonesianya di luar ekspektasi saya, bahkan istilah teknis bahasa Inggris pun bisa ketangkap dengan pas dan otomatis terangkum rapi.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 border-t border-gray-800/60 pt-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">DN</div>
              <div>
                <h5 className="font-bold text-sm">Dewi N.</h5>
                <p className="text-xs text-gray-500">Product Owner / Startup Ind</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111625] border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-amber-400 flex gap-1 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &ldquo;Fitur *Action Items*-nya juara sih. Gak ada lagi kejadian anggota tim lupa tugas atau lupa siapa PIC-nya gara-gara catatan rapat yang hilang.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 border-t border-gray-800/60 pt-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-bold text-sm">RF</div>
              <div>
                <h5 className="font-bold text-sm">Riza Fahlevi</h5>
                <p className="text-xs text-gray-500">Operations Lead / Agency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (INTERACTIVE ACCORDION) */}
      <section id="faq" className="bg-[#080B13] py-20 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-400">Punya pertanyaan lain seputar MeetMate? Temukan jawabannya di bawah ini.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#111625] border border-gray-800/60 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-medium hover:text-indigo-400 transition"
                >
                  <span>{faq.question}</span>
                  <span className={`text-xl transform transition-transform duration-200 ${activeFaq === idx ? "rotate-45 text-indigo-400" : "text-gray-500"}`}>
                    ＋
                  </span>
                </button>

                <div
                  className={`px-6 transition-all duration-300 ease-in-out border-gray-800/60 overflow-hidden ${activeFaq === idx ? "max-h-40 pb-5 border-t pt-4 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-gray-900 bg-[#0B0F19] py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* IMPLEMENTASI LOGO BARU DI FOOTER */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#7E61F2] to-[#1D008C] flex items-center justify-center shadow-[0_0_15px_rgba(126,97,242,0.2)]">
              <Video size={14} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">MeetMate</span>
          </div>

          <p>© {new Date().getFullYear()} MeetMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}