import Image from "next/image";
import { Award, Scissors, ArrowRight } from "lucide-react";

interface BarbersProps {
  onSelectBarber: (barberName: string) => void;
}

export default function Barbers({ onSelectBarber }: BarbersProps) {
  const team = [
    {
      id: "alex",
      name: "Alex Pratama",
      role: "Head Barber & Founder",
      experience: "11 years crafting cuts",
      specialty: "Scissor sculpting, hair health, bespoke consultations",
      image: "/assets/images/barber-master.jpg",
      bio: "Trained in classic British barbering and Japanese precision shears. Passionate about natural hair movement and easy-to-maintain everyday styling.",
    },
    {
      id: "ryan",
      name: "Ryan Wijaya",
      role: "Senior Fade Specialist",
      experience: "7 years crafting cuts",
      specialty: "Drop fades, taper fades, textured French crops",
      bio: "Specializes in modern athletic skin fades, razor lines, and textured volume. Known for his surgical attention to temple and neckline gradients.",
    },
    {
      id: "dimas",
      name: "Dimas Nugraha",
      role: "Master Shave & Beard Craftsman",
      experience: "8 years crafting cuts",
      specialty: "Royal straight-razor hot towel shaves, beard geometry",
      bio: "The resident wet-shave artisan. Dedicated to rejuvenating tired facial skin with eucalyptus steam and featherweight straight razor strokes.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200/80" id="barbers">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#b47820] uppercase tracking-widest block mb-2">
            The Craftspeople
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Meet our master barbers
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Our team brings over 25 years of combined haircutting expertise. Every member takes pride in listening first before picking up the shears.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((barber) => (
            <div
              key={barber.id}
              className="bg-stone-50 rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  {barber.image ? (
                    <Image
                      src={barber.image}
                      alt={barber.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                      <Scissors className="w-12 h-12 text-[#b47820]" />
                    </div>
                  )}
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold shadow-sm">
                    {barber.experience}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-stone-900 mb-1">
                    {barber.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#b47820] block mb-3">
                    {barber.role}
                  </span>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {barber.bio}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-stone-200/70 text-xs text-stone-700">
                    <strong className="text-stone-900">Key specialty:</strong> {barber.specialty}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectBarber(barber.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 bg-white hover:bg-stone-900 hover:text-white border border-stone-200 hover:border-stone-900 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book with {barber.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4 text-[#b47820]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
