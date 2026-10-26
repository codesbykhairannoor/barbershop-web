"use client";

import { useBarbershop } from "@/context/BarbershopContext";
import { Sparkles, MessageCircle } from "lucide-react";

export default function PitchBanner() {
  const shop = useBarbershop();

  if (!shop.isPitch) return null;

  return (
    <div className="bg-amber-500 text-stone-950 py-2 sm:py-2.5 px-3 sm:px-4 shadow-xs border-b border-amber-600/30 relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-stone-900 text-amber-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
          <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight">
            Preview khusus untuk pemilik <strong className="font-bold underline">{shop.name}</strong> ({shop.cityOrig}). Siap disambungkan ke domain resmi Anda.
          </p>
        </div>

        <a
          href={shop.claimUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-3.5 py-1.5 sm:py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Klaim / Pasang Website Ini</span>
        </a>
      </div>
    </div>
  );
}
