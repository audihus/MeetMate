"use client";
import { UploadCloud } from "lucide-react";

interface UploadZoneProps {
  onUpload: () => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  return (
    <div
      onClick={onUpload}
      className="border-2 border-dashed border-white/10 hover:border-[#7E61F2]/50 bg-white/[0.02] rounded-xl p-6 text-center cursor-pointer transition"
    >
      <UploadCloud size={24} className="mx-auto text-slate-500 mb-2" />
      <p className="text-[11px]">Klik untuk unggah rekaman</p>
    </div>
  );
}