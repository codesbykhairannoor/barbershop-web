import { MapPin, Clock, Phone, Navigation, Coffee, Wifi, Car } from "lucide-react";

export default function LocationHours() {
  const mapsUrl = "https://maps.google.com/?q=Senopati+Kebayoran+Baru+Jakarta+Selatan";

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200/80" id="location">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-[#b47820] uppercase tracking-widest block mb-2">
              Visit Our Studio
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-6">
              Studio location &amp; hours
            </h2>

            <div className="space-y-6 mb-8 text-stone-700 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-1">Address:</strong>
                  <span>Jl. Senopati No. 42, RT.6/RW.2, Selong, Kebayoran Baru, Jakarta Selatan 12190</span>
                  <span className="block text-xs text-stone-500 mt-1">Conveniently located 3 minutes from SCBD corridor.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-1">Operating Hours:</strong>
                  <span>Monday – Sunday: 09:00 – 21:00</span>
                  <span className="block text-xs text-stone-500 mt-1">Last appointment booking at 20:15.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-1">Direct Line &amp; WhatsApp:</strong>
                  <a href="tel:081214807192" className="text-stone-900 font-bold hover:text-[#b47820] transition-colors">
                    0812-1480-7192
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Amenities */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-stone-200/80 mb-8 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>Free valet parking</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>High-speed WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>Cold brew bar</span>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-[#b47820] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Get directions on Google Maps</span>
            </a>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Walk-ins Always Welcome
              </span>
              <h3 className="font-display font-bold text-2xl text-stone-900 mb-3">
                No appointment? No problem.
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                While booking ahead guarantees immediate seating, our lounge is always open for walk-in gentlemen. Relax with a complimentary beverage while waiting for the next available master barber chair.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700">
              <span>Typical Walk-in Wait:</span>
              <span className="text-emerald-700 font-bold">10 – 15 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
