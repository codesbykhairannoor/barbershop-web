import Image from "next/image";
import { Star, Coffee, Scissors, ShieldCheck, ArrowRight } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-stone-700 text-xs font-semibold mb-6">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="text-stone-800 font-bold">4.9 / 5.0</span>
            <span className="text-stone-400">&bull;</span>
            <span className="text-stone-500">1,250+ reviews in Jakarta</span>
          </div>

          {/* Main Headline (Normal case, no shouting) */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-stone-900 leading-[1.15] mb-6 tracking-tight">
            Precision cuts, warm lather, and timeless style.
          </h1>

          {/* Description */}
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            A welcoming neighborhood barbershop dedicated to master scissor craftsmanship, skin fades, and restorative hot-towel shaves. Step inside, grab a complimentary cold brew, and enjoy your time in the chair.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
            <button
              type="button"
              onClick={onBookClick}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-[#b47820] shadow-md shadow-stone-900/10 hover:shadow-stone-900/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Book your chair now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 transition-all flex items-center justify-center"
            >
              View services &amp; prices
            </a>
          </div>

          {/* Perks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 w-full text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <Scissors className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Full skull &amp; hair consultation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Coffee className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Free specialty coffee &amp; tea</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#b47820] shrink-0" />
              <span>Sanitized tools &amp; hot towels</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Photo Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
            <Image
              src="/assets/images/hero-light.jpg"
              alt="Bright sunlit modern interior of The Modern Cut and Co barbershop"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Review Badge */}
          <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 font-bold text-sm">
              99%
            </div>
            <div>
              <p className="text-xs font-bold text-stone-800">Client retention rate</p>
              <p className="text-[11px] text-stone-500">Most guests return every 2–3 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
