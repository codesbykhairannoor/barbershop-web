import Image from "next/image";
import { Scissors, ArrowRight } from "lucide-react";

interface LookbookProps {
  onBookCut: (cutName: string) => void;
}

export default function Lookbook({ onBookCut }: LookbookProps) {
  const styles = [
    {
      id: "fade",
      title: "The Skin Taper Fade & Sculpted Beard",
      image: "/assets/images/fade.jpg",
      badge: "Paling Diminati",
      faceShape: "Wajah Oval, Kotak, Bulat",
      maintenance: "Setiap 2–3 minggu",
      product: "Matte Texture Clay atau Sea Salt Spray",
      desc: "Gradasi taper halus di sekitar cambang dan garis leher yang menyatu rapi dengan volume rambut atas. Garis jenggot dipahat dengan pisau cukur.",
    },
    {
      id: "slick",
      title: "The Executive Side-Part Pompadour",
      image: "/assets/images/slick.jpg",
      badge: "Klasik Formal",
      faceShape: "Wajah Diamond, Heart, Oval",
      maintenance: "Setiap 3–4 minggu",
      product: "Water-based Sheen Pomade & Grooming Tonic",
      desc: "Siluet pria elegan dengan belahan samping tegas dan volume tertata rapi. Pilihan tepat untuk suasana kerja profesional dan pesta resmi.",
    },
    {
      id: "crop",
      title: "The Textured Urban French Crop",
      badge: "Mudah Dirawat",
      faceShape: "Wajah Bersudut, Oval, Panjang",
      maintenance: "Setiap 3–5 minggu",
      product: "Styling Volumizing Powder atau Fiber Paste",
      desc: "Tekstur acak rapi di bagian atas dengan poni pendek dan drop fade di samping. Sangat mudah dirapikan di pagi hari tanpa perlu waktu lama.",
      isGraphic: true,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200/80" id="lookbook">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-xs font-semibold text-[#b47820] block mb-2">
            Inspirasi Gaya Rambut
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-3 sm:mb-4">
            Pilihan potongan rambut populer
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Lihat gaya rambut yang sering dikerjakan oleh para barber kami. Setiap potongan dapat disesuaikan dengan pola rambut unik Anda.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {styles.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo or Graphic */}
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-stone-100">
                  {style.isGraphic ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-100 via-amber-50/50 to-stone-200">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#b47820] mb-3">
                        <Scissors className="w-7 h-7" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-stone-900 mb-1">
                        Textured French Crop
                      </h4>
                      <p className="text-xs text-stone-500">Poni pendek dengan fade samping modern</p>
                    </div>
                  ) : (
                    <Image
                      src={style.image!}
                      alt={style.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold shadow-xs">
                    {style.badge}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-1 text-[11px] text-stone-500 font-medium mb-3">
                    <span>Cocok untuk: <strong className="text-stone-800">{style.faceShape}</strong></span>
                    <span>Waktu potong ulang: <strong className="text-stone-800">{style.maintenance}</strong></span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 mb-2">
                    {style.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {style.desc}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-600 leading-relaxed mb-2">
                    <strong className="text-stone-800">Tips penataan:</strong> {style.product}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onBookCut(style.title)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Minta Model Rambut Ini</span>
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
