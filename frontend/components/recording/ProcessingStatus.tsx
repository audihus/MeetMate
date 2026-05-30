import { CheckCircle2 } from "lucide-react";

interface Props {
  status: "idle" | "uploading" | "processing" | "ready";
  progress: number;
}

export default function ProcessingStatus({ status, progress }: Props) {
  if (status === "uploading" || status === "processing") {
    return (
      <div className="space-y-2">
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-[#7E61F2] h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[10px] text-slate-400">{status === "uploading" ? "Mengunggah..." : "AI sedang memproses..."}</p>
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
        <CheckCircle2 size={16} /> File Siap
      </div>
    );
  }

  return null;
}