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
      <aside className="bg-stone-100 border-b border-stone-200 text-stone-600 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#b47820]" />
            <span>Open daily: 09:00 – 21:00 &bull; {shop.address || "South Jakarta"}</span>
          </div>
          <div className="flex items-center gap-4 text-stone-700 font-medium">
            <a
              href={`tel:${shop.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#b47820] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#b47820]" />
              <span>{shop.phone}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo with Dynamic Shop Name */}
          <a href="#" className="flex items-center gap-3 group max-w-[65%] sm:max-w-none">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center group-hover:bg-[#b47820] transition-colors shadow-sm shrink-0">
              <Scissors className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-base sm:text-lg text-stone-900 leading-tight truncate">
                {shop.name}
              </span>
              <span className="text-[11px] text-stone-500 font-medium tracking-wide">
                Barbershop &amp; Grooming Studio &bull; {shop.cityOrig}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#services" className="hover:text-stone-900 transition-colors">
              Services &amp; Pricing
            </a>
            <a href="#lookbook" className="hover:text-stone-900 transition-colors">
              Hairstyles
            </a>
            <a href="#barbers" className="hover:text-stone-900 transition-colors">
              Master Barbers
            </a>
            <a href="#testimonials" className="hover:text-stone-900 transition-colors">
              Reviews
            </a>
            <a href="#location" className="hover:text-stone-900 transition-colors">
              Studio &amp; Hours
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-stone-900 hover:bg-[#b47820] shadow-sm transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book an appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-5 py-6 flex flex-col gap-4 text-sm font-medium">
            <a
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-1 border-b border-stone-100"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#lookbook"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-1 border-b border-stone-100"
            >
              Hairstyles
            </a>
            <a
              href="#barbers"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-1 border-b border-stone-100"
            >
              Master Barbers
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-1 border-b border-stone-100"
            >
              Customer Reviews
            </a>
            <a
              href="#location"
              onClick={() => setIsOpen(false)}
              className="text-stone-700 hover:text-[#b47820] py-1 border-b border-stone-100"
            >
              Studio &amp; Hours
            </a>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-stone-900 text-white font-semibold text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book an appointment</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
}
