"use client";

import { Barbershop } from "@/types/barbershop";
import { X, Star, Phone, MapPin, MessageCircle, Navigation, GraduationCap, Building2 } from "lucide-react";

interface DetailModalProps {
  shop: Barbershop | null;
  onClose: () => void;
}

export default function DetailModal({ shop, onClose }: DetailModalProps) {
  if (!shop) return null;

  const rawTemplate = `Hello ${shop.name}, I found your listing on Crown & Blade directory. I would like to check barber availability for an appointment today.`;
  const encodedMsg = encodeURIComponent(rawTemplate);
  const waUrl = shop.whatsapp_url
    ? shop.whatsapp_url.includes("?")
      ? `${shop.whatsapp_url}&text=${encodedMsg}`
      : `${shop.whatsapp_url}?text=${encodedMsg}`
    : null;

  const mapsLink =
    shop.maps_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.city)}`;

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
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#181b24] text-zinc-300">
            {shop.city}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-[#e5a93c] bg-[#181b24] px-2.5 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
            <span>{shop.rating.toFixed(1)}</span>
            <span className="text-zinc-500 font-normal">({shop.reviews} reviews)</span>
          </div>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {shop.service_type || "Barbershop"}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif font-black text-2xl sm:text-3xl text-white mb-6">
          {shop.name}
        </h2>

        {/* Address */}
        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
            Full Address &amp; Neighborhood
          </span>
          <p className="text-zinc-200 text-sm leading-relaxed flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#e5a93c] shrink-0 mt-0.5" />
            <span>{shop.address || "Address available upon contact."}</span>
          </p>
        </div>

        {/* Landmarks */}
        {(shop.nearby_campus || shop.nearby_office) && (
          <div className="flex gap-2 flex-wrap mb-6">
            {shop.nearby_campus && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-xs text-[#f6d288]">
                <GraduationCap className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>{shop.nearby_campus}</span>
              </div>
            )}
            {shop.nearby_office && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-xs text-[#f6d288]">
                <Building2 className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>{shop.nearby_office}</span>
              </div>
            )}
          </div>
        )}

        {/* Contact Info Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 bg-[#12141a] rounded-xl border border-white/5 flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">
              Direct Telephone
            </span>
            <span className="text-sm font-bold text-zinc-200 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>{shop.phone || "On Request"}</span>
            </span>
          </div>

          <div className="p-3.5 bg-[#12141a] rounded-xl border border-white/5 flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">
              Google Customer Score
            </span>
            <span className="text-sm font-bold text-[#e5a93c] flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#e5a93c]" />
              <span>{shop.rating.toFixed(1)} / 5.0</span>
              <span className="text-xs text-zinc-500 font-normal">({shop.reviews} ratings)</span>
            </span>
          </div>
        </div>

        {/* WhatsApp Pre-configured Template Preview */}
        <div className="p-4 bg-black/50 border border-white/5 rounded-xl mb-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#e5a93c] block mb-1.5">
            Pre-configured WhatsApp Concierge Message:
          </span>
          <p className="text-xs text-zinc-300 italic leading-relaxed">
            &ldquo;{rawTemplate}&rdquo;
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25d366] hover:bg-[#1ebd5a] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25d366]/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </a>
          )}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Navigation className="w-4 h-4 text-[#e5a93c]" />
            <span>Open Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
