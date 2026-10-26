"use client";

import { useState } from "react";
import { Scissors, Phone, Calendar, Menu, X, Clock } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shop = useBarbershop();

  return (
    <>
      {/* Top Notice Bar */}
      <aside className="bg-stone-100 border-b border-stone-200/80 text-stone-600 text-[11px] sm:text-xs py-1.5 sm:py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock className="w-3.5 h-3.5 text-[#b47820] shrink-0" />
            <span className="truncate">
              Buka setiap hari: 09:00 – 21:00
              <span className="hidden sm:inline"> &bull; {shop.address || shop.cityOrig}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-stone-700 font-medium shrink-0">
            <a
              href={`tel:${shop.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#b47820] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#b47820]" />
              <span className="text-[11px] sm:text-xs">{shop.phone}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Header (Sticky) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
          {/* Logo with Dynamic Shop Name */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group max-w-[70%] sm:max-w-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center group-hover:bg-[#b47820] transition-colors shadow-xs shrink-0">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm sm:text-base text-stone-900 leading-tight truncate">
                {shop.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium truncate">
                Studio Grooming Pria &bull; {shop.cityOrig}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-stone-600">
            <a href="#services" className="hover:text-stone-900 transition-colors">
              Layanan &amp; Harga
            </a>
            <a href="#lookbook" className="hover:text-stone-900 transition-colors">
              Inspirasi Gaya
            </a>
            <a href="#barbers" className="hover:text-stone-900 transition-colors">
              Master Barber
            </a>
            <a href="#testimonials" className="hover:text-stone-900 transition-colors">
              Ulasan Klien
            </a>
            <a href="#location" className="hover:text-stone-900 transition-colors">
              Lokasi &amp; Jam Buka
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-stone-900 hover:bg-[#b47820] shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Pesan Jadwal</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-stone-700 hover:text-stone-950 active:bg-stone-100 rounded-lg cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-5 py-4 flex flex-col gap-1 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-150">
            <a
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-3 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Layanan &amp; Harga</span>
              <span className="text-stone-400 text-xs">&rarr;</span>
            </a>
            <a
              href="#lookbook"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-3 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Inspirasi Gaya Rambut</span>
              <span className="text-stone-400 text-xs">&rarr;</span>
            </a>
            <a
              href="#barbers"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-3 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Master Barber</span>
              <span className="text-stone-400 text-xs">&rarr;</span>
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-3 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Ulasan Pelanggan</span>
              <span className="text-stone-400 text-xs">&rarr;</span>
            </a>
            <a
              href="#location"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-3 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Lokasi &amp; Jam Buka</span>
              <span className="text-stone-400 text-xs">&rarr;</span>
            </a>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="w-full min-h-[46px] py-3 rounded-xl bg-stone-900 active:bg-stone-800 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Pesan Jadwal Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
