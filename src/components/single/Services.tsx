"use client";

import { useState } from "react";
import { Clock, Check, Sparkles } from "lucide-react";

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
    duration: "45 mins",
    price: "Rp 120,000",
    description: "Our signature haircut experience tailored to your head shape, facial proportions, and lifestyle.",
    features: [
      "Head shape & hair consultation",
      "Invigorating shampoo & scalp wash",
      "Straight razor warm lather neck clean",
      "Blow dry & premium pomade styling",
    ],
    popular: true,
  },
  {
    id: "hot-shave",
    name: "Royal Hot Towel Shave",
    category: "shave",
    duration: "35 mins",
    price: "Rp 90,000",
    description: "A traditional straight-razor ritual designed for an exceptionally close and soothing shave.",
    features: [
      "Double eucalyptus-steamed hot towels",
      "Warm artisanal lather application",
      "Precision straight razor glide",
      "Cold towel pore closure & aftershave balm",
    ],
  },
  {
    id: "exec-combo",
    name: "The Executive Grooming Combo",
    category: "combo",
    duration: "75 mins",
    price: "Rp 195,000",
    description: "The complete head-to-beard reset. Perfect before major meetings, events, or weekend getaways.",
    features: [
      "Signature precision haircut",
      "Royal straight razor hot towel shave",
      "Extended scalp & shoulder tension massage",
      "Complimentary styling product sample",
    ],
    popular: true,
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt & Clean Contour",
    category: "shave",
    duration: "25 mins",
    price: "Rp 65,000",
    description: "Shape, taper, and sharpen your beard line with scissors, clippers, and a straight razor finish.",
    features: [
      "Beard length taper & scissors work",
      "Sharp cheek & neckline contouring",
      "Warm towel wrap",
      "Nourishing sandalwood beard oil",
    ],
  },
  {
    id: "scalp-spa",
    name: "Scalp Detox & Hair Creambath",
    category: "treatment",
    duration: "45 mins",
    price: "Rp 150,000",
    description: "Deep restorative treatment for tired scalps, relieving tension, dryness, and product buildup.",
    features: [
      "Exfoliating clay scalp scrub",
      "Nutrient-rich hair creambath mask",
      "Upper back & shoulder acupressure",
      "Cooling hair tonic treatment",
    ],
  },
  {
    id: "junior-cut",
    name: "Junior Gentleman Cut (Under 12)",
    category: "haircut",
    duration: "30 mins",
    price: "Rp 85,000",
    description: "Patient, friendly haircut crafted specifically for young gentlemen with great attention to detail.",
    features: [
      "Gentle scissors & soft clippers",
      "Fun & relaxed environment",
      "Kid-safe organic styling paste",
      "Complimentary sweet treat",
    ],
  },
  {
    id: "grey-blend",
    name: "Grey Camouflage & Tone Blending",
    category: "treatment",
    duration: "40 mins",
    price: "Rp 180,000",
    description: "Subtle, ammonia-free demi-permanent tint to naturally tone down grey hair without looking artificial.",
    features: [
      "Natural shade matching",
      "Fades gradually without harsh roots",
      "Conditioning scalp rinse",
      "Takes only 15 minutes processing",
    ],
  },
  {
    id: "express-lineup",
    name: "Express Lineup & Neck Cleanup",
    category: "haircut",
    duration: "20 mins",
    price: "Rp 55,000",
    description: "Quick touch-up between your full haircut appointments to keep your edges looking razor-sharp.",
    features: [
      "Straight razor neck & sideburn clean",
      "Crisp hairline edge cleanup",
      "Fast refreshing splash of tonic",
    ],
  },
];

export default function Services({ onSelectService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<"all" | "haircut" | "shave" | "combo" | "treatment">("all");

  const filteredServices = servicesList.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  return (
    <section className="py-20 bg-white border-b border-stone-200/80" id="services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#b47820] uppercase tracking-widest block mb-2">
            Transparent Pricing &amp; Rituals
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Services crafted for the modern man
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every service includes a dedicated consultation, hair wash, and hot towel neck finish. No surprise add-on fees.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {[
            { id: "all", label: "All services" },
            { id: "haircut", label: "Haircuts" },
            { id: "shave", label: "Shave & beard" },
            { id: "combo", label: "Executive combos" },
            { id: "treatment", label: "Scalp & treatments" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 sm:p-7 border transition-all flex flex-col justify-between ${
                service.popular
                  ? "bg-stone-50/70 border-amber-300 shadow-sm"
                  : "bg-white border-stone-200 hover:border-stone-300 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-xl text-stone-900">
                        {service.name}
                      </h3>
                      {service.popular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <span className="font-display font-bold text-xl text-stone-900 shrink-0">
                    {service.price}
                  </span>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-stone-600">
                      <Check className="w-3.5 h-3.5 text-[#b47820] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(service.name)}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Book this service</span>
                <span className="text-[#b47820] group-hover:text-amber-300">&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
