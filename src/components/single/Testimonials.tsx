import { Star, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Bagas Adiputra",
      date: "3 hari yang lalu",
      service: "Signature Precision Cut",
      text: "Potongan fade paling rapi dan teliti. Barber menyempatkan diri mendiskusikan arah rambut saya di pagi hari dan menyesuaikan taper dengan bentuk leher. Kopi dingin gratisnya sangat mantap.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Henderson",
      date: "1 minggu yang lalu",
      service: "Royal Hot Towel Shave",
      text: "Sebagai expat yang tinggal di Indonesia, saya cukup selektif mencari barber yang paham cukur pisau tradisional. Hasilnya sangat bersih dan kulit sama sekali tidak perih atau iritasi. Tempatnya bersih dan musiknya nyaman.",
      rating: 5,
    },
    {
      id: 3,
      name: "Reza Farhan",
      date: "2 minggu yang lalu",
      service: "The Executive Grooming Combo",
      text: "Booking via WhatsApp 1 jam sebelumnya dan langsung dilayani tanpa menunggu. Pijat pundak dan kompres handuk hangatnya langsung menghilangkan capek setelah seharian di kantor.",
      rating: 5,
    },
    {
      id: 4,
      name: "Kevin Pratama",
      date: "3 minggu yang lalu",
      service: "Textured Crop & Beard Sculpt",
      text: "Sangat ahli dalam mengendalikan mesin clipper. French crop saya terbentuk rapi tanpa perlu repot styling lama setiap pagi. Harga sangat sebanding dengan pelayanan yang didapatkan.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-stone-200/80" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-2 sm:mb-3">
            Dipercaya oleh lebih dari 1.200 pria
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Ulasan jujur dari pelanggan setia yang mempercayakan rambut dan jenggot mereka pada studio kami.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">{rev.name}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Pelanggan Terverifikasi</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                  <span className="text-xs text-stone-500 font-medium ml-2">
                    &bull; {rev.service}
                  </span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
