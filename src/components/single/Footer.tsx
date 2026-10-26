"use client";

import Image from "next/image";
import { useBarbershop } from "@/context/BarbershopContext";

export default function Footer() {
  const shop = useBarbershop();

  return (
    <footer className="bg-white border-t border-stone-200 py-10 sm:py-12 text-stone-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-xs flex items-center justify-center shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Logo Barbershop"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-bold text-base text-stone-900">
                {shop.name}
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm mb-3">
              Studio pangkas rambut pria yang mengedepankan presisi guntingan, cukur handuk uap tradisional, dan kenyamanan suasana studio.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {shop.address || `${shop.name}, ${shop.cityOrig}`}
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-3">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-stone-900 transition-colors">Layanan &amp; Harga</a></li>
              <li><a href="#lookbook" className="hover:text-stone-900 transition-colors">Inspirasi Gaya Rambut</a></li>
              <li><a href="#barbers" className="hover:text-stone-900 transition-colors">Master Barber</a></li>
              <li><a href="#booking" className="hover:text-stone-900 transition-colors">Pesan Jadwal Kunjungan</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-3">
              Kontak &amp; Jam Buka
            </h4>
            <div className="space-y-1.5 text-xs text-stone-500">
              <p>Setiap hari: 09:00 – 21:00 WIB</p>
              <p>WhatsApp: {shop.phone}</p>
              <p>Wilayah: {shop.cityOrig}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 text-center sm:text-left">
          <p>&copy; 2026 {shop.name}. Hak cipta dilindungi undang-undang.</p>
          <a href="#" className="hover:text-stone-700 transition-colors">
            Kembali ke atas &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
