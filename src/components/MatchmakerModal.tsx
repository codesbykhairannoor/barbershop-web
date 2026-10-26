"use client";

import { useState } from "react";
import { Barbershop } from "@/types/barbershop";
import { X, Check, MessageCircle, Star, Sparkles, RefreshCw } from "lucide-react";

interface MatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  barbershops: Barbershop[];
}

export default function MatchmakerModal({
  isOpen,
  onClose,
  barbershops,
}: MatchmakerModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [city, setCity] = useState<"South Jakarta" | "Bandung">("South Jakarta");
  const [vibe, setVibe] = useState<"classic" | "fade" | "crop">("fade");
  const [tier, setTier] = useState<"top" | "popular">("top");

  if (!isOpen) return null;

  const restartQuiz = () => {
    setStep(1);
    setCity("South Jakarta");
    setVibe("fade");
    setTier("top");
  };

  // Matched Cut Details
  const cutTitles = {
    classic: "The Heritage Executive Slick-Back",
    fade: "The Precision Skin Taper Fade",
    crop: "The Urban Textured French Crop",
  };

  // Calculate Matches
  const matchedShops = (() => {
    const pool = barbershops.filter((b) => b.city === city);
    if (tier === "top") {
      pool.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else {
      pool.sort((a, b) => b.reviews - a.reviews || b.rating - a.rating);
    }
    return pool.slice(0, 3);
  })();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0e12] border border-[#e5a93c]/40 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl shadow-black gold-border-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#181b24] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close matchmaker"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-xs font-bold text-[#e5a93c] tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithmic Consultation</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
            Barber &amp; Hairstyle Matchmaker
          </h2>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#181b24] rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c98e29] to-[#e5a93c] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: City */}
        {step === 1 && (
          <div>
            <h3 className="font-sans font-bold text-lg text-white mb-1">
              Step 1: Which metropolitan hub are you located in?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              We&apos;ll calibrate matches strictly within your accessible territory.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setCity("South Jakarta");
                  setStep(2);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">🏙️</div>
                <h4 className="font-bold text-sm text-white">South Jakarta</h4>
                <p className="text-xs text-zinc-400">Senopati, Kemang, Kebayoran, SCBD, Cilandak, Fatmawati</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCity("Bandung");
                  setStep(2);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">⛰️</div>
                <h4 className="font-bold text-sm text-white">Bandung</h4>
                <p className="text-xs text-zinc-400">Dago, Riau, Dipatiukur, Pasirkaliki, Buahbatu, Sukajadi</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vibe */}
        {step === 2 && (
          <div>
            <h3 className="font-sans font-bold text-lg text-white mb-1">
              Step 2: What is your primary aesthetic vibe?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              Select the silhouette that aligns with your daily routine and face structure.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setVibe("fade");
                  setStep(3);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">⚡</div>
                <h4 className="font-bold text-sm text-white">Modern Taper &amp; Beard</h4>
                <p className="text-xs text-zinc-400">Crisp skin fade, laser line-ups, sculpted beard, high contrast</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVibe("classic");
                  setStep(3);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">🎩</div>
                <h4 className="font-bold text-sm text-white">Corporate Executive</h4>
                <p className="text-xs text-zinc-400">Timeless pompadour, clean side part, slick back, boardroom ready</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVibe("crop");
                  setStep(3);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">✂️</div>
                <h4 className="font-bold text-sm text-white">Casual Textured Crop</h4>
                <p className="text-xs text-zinc-400">Textured fringe, low maintenance, matte finish, effortless daily wear</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Tier */}
        {step === 3 && (
          <div>
            <h3 className="font-sans font-bold text-lg text-white mb-1">
              Step 3: What service tier are you prioritizing?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              From elite rated sanctuaries to high-volume popular neighborhood favorites.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setTier("top");
                  setStep(4);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">👑</div>
                <h4 className="font-bold text-sm text-white">Elite &amp; Highest Rated (4.9★+)</h4>
                <p className="text-xs text-zinc-400">Premier capsters, hot towels, complimentary beverages, luxury lounge</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTier("popular");
                  setStep(4);
                }}
                className="p-4 rounded-xl bg-[#12141a] border border-white/10 hover:border-[#e5a93c] text-left transition-all hover:translate-x-1"
              >
                <div className="text-2xl mb-1">🔥</div>
                <h4 className="font-bold text-sm text-white">Most Popular &amp; High Volume</h4>
                <p className="text-xs text-zinc-400">Proven consistency with 100+ positive customer reviews</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#25d366]/15 border border-[#25d366]/30 text-[#25d366] text-xs font-bold mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>Match Complete</span>
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                {cutTitles[vibe]}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Here are the 3 top verified barbershops in {city} matching your preference:
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {matchedShops.map((shop) => {
                const waText = encodeURIComponent(
                  `Hello ${shop.name}, I matched with your barbershop on Crown & Blade for a haircut appointment!`
                );
                const fullWa = shop.whatsapp_url ? `${shop.whatsapp_url}?text=${waText}` : null;

                return (
                  <div
                    key={shop.id}
                    className="p-4 rounded-xl bg-[#12141a] border border-[#e5a93c]/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">{shop.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-[#e5a93c] mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
                        <span>{shop.rating.toFixed(1)}</span>
                        <span className="text-zinc-500 font-normal">({shop.reviews} reviews)</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-1">{shop.address}</p>
                    </div>

                    {fullWa && (
                      <a
                        href={fullWa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-[#25d366] hover:bg-[#1ebd5a] text-black font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-md shadow-[#25d366]/20"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={restartQuiz}
              className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Matchmaker Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
