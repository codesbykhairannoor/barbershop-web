"use client";

import { useState } from "react";
import { Barbershop } from "@/types/barbershop";
import { X, Sparkles } from "lucide-react";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopAdded: (newShop: Barbershop) => void;
}

export default function SubmitModal({ isOpen, onClose, onShopAdded }: SubmitModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState<"South Jakarta" | "Bandung">("South Jakarta");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanNum = phone.replace(/[^0-9]/g, "");
    const waUrl = cleanNum ? `https://wa.me/${cleanNum.startsWith("0") ? "62" + cleanNum.slice(1) : cleanNum}` : "";

    const newShop: Barbershop = {
      id: Date.now(),
      name: name.trim(),
      service_type: "Barbershop Atelier",
      city,
      city_orig: city === "South Jakarta" ? "Jakarta Selatan" : "Bandung",
      rating: 5.0,
      reviews: 1,
      phone,
      whatsapp_url: waUrl,
      address,
      nearby_campus: "",
      nearby_office: "",
      maps_url: mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + city)}`,
      tags: ["New Verification", "Community Added"],
      is_top_rated: true,
    };

    onShopAdded(newShop);
    onClose();
    setName("");
    setPhone("");
    setAddress("");
    setMapsUrl("");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0e12] border border-[#e5a93c]/40 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl shadow-black gold-border-glow"
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

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-xs font-bold text-[#e5a93c] tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Directory Partnership</span>
          </div>
          <h2 className="font-serif font-black text-2xl text-white">
            List Your Barbershop
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Feature your establishment across Jakarta &amp; Bandung. Get verified placement and direct WhatsApp lead routing.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="shopName" className="font-semibold text-zinc-300">
              Barbershop Name *
            </label>
            <input
              id="shopName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Gentlemen Grooming"
              className="bg-[#12141a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-4 py-2.5 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="shopCity" className="font-semibold text-zinc-300">
                Metropolitan Area *
              </label>
              <select
                id="shopCity"
                required
                value={city}
                onChange={(e) => setCity(e.target.value as "South Jakarta" | "Bandung")}
                className="bg-[#12141a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-3 py-2.5 text-white outline-none cursor-pointer"
              >
                <option value="South Jakarta">South Jakarta</option>
                <option value="Bandung">Bandung</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="shopPhone" className="font-semibold text-zinc-300">
                WhatsApp Number *
              </label>
              <input
                id="shopPhone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0812-3456-7890"
                className="bg-[#12141a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="shopAddress" className="font-semibold text-zinc-300">
              Full Physical Address *
            </label>
            <input
              id="shopAddress"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street name, building, or neighborhood"
              className="bg-[#12141a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-4 py-2.5 text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="shopMaps" className="font-semibold text-zinc-300">
              Google Maps URL (Optional)
            </label>
            <input
              id="shopMaps"
              type="url"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="https://maps.google.com/..."
              className="bg-[#12141a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-4 py-2.5 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#e5a93c] to-[#c98e29] hover:from-[#f6d288] hover:to-[#e5a93c] text-black font-bold text-xs sm:text-sm shadow-lg shadow-[#e5a93c]/20 transition-all"
          >
            Submit Barbershop for Verification
          </button>
        </form>
      </div>
    </div>
  );
}
