"use client";

import { Scissors } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";

export default function Footer() {
  const shop = useBarbershop();

  return (
    <footer className="bg-white border-t border-stone-200 py-12 text-stone-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-display font-bold text-base text-stone-900">
                {shop.name}
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
              Dedicated to precision haircutting, classic wet shaves, and timeless gentleman grooming rituals in a welcoming, light-filled studio.
            </p>
            <p className="text-xs text-stone-400">
              {shop.address || `${shop.name}, ${shop.cityOrig}`}
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-stone-900 transition-colors">Services &amp; Pricing</a></li>
              <li><a href="#lookbook" className="hover:text-stone-900 transition-colors">Hairstyle Gallery</a></li>
              <li><a href="#barbers" className="hover:text-stone-900 transition-colors">Master Barbers</a></li>
              <li><a href="#booking" className="hover:text-stone-900 transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3">
              Contact &amp; Studio Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-500">
              <p>Daily: 09:00 – 21:00</p>
              <p>WhatsApp: {shop.phone}</p>
              <p>Location: {shop.cityOrig}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>&copy; 2026 {shop.name}. All rights reserved.</p>
          <a href="#" className="hover:text-stone-700 transition-colors">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
