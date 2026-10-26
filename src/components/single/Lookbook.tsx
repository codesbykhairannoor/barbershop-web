import Image from "next/image";
import { Scissors, Sparkles, ArrowRight } from "lucide-react";

interface LookbookProps {
  onBookCut: (cutName: string) => void;
}

export default function Lookbook({ onBookCut }: LookbookProps) {
  const styles = [
    {
      id: "fade",
      title: "The Skin Taper Fade & Sculpted Beard",
      image: "/assets/images/fade.jpg",
      badge: "Most Requested",
      faceShape: "Oval, Square, Round faces",
      maintenance: "Every 2–3 weeks",
      product: "Matte Texture Clay or Sea Salt Spray",
      desc: "Clean skin taper around the sideburns and neckline that blends naturally into longer textured volume on top. Razor-crisp lines around the beard.",
    },
    {
      id: "slick",
      title: "The Executive Side-Part Pompadour",
      image: "/assets/images/slick.jpg",
      badge: "Boardroom Classic",
      faceShape: "Diamond, Heart, Oval faces",
      maintenance: "Every 3–4 weeks",
      product: "Water-based Sheen Pomade & Grooming Tonic",
      desc: "A timeless gentleman silhouette styled with a definitive side parting and combed volume. Perfect for business meetings and formal occasions.",
    },
    {
      id: "crop",
      title: "The Textured Urban French Crop",
      badge: "Low Maintenance",
      faceShape: "Angular, Oval, Long faces",
      maintenance: "Every 3–5 weeks",
      product: "Styling Volumizing Powder or Fiber Paste",
      desc: "Feathered piecey texture on top with a blunt or micro-fringe and a mid drop fade. Extremely effortless to style on busy weekday mornings.",
      isGraphic: true,
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200/80" id="lookbook">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#b47820] uppercase tracking-widest block mb-2">
            Hairstyle Gallery
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Popular cuts from our chairs
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Browse our signature cuts crafted daily by our barbers. Every cut is adapted to your specific hair growth pattern and personal style.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styles.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo or Graphic */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  {style.isGraphic ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-100 via-amber-50/50 to-stone-200">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#b47820] mb-4">
                        <Scissors className="w-8 h-8" />
                      </div>
                      <h4 className="font-display font-bold text-xl text-stone-900 mb-1">
                        Textured French Crop
                      </h4>
                      <p className="text-xs text-stone-500">Short blunt fringe with high drop fade</p>
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
                  <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold shadow-sm">
                    {style.badge}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-1 text-[11px] text-stone-500 font-medium mb-3">
                    <span>Best for: <strong className="text-stone-800">{style.faceShape}</strong></span>
                    <span>Upkeep: <strong className="text-stone-800">{style.maintenance}</strong></span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900 mb-2.5">
                    {style.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {style.desc}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-600 leading-relaxed mb-4">
                    <strong className="text-stone-800">Styling tip:</strong> {style.product}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onBookCut(style.title)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Request this haircut</span>
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
