import { Scissors, CheckCircle } from "lucide-react";

interface FooterProps {
  onOpenSubmit: () => void;
  onSelectCity: (city: "South Jakarta" | "Bandung") => void;
}

export default function Footer({ onOpenSubmit, onSelectCity }: FooterProps) {
  return (
    <footer className="bg-[#050608] border-t border-white/8 pt-16 pb-8 text-zinc-400 text-xs sm:text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Bio */}
          <div className="md:col-span-1 flex flex-col">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c]">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-white text-base tracking-wider">
                CROWN &amp; BLADE
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              The definitive English-language index for men&apos;s grooming and barbershop culture in Indonesia. Engineered for gentlemen who hold their styling and ritual grooming to the highest standard.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#e5a93c] bg-[#e5a93c]/10 border border-[#e5a93c]/20 px-3 py-1 rounded-full w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>1,131 Google Business Listings Verified</span>
            </div>
          </div>

          {/* Hubs */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">
              Metropolitan Hubs
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity("South Jakarta")}
                  className="hover:text-[#f6d288] transition-colors"
                >
                  South Jakarta Barbers (626)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity("Bandung")}
                  className="hover:text-[#f6d288] transition-colors"
                >
                  Bandung Barbers (505)
                </button>
              </li>
              <li>
                <a href="#directory" className="hover:text-[#f6d288] transition-colors">
                  SCBD &amp; Senopati Corridor
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-[#f6d288] transition-colors">
                  Dago &amp; Dipatiukur Hub
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-[#f6d288] transition-colors">
                  Kemang &amp; Cipete Enclave
                </a>
              </li>
            </ul>
          </div>

          {/* Cuts */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">
              Grooming Repertoire
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <a href="#lookbook" className="hover:text-[#f6d288] transition-colors">
                  The Precision Skin Taper Fade
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#f6d288] transition-colors">
                  The Heritage Executive Slick-Back
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#f6d288] transition-colors">
                  The Urban Textured French Crop
                </a>
              </li>
              <li>
                <a href="#rituals" className="hover:text-[#f6d288] transition-colors">
                  Royal Hot Towel Shave
                </a>
              </li>
              <li>
                <a href="#rituals" className="hover:text-[#f6d288] transition-colors">
                  Deep Scalp Detox Creambath
                </a>
              </li>
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">
              Direct Concierge
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Want to feature your brand, run partnership campaigns, or report updated opening hours?
            </p>
            <button
              type="button"
              onClick={onOpenSubmit}
              className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#e5a93c]/50 text-zinc-200 text-xs font-semibold transition-all"
            >
              List / Claim Your Shop
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; 2026 CROWN &amp; BLADE INDONESIA. All rights reserved. Data grounded in real verified Google Business listings.
          </p>
          <a href="#" className="text-[#e5a93c] hover:underline">
            Back to Top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
