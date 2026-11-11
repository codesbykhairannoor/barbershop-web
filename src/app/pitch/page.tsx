"use client";

import { useState, useMemo } from "react";
import pitchLeadsData from "@/data/pitch_leads.json";
import { MessageSquare, ExternalLink, Copy, Check, Search, Star, Scissors } from "lucide-react";

export default function PitchPage() {
  const [activeBatch, setActiveBatch] = useState<1 | 2 | "all">(2);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState<"all" | "Jakarta" | "Bandung">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return pitchLeadsData.filter((lead) => {
      const matchBatch = activeBatch === "all" || lead.batch === activeBatch;
      const matchCity =
        cityFilter === "all" ||
        (cityFilter === "Jakarta" && lead.city.includes("Jakarta")) ||
        (cityFilter === "Bandung" && lead.city.includes("Bandung"));
      const matchQuery =
        lead.name.toLowerCase().includes(q) ||
        lead.address.toLowerCase().includes(q);
      return matchBatch && matchCity && matchQuery;
    });
  }, [search, cityFilter, activeBatch]);

  const handleCopy = (lead: typeof pitchLeadsData[0]) => {
    navigator.clipboard.writeText(lead.message);
    const key = `${lead.batch}-${lead.no}`;
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-6 shadow-md border border-stone-800">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </span>
            <h1 className="font-display font-bold text-xl sm:text-2xl">
              1-Click WhatsApp Pitch Engine
            </h1>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Tersedia <strong>Batch 1</strong> dan <strong>Batch 2</strong> (Total 200 Prospek Barbershop dengan nomor 100% berbeda). Tinggal klik tombol hijau <strong>&ldquo;Chat WA Langsung&rdquo;</strong> untuk membuka WhatsApp dengan pesan terpersonalisasi yang sudah siap kirim.
          </p>
        </div>

        {/* Batch Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
          <button
            onClick={() => setActiveBatch(2)}
            className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
              activeBatch === 2
                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>✨</span>
            <span>Batch 2 (100 Leads Baru)</span>
          </button>

          <button
            onClick={() => setActiveBatch(1)}
            className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
              activeBatch === 1
                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>📁</span>
            <span>Batch 1 (100 Leads Awal)</span>
          </button>

          <button
            onClick={() => setActiveBatch("all")}
            className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
              activeBatch === "all"
                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>🌐</span>
            <span>Semua (200 Leads)</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama barbershop atau wilayah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-stone-900 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCityFilter("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                cityFilter === "all"
                  ? "bg-stone-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Semua Kota
            </button>
            <button
              onClick={() => setCityFilter("Jakarta")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                cityFilter === "Jakarta"
                  ? "bg-stone-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Jakarta
            </button>
            <button
              onClick={() => setCityFilter("Bandung")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                cityFilter === "Bandung"
                  ? "bg-stone-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Bandung
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Tidak ada data yang cocok dengan pencarian.
            </div>
          ) : (
            filtered.map((lead) => {
              const itemKey = `${lead.batch}-${lead.no}`;
              const isCopied = copiedKey === itemKey;

              return (
                <div
                  key={itemKey}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col gap-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {lead.no}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-display font-bold text-base text-slate-900">
                            {lead.name}
                          </h2>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            lead.batch === 2
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            Batch {lead.batch}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 mt-1">
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{lead.rating} ({lead.reviews.toLocaleString()} ulasan)</span>
                          </span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            {lead.city}
                          </span>
                          <span className="font-mono text-slate-600">{lead.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message preview snippet */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                    {lead.message}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2.5 flex-wrap pt-1">
                    <a
                      href={lead.wa_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat WA Langsung</span>
                    </a>

                    <a
                      href={lead.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>Buka Demo</span>
                    </a>

                    <button
                      onClick={() => handleCopy(lead)}
                      className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Salin Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
