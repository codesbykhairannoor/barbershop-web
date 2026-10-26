import Image from "next/image";
import { Scissors, ArrowRight } from "lucide-react";

interface BarbersProps {
  onSelectBarber: (barberName: string) => void;
}

export default function Barbers({ onSelectBarber }: BarbersProps) {
  const team = [
    {
      id: "alex",
      name: "Alex Pratama",
      role: "Head Barber & Founder",
      experience: "11 tahun pengalaman",
      specialty: "Guntingan presisi, konsultasi bentuk wajah, perawatan rambut",
      image: "/assets/images/barber-master.jpg",
      bio: "Mendalami teknik pangkas klasik dan presisi modern. Selalu fokus pada arah tumbuh rambut alami agar potongan tetap rapi berhari-hari setelahnya.",
    },
    {
      id: "ryan",
      name: "Ryan Wijaya",
      role: "Senior Fade Specialist",
      experience: "7 tahun pengalaman",
      specialty: "Drop fade, taper fade halus, modern French crop",
      bio: "Spesialis potongan skin fade bersih dan detail garis cambang yang tajam. Sangat teliti dalam transisi gradasi rambut samping dan leher.",
    },
    {
      id: "dimas",
      name: "Dimas Nugraha",
      role: "Master Shave & Beard Craftsman",
      experience: "8 tahun pengalaman",
      specialty: "Cukur handuk uap panas, kontur jenggot simetris",
      bio: "Ahli cukur tradisional menggunakan pisau lurus dan busa hangat. Mengutamakan kenyamanan kulit wajah agar bebas iritasi dan terasa segar bugar.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-stone-200/80" id="barbers">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-xs font-semibold text-[#b47820] block mb-2">
            Tim Master Barber
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-3 sm:mb-4">
            Berkenalan dengan barber kami
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Berpengalaman lebih dari 25 tahun gabungan di dunia barbershop. Selalu mendengarkan keinginan Anda sebelum mulai memotong.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {team.map((barber) => (
            <div
              key={barber.id}
              className="bg-stone-50 rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
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
                      <Scissors className="w-10 h-10 text-[#b47820]" />
                    </div>
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold shadow-xs">
                    {barber.experience}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-stone-900 mb-1">
                    {barber.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#b47820] block mb-3">
                    {barber.role}
                  </span>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {barber.bio}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-stone-200/70 text-xs text-stone-700">
                    <strong className="text-stone-900">Keahlian utama:</strong> {barber.specialty}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectBarber(barber.name)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 bg-white hover:bg-stone-900 hover:text-white border border-stone-200 hover:border-stone-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pilih Barber {barber.name.split(" ")[0]}</span>
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
