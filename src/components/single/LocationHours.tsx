"use client";

import { MapPin, Clock, Phone, Navigation, Coffee, Wifi, Car } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";

export default function LocationHours() {
  const shop = useBarbershop();
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(shop.name + " " + shop.address + " " + shop.cityOrig)}`;

  return (
    <section className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200/80" id="location">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold text-[#b47820] block mb-2">
              Kunjungi Studio Kami
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-4 sm:mb-6">
              Lokasi studio &amp; jam operasional
            </h2>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 text-stone-700 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">Alamat Studio:</strong>
                  <span className="leading-relaxed">{shop.address || `${shop.name}, ${shop.cityOrig}`}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">Jam Buka:</strong>
                  <span>Senin – Minggu: 09:00 – 21:00 WIB</span>
                  <span className="block text-stone-500 text-xs mt-0.5">Penerimaan order pangkas terakhir pukul 20:15 WIB.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#b47820] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">WhatsApp &amp; Telepon Studio:</strong>
                  <a
                    href={`tel:${shop.phone.replace(/[^0-9]/g, "")}`}
                    className="text-stone-900 font-bold hover:text-[#b47820] transition-colors"
                  >
                    {shop.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Amenities (Collapses into 1 column on mobile, 3 on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-4 bg-white rounded-2xl border border-stone-200/80 mb-6 sm:mb-8 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>Area parkir aman</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>Koneksi WiFi cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#b47820] shrink-0" />
                <span>Minuman kopi &amp; teh</span>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-xl bg-stone-900 hover:bg-[#b47820] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Buka Petunjuk Arah di Google Maps</span>
            </a>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full mb-3 inline-block">
                Bisa Langsung Datang (Walk-in)
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 mb-2 sm:mb-3">
                Belum sempat reservasi? Tetap kami layani.
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                Meskipun booking online menjamin Anda langsung duduk tanpa antre di {shop.name}, ruang tunggu kami selalu terbuka untuk tamu walk-in. Santai sejenak sambil menikmati seduhan minuman dingin sebelum giliran Anda.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700">
              <span>Estimasi Tunggu Walk-in:</span>
              <span className="text-emerald-700 font-bold">10 – 15 menit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
