"use client";

import { useBarbershop } from "@/context/BarbershopContext";
import { Sparkles, MessageCircle } from "lucide-react";

export default function PitchBanner() {
  const shop = useBarbershop();

  if (!shop.isPitch) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-900 py-3 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-black text-amber-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <p className="text-xs sm:text-sm font-medium text-black">
            Preview dibuatkan khusus untuk <strong className="font-extrabold underline">{shop.name}</strong> ({shop.cityOrig}). Siap dihubungkan ke domain resmi barbershop Anda.
          </p>
        </div>

        <a
          href={shop.claimUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Klaim / Pasang Website Ini</span>
        </a>
      </div>
    </div>
  );
}
