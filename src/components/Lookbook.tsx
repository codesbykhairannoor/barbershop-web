"use client";

import Image from "next/image";
import { Scissors, Sparkles, Compass } from "lucide-react";

interface LookbookProps {
  onSelectStyle: (styleName: string) => void;
}

export default function Lookbook({ onSelectStyle }: LookbookProps) {
  return (
    <section className="py-20 bg-[#0d0e12] border-y border-white/8 relative z-10" id="lookbook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Style Repertoire</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-wide mb-4">
            Iconic Haircuts &amp; Face-Shape Guide
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Not sure what cut to request on your next visit? Explore our master cuts breakdown, tailored by skull geometry, hair density, and daily styling maintenance.
          </p>
        </div>

        {/* 3 Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Precision Fade */}
          <article className="bg-[#12141a] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#e5a93c]/50 hover:shadow-2xl hover:shadow-[#e5a93c]/10 transition-all duration-300 group">
            <div className="relative aspect-square w-full overflow-hidden bg-[#181b24]">
              <Image
                src="/assets/images/fade.jpg"
                alt="Crisp skin taper fade haircut with groomed beard line"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07080a]/85 border border-[#e5a93c]/40 text-[#e5a93c] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                Most Requested
              </span>
            </div>

            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <div className="flex flex-col gap-1 text-xs mb-3 uppercase tracking-wider">
                <span className="text-zinc-500 font-semibold">Maintenance: Moderate</span>
                <span className="text-[#e5a93c] font-bold">Best for: Oval, Square, Round</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-white mb-3">
                The Precision Skin Taper Fade
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                A gradual gradient blending the sideburns and neckline down to the skin, leaving natural length and textured weight on top. Paired with laser-crisp contouring along the temples and beard.
              </p>

              <div className="p-3 bg-black/40 border-l-2 border-[#e5a93c] rounded-r-lg text-xs text-zinc-300 mb-6 leading-relaxed">
                <strong className="text-[#f6d288]">Recommended Styling:</strong> Matte Texture Clay or Sea Salt Spray for high hold with zero greasy shine.
              </div>

              <button
                type="button"
                onClick={() => onSelectStyle("fade")}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-[#e5a93c]/15 border border-white/10 hover:border-[#e5a93c] rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>Find Master Fade Barbers &rarr;</span>
              </button>
            </div>
          </article>

          {/* Card 2: Executive Slick Back */}
          <article className="bg-[#12141a] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#e5a93c]/50 hover:shadow-2xl hover:shadow-[#e5a93c]/10 transition-all duration-300 group">
            <div className="relative aspect-square w-full overflow-hidden bg-[#181b24]">
              <Image
                src="/assets/images/slick.jpg"
                alt="Classic executive gentleman slicked back pompadour hairstyle"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07080a]/85 border border-[#e5a93c]/40 text-[#e5a93c] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                Executive Class
              </span>
            </div>

            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <div className="flex flex-col gap-1 text-xs mb-3 uppercase tracking-wider">
                <span className="text-zinc-500 font-semibold">Maintenance: Daily Combing</span>
                <span className="text-[#e5a93c] font-bold">Best for: Diamond, Heart, Oval</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-white mb-3">
                The Heritage Executive Slick-Back
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                The timeless boardroom cut characterized by a hard side part and combed pompadour flow. Engineered for the modern professional seeking an imposing, clean silhouette.
              </p>

              <div className="p-3 bg-black/40 border-l-2 border-[#e5a93c] rounded-r-lg text-xs text-zinc-300 mb-6 leading-relaxed">
                <strong className="text-[#f6d288]">Recommended Styling:</strong> Water-soluble high-sheen pomade or classic styling tonic with tortoiseshell comb.
              </div>

              <button
                type="button"
                onClick={() => onSelectStyle("classic")}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-[#e5a93c]/15 border border-white/10 hover:border-[#e5a93c] rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>Find Heritage Barbers &rarr;</span>
              </button>
            </div>
          </article>

          {/* Card 3: Textured French Crop */}
          <article className="bg-[#12141a] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#e5a93c]/50 hover:shadow-2xl hover:shadow-[#e5a93c]/10 transition-all duration-300 group">
            <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#181b24] via-[#232734] to-[#12141a] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#e5a93c]/10 border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c] mb-4 group-hover:scale-110 transition-transform">
                <Scissors className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#f6d288] mb-1">
                Textured French Crop
              </h4>
              <p className="text-xs text-zinc-400">Short blunt fringe with high drop fade</p>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07080a]/85 border border-[#e5a93c]/40 text-[#e5a93c] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                Effortless
              </span>
            </div>

            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <div className="flex flex-col gap-1 text-xs mb-3 uppercase tracking-wider">
                <span className="text-zinc-500 font-semibold">Maintenance: Low Effort</span>
                <span className="text-[#e5a93c] font-bold">Best for: Oval, Long, Angular</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-white mb-3">
                The Urban Textured French Crop
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                Defined by a textured top chopped into piecey layers and a clean blunt or micro-feathered fringe. Ideal for men with active lifestyles who want effortless volume.
              </p>

              <div className="p-3 bg-black/40 border-l-2 border-[#e5a93c] rounded-r-lg text-xs text-zinc-300 mb-6 leading-relaxed">
                <strong className="text-[#f6d288]">Recommended Styling:</strong> Hair styling volumizing powder or light matte fiber paste for pliable movement.
              </div>

              <button
                type="button"
                onClick={() => onSelectStyle("crop")}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-[#e5a93c]/15 border border-white/10 hover:border-[#e5a93c] rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>Find Crop Specialists &rarr;</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
