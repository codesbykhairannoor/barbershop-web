"use client";

import Image from "next/image";
import { Star, Coffee, Scissors, ShieldCheck, ArrowRight } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const shop = useBarbershop();

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:py-24 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Dynamic Rating Badge */}
          <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-stone-700 text-xs font-semibold mb-4 sm:mb-6">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="text-stone-900 font-bold">{shop.rating} / 5.0</span>
            <span className="text-stone-300">&bull;</span>
            <span className="text-stone-600">{shop.reviews} ulasan Google di {shop.cityOrig}</span>
          </div>

          {/* Main Headline with Dynamic Name */}
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight sm:leading-[1.15] mb-4 sm:mb-6 tracking-tight">
            Potongan rambut presisi, handuk hangat, dan gaya berkelas di <span className="text-[#b47820]">{shop.name}</span>.
          </h1>

          {/* Description */}
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
            Studio pangkas rambut modern di {shop.cityOrig} dengan keahlian gunting klasik, razor fades halus, dan perawatan handuk hangat yang menyegarkan. Nikmati kopi pilihan dan rileks di kursi Anda.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8 sm:mb-10">
            <button
              type="button"
              onClick={onBookClick}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-[#b47820] active:scale-[0.99] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pesan Kursi Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl font-semibold text-sm text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              Lihat Layanan &amp; Harga
            </a>
          </div>

          {/* Perks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-5 sm:pt-6 border-t border-stone-200/80 w-full text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <Scissors className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Konsultasi bentuk wajah &amp; rambut</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Coffee className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Kopi seduh &amp; minuman santai gratis</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Alat higienis &amp; handuk uap segar</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Photo Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[16/10] sm:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white bg-stone-200">
            <Image
              src="/assets/images/hero-light.jpg"
              alt={`Suasana interior studio ${shop.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          {/* Review Badge (Contained safely without horizontal overflow) */}
          <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-4 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-sm sm:shadow-xl flex items-center gap-3 max-w-sm">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 font-bold text-xs sm:text-sm">
              {shop.rating}★
            </div>
            <div>
              <p className="text-xs font-bold text-stone-800">Skor Terverifikasi Google</p>
              <p className="text-[11px] text-stone-500">Berdasarkan {shop.reviews} ulasan asli pelanggan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
