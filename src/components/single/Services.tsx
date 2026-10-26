"use client";

import { useState } from "react";
import { Clock, Check, Sparkles, ArrowRight } from "lucide-react";

export interface ServiceItem {
  id: string;
  name: string;
  category: "haircut" | "shave" | "combo" | "treatment";
  duration: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const servicesList: ServiceItem[] = [
  {
    id: "sig-cut",
    name: "Signature Precision Cut",
    category: "haircut",
    duration: "45 menit",
    price: "Rp 120.000",
    description: "Layanan potong rambut andalan yang disesuaikan dengan proporsi wajah, struktur tengkorak, dan gaya hidup Anda.",
    features: [
      "Konsultasi pola rambut & bentuk kepala",
      "Keramas sampo segar & pijat kulit kepala",
      "Pembersihan garis leher dengan pisau cukur & busa hangat",
      "Blow dry & penataan rambut dengan pomade premium",
    ],
    popular: true,
  },
  {
    id: "hot-shave",
    name: "Royal Hot Towel Shave",
    category: "shave",
    duration: "35 menit",
    price: "Rp 90.000",
    description: "Ritual cukur tradisional menggunakan pisau lurus untuk hasil cukur yang sangat mulus dan menyegarkan.",
    features: [
      "Dua kali kompres handuk uap hangat beraroma eukaliptus",
      "Aplikasi busa hangat artisanal",
      "Cukur presisi dengan straight razor",
      "Kompres handuk dingin penutup pori & aftershave balm",
    ],
  },
  {
    id: "exec-combo",
    name: "The Executive Grooming Combo",
    category: "combo",
    duration: "75 menit",
    price: "Rp 195.000",
    description: "Paket lengkap potong rambut dan cukur jenggot. Solusi terbaik sebelum pertemuan penting atau acara spesial.",
    features: [
      "Signature precision haircut",
      "Royal straight razor hot towel shave",
      "Pijat relaksasi leher dan pundak",
      "Sampel produk styling rambut gratis",
    ],
    popular: true,
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt & Clean Contour",
    category: "shave",
    duration: "25 menit",
    price: "Rp 65.000",
    description: "Merapikan, membentuk, dan menajamkan garis kontur jenggot dengan gunting, clipper, dan sentuhan pisau cukur.",
    features: [
      "Penyesuaian panjang jenggot & guntingan rapi",
      "Garis pipi & leher yang tajam dan presisi",
      "Bungkus handuk hangat",
      "Minyak jenggot bernutrisi kayu cendana",
    ],
  },
  {
    id: "scalp-spa",
    name: "Scalp Detox & Hair Creambath",
    category: "treatment",
    duration: "45 menit",
    price: "Rp 150.000",
    description: "Perawatan memulihkan kulit kepala yang lelah, meredakan ketegangan, ketombe, dan sisa penumpukan minyak.",
    features: [
      "Scrub kulit kepala eksfoliasi tanah liat",
      "Masker creambath bernutrisi tinggi",
      "Pijatan akupresur punggung atas & pundak",
      "Tonic rambut pendingin dan penyegar",
    ],
  },
  {
    id: "junior-cut",
    name: "Junior Gentleman Cut (Di Bawah 12 Thn)",
    category: "haircut",
    duration: "30 menit",
    price: "Rp 85.000",
    description: "Potongan rambut sabar dan bersahabat khusus untuk anak-anak dengan perhatian penuh pada kenyamanan.",
    features: [
      "Gunting halus & mesin clipper ramah anak",
      "Suasana santai dan menyenangkan",
      "Pasta penata rambut organik yang aman",
      "Suguhan permen manis setelah selesai",
    ],
  },
  {
    id: "grey-blend",
    name: "Grey Camouflage & Tone Blending",
    category: "treatment",
    duration: "40 menit",
    price: "Rp 180.000",
    description: "Pewarnaan rambut halus bebas amonia untuk menyamarkan uban secara alami tanpa terlihat kaku atau mencolok.",
    features: [
      "Pencocokan warna rambut natural",
      "Memudar secara bertahap tanpa garis akar yang kontras",
      "Bilas kondisioner kulit kepala",
      "Proses cepat hanya 15 menit",
    ],
  },
  {
    id: "express-lineup",
    name: "Express Lineup & Neck Cleanup",
    category: "haircut",
    duration: "20 menit",
    price: "Rp 55.000",
    description: "Perapian cepat di antara jadwal potong rutin Anda untuk menjaga tepian rambut tetap tajam dan bersih.",
    features: [
      "Pembersihan leher & cambang dengan pisau cukur",
      "Perapian garis rambut dahi",
      "Semprotan hair tonic penyegar",
    ],
  },
];

export default function Services({ onSelectService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<"all" | "haircut" | "shave" | "combo" | "treatment">("all");

  const filteredServices = servicesList.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-stone-200/80" id="services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-xs font-semibold text-[#b47820] block mb-2">
            Layanan &amp; Daftar Harga
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-3 sm:mb-4">
            Layanan grooming untuk pria modern
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Semua layanan sudah termasuk sesi konsultasi, cuci rambut segar, dan kompres handuk hangat di leher. Tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Category Tabs (Smooth Horizontal Scroll on Mobile) */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-12 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "Semua Layanan" },
            { id: "haircut", label: "Potong Rambut" },
            { id: "shave", label: "Cukur & Jenggot" },
            { id: "combo", label: "Paket Kombo" },
            { id: "treatment", label: "Perawatan Kulit Kepala" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-5 sm:p-7 border transition-all flex flex-col justify-between ${
                service.popular
                  ? "bg-stone-50/70 border-amber-300 shadow-xs"
                  : "bg-white border-stone-200 hover:border-stone-300 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-stone-900">
                        {service.name}
                      </h3>
                      {service.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                          <Sparkles className="w-3 h-3" />
                          <span>Pilihan Favorit</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <span className="font-display font-bold text-base sm:text-xl text-stone-900 shrink-0">
                    {service.price}
                  </span>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  {service.description}
                </p>

                <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-stone-600">
                      <Check className="w-3.5 h-3.5 text-[#b47820] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(service.name)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Pilih Layanan Ini</span>
                <ArrowRight className="w-4 h-4 text-[#b47820] group-hover:text-amber-300 transition-colors" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
