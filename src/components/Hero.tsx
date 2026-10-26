"use client";

import Image from "next/image";
import { Search, X, Star } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
}

export default function Hero({ searchQuery, setSearchQuery, onSearchSubmit }: HeroProps) {
  const trendingSearches = [
    { label: "Chief Barbershop", value: "Chief" },
    { label: "Senopati", value: "Senopati" },
    { label: "Kemang", value: "Kemang" },
    { label: "Dago Bandung", value: "Dago" },
    { label: "Near SCBD", value: "SCBD" },
    { label: "Near ITB", value: "ITB" },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero.jpg"
          alt="Atmospheric vintage luxury gentleman barbershop with leather chairs and warm amber light"
          fill
          priority
          className="object-cover object-center brightness-[0.32] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-radial from-[#0d0e12]/30 via-[#07080a]/80 to-[#07080a]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Curated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a]/85 border border-[#e5a93c]/40 backdrop-blur-md mb-6">
          <Star className="w-3.5 h-3.5 text-[#e5a93c] fill-[#e5a93c]" />
          <span className="text-xs font-bold tracking-widest text-[#e5a93c] uppercase">
            Curated Directory &bull; Jakarta Selatan &amp; Bandung
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-wide leading-[1.1] mb-6">
          THE GENTLEMAN’S CUT, <br />
          <span className="gold-gradient-text">DISCOVERED.</span>
        </h1>

        {/* Hero Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mb-10 leading-relaxed font-normal">
          Access an impeccably curated index of <strong className="text-[#e5a93c] font-semibold">1,131 verified barbershops</strong>, master razor specialists, and executive grooming lounges across South Jakarta and Bandung. Real Google ratings, neighborhood landmarks, and direct 1-tap WhatsApp booking.
        </p>

        {/* Key Metrics Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-10">
          <div className="bg-[#12141a]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-[#e5a93c]/50 transition-all">
            <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#e5a93c]">1,131</span>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Verified Shops</span>
          </div>
          <div className="bg-[#12141a]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-[#e5a93c]/50 transition-all">
            <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#e5a93c]">4.8★</span>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Avg Score</span>
          </div>
          <div className="bg-[#12141a]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-[#e5a93c]/50 transition-all">
            <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#e5a93c]">626</span>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">South Jakarta</span>
          </div>
          <div className="bg-[#12141a]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-[#e5a93c]/50 transition-all">
            <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#e5a93c]">505</span>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Bandung Hubs</span>
          </div>
        </div>

        {/* Master Search Bar */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center bg-[#12141a]/95 border border-[#e5a93c]/40 rounded-2xl p-2 shadow-2xl shadow-black/80 gold-border-glow backdrop-blur-xl gap-2">
            <div className="flex items-center gap-3 flex-1 px-3 w-full">
              <Search className="w-5 h-5 text-[#e5a93c] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search barbershop name, neighborhood (Senopati, Dago, Kemang), or campus..."
                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-sm sm:text-base py-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-500 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onSearchSubmit}
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-[#e5a93c] to-[#c98e29] hover:from-[#f6d288] hover:to-[#e5a93c] shadow-lg shadow-[#e5a93c]/30 transition-all whitespace-nowrap"
            >
              Explore 1,131 Spots
            </button>
          </div>

          {/* Quick Tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-4 text-xs">
            <span className="text-zinc-500">Trending:</span>
            {trendingSearches.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setSearchQuery(item.value);
                  onSearchSubmit();
                }}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#e5a93c]/50 text-zinc-400 hover:text-[#f6d288] hover:bg-[#e5a93c]/10 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
