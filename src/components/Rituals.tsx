import { Sparkles, Clock } from "lucide-react";

export default function Rituals() {
  const rituals = [
    {
      number: "01",
      duration: "35 - 45 MINS",
      title: "The Signature Cut & Refresh",
      desc: "Full skull consultation, precision scissor & clipper sculpting, back-of-neck straight razor cleaning, invigorating peppermint scalp wash, tonic massage, and tailored blow-dry styling.",
      price: "Rp 75,000 – Rp 150,000",
      tier: "Standard to Premium",
      featured: false,
    },
    {
      number: "02",
      duration: "45 MINS",
      title: "Royal Hot Towel Shave & Beard Sculpt",
      desc: "Double eucalyptus-steamed hot towel wrap, warm artisanal lathering, surgical feather-blade straight razor shave with the grain, cold towel pore closure, and sandalwood aftershave balm.",
      price: "Rp 80,000 – Rp 135,000",
      tier: "Executive Grade",
      featured: true,
      ribbon: "Most Rejuvenating",
    },
    {
      number: "03",
      duration: "60 MINS",
      title: "Deep Scalp Detox & Hair Creambath",
      desc: "Revitalizing clay scalp scrub to remove product buildup and sebum, deep nutritional conditioning mask, neck and shoulder acupressure tension release, and ozone steam therapy.",
      price: "Rp 150,000 – Rp 350,000",
      tier: "Full Recovery",
      featured: false,
    },
    {
      number: "04",
      duration: "60 - 90 MINS",
      title: "Grey Blending & Tone Camouflage",
      desc: "Subtle ammonia-free demi-permanent pigment formulation designed specifically for men to discreetly blend grey hair and beards without an artificial dye appearance.",
      price: "Rp 180,000 – Rp 400,000",
      tier: "Color Atelier",
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-[#07080a] relative z-10" id="rituals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Benchmark Standards</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-wide mb-4">
            The Gentleman&apos;s Grooming Rituals
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Curated price benchmarks and expected treatment protocols across top Indonesian barbershop ateliers (Chief, Captain, Gents, and Brocode standards).
          </p>
        </div>

        {/* 4 Ritual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rituals.map((r) => (
            <div
              key={r.number}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col relative transition-all duration-300 hover:-translate-y-1 ${
                r.featured
                  ? "bg-gradient-to-b from-[#e5a93c]/10 to-[#12141a] border border-[#e5a93c]/50 shadow-xl shadow-[#e5a93c]/10"
                  : "bg-[#12141a] border border-white/10 hover:border-[#e5a93c]/30"
              }`}
            >
              {r.ribbon && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#e5a93c] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                  {r.ribbon}
                </span>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="font-serif font-black text-2xl text-[#e5a93c] opacity-80">
                  {r.number}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 tracking-wider">
                  <Clock className="w-3 h-3 text-[#e5a93c]" />
                  <span>{r.duration}</span>
                </span>
              </div>

              <h3 className="font-sans font-bold text-lg text-white mb-3 leading-snug">
                {r.title}
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                {r.desc}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-0.5">
                <span className="font-sans font-bold text-base text-[#e5a93c]">
                  {r.price}
                </span>
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {r.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
