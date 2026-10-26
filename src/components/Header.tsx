"use client";

import { useState } from "react";
import { Scissors, PlusCircle, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenSubmit: () => void;
  onOpenMatchmaker: () => void;
}

export default function Header({ onOpenSubmit, onOpenMatchmaker }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="bg-gradient-to-r from-[#13151b] via-[#201c13] to-[#13151b] border-b border-[#e5a93c]/20 py-2 px-4 text-xs text-zinc-400 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-center">
          <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse-gold inline-block" />
          <p>
            <strong className="text-zinc-200">OCTOBER 2026 EDITION:</strong> 1,131 verified barbershops cataloged across South Jakarta &amp; Bandung.
          </p>
          <a href="#directory" className="text-[#e5a93c] hover:text-[#f6d288] font-semibold transition-colors">
            Explore Directory &rarr;
          </a>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0d0e12]/90 backdrop-blur-md border-b border-white/8 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#181b24] to-[#232734] border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c] shadow-md group-hover:rotate-6 group-hover:scale-105 transition-all">
              <Scissors className="w-5 h-5 text-[#e5a93c]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-wider text-base sm:text-lg text-white leading-tight">
                CROWN &amp; BLADE
              </span>
              <span className="text-[10px] tracking-widest font-bold text-[#e5a93c] uppercase">
                The Gentleman&apos;s Compendium
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#directory" className="hover:text-white transition-colors">
              Directory
            </a>
            <a href="#lookbook" className="hover:text-white transition-colors">
              Hairstyle Lookbook
            </a>
            <a href="#rituals" className="hover:text-white transition-colors">
              Grooming Rituals
            </a>
            <button
              type="button"
              onClick={onOpenMatchmaker}
              className="text-[#e5a93c] hover:text-[#f6d288] font-semibold transition-colors"
            >
              Barber Matchmaker
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-300 bg-[#e5a93c]/5 hover:bg-[#e5a93c]/15 border border-[#e5a93c]/30 hover:border-[#e5a93c] rounded-md transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>List / Claim Shop</span>
            </button>
            <a
              href="#directory"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-black bg-gradient-to-r from-[#e5a93c] to-[#c98e29] hover:from-[#f6d288] hover:to-[#e5a93c] rounded-md shadow-lg shadow-[#e5a93c]/20 hover:shadow-[#e5a93c]/40 transition-all transform hover:-translate-y-0.5"
            >
              Find Barber
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d0e12] border-b border-white/10 px-4 py-5 flex flex-col gap-4 text-base">
            <a
              href="#directory"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-[#e5a93c] py-1 border-b border-white/5"
            >
              Directory (1,131 Barbers)
            </a>
            <a
              href="#lookbook"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-[#e5a93c] py-1 border-b border-white/5"
            >
              Hairstyle Lookbook
            </a>
            <a
              href="#rituals"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-[#e5a93c] py-1 border-b border-white/5"
            >
              Grooming Rituals
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMatchmaker();
              }}
              className="text-left text-[#e5a93c] font-semibold py-1 border-b border-white/5"
            >
              Barber Matchmaker Quiz
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmit();
              }}
              className="w-full mt-2 py-2.5 text-center text-xs font-bold text-black bg-[#e5a93c] rounded-md"
            >
              List Your Barbershop
            </button>
          </div>
        )}
      </header>
    </>
  );
}
