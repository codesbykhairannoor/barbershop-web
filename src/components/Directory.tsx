"use client";

import { useState, useMemo, useEffect } from "react";
import { Barbershop } from "@/types/barbershop";
import { Search, X, Star, MapPin, MessageCircle, Navigation, Building2, GraduationCap } from "lucide-react";

interface DirectoryProps {
  barbershops: Barbershop[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenDetail: (shop: Barbershop) => void;
}

const PAGE_SIZE = 18;

export default function Directory({
  barbershops,
  searchQuery,
  setSearchQuery,
  onOpenDetail,
}: DirectoryProps) {
  const [cityFilter, setCityFilter] = useState<"all" | "South Jakarta" | "Bandung">("all");
  const [sortBy, setSortBy] = useState<"rating_desc" | "reviews_desc" | "name_asc">("rating_desc");
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [hasWaOnly, setHasWaOnly] = useState(false);
  const [hasLandmarkOnly, setHasLandmarkOnly] = useState(false);
  const [landmarkFilter, setLandmarkFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [cityFilter, sortBy, topRatedOnly, hasWaOnly, hasLandmarkOnly, landmarkFilter, searchQuery]);

  // Counts
  const countAll = barbershops.length;
  const countJaksel = useMemo(() => barbershops.filter((b) => b.city === "South Jakarta").length, [barbershops]);
  const countBandung = useMemo(() => barbershops.filter((b) => b.city === "Bandung").length, [barbershops]);

  // Filtered & Sorted List
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const result = barbershops.filter((item) => {
      // City
      if (cityFilter !== "all" && item.city !== cityFilter) return false;

      // Toggles
      if (topRatedOnly && !item.is_top_rated) return false;
      if (hasWaOnly && !item.whatsapp_url) return false;
      if (hasLandmarkOnly && !item.nearby_campus && !item.nearby_office) return false;

      // Landmark dropdown
      if (landmarkFilter !== "all") {
        const lq = landmarkFilter.toLowerCase();
        const campus = (item.nearby_campus || "").toLowerCase();
        const office = (item.nearby_office || "").toLowerCase();
        const addr = (item.address || "").toLowerCase();
        if (!campus.includes(lq) && !office.includes(lq) && !addr.includes(lq)) {
          return false;
        }
      }

      // Query
      if (q) {
        const name = (item.name || "").toLowerCase();
        const addr = (item.address || "").toLowerCase();
        const campus = (item.nearby_campus || "").toLowerCase();
        const office = (item.nearby_office || "").toLowerCase();
        const type = (item.service_type || "").toLowerCase();

        return (
          name.includes(q) ||
          addr.includes(q) ||
          campus.includes(q) ||
          office.includes(q) ||
          type.includes(q)
        );
      }

      return true;
    });

    // Sort
    if (sortBy === "rating_desc") {
      result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (sortBy === "reviews_desc") {
      result.sort((a, b) => b.reviews - a.reviews || b.rating - a.rating);
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [barbershops, cityFilter, sortBy, topRatedOnly, hasWaOnly, hasLandmarkOnly, landmarkFilter, searchQuery]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, currentPage]);

  const scrollToDirectory = () => {
    const el = document.getElementById("directory");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetAllFilters = () => {
    setCityFilter("all");
    setSearchQuery("");
    setSortBy("rating_desc");
    setTopRatedOnly(false);
    setHasWaOnly(false);
    setHasLandmarkOnly(false);
    setLandmarkFilter("all");
    setCurrentPage(1);
  };

  return (
    <section className="py-20 bg-[#0d0e12] border-t border-white/8 relative z-10" id="directory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-bold tracking-widest uppercase mb-2">
              Authentic Database
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
              The Complete Barbershop Directory
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              Search, filter, compare ratings, and instantly connect via WhatsApp with verified barbershops in Jakarta Selatan and Bandung.
            </p>
          </div>
          <div className="self-start md:self-end px-4 py-2 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs sm:text-sm font-bold tracking-wide">
            {filteredList.length.toLocaleString()} Barbershops Found
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="bg-[#12141a] border border-white/10 rounded-2xl p-5 sm:p-6 mb-10 shadow-xl">
          {/* City Selector Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap border-b border-white/10 pb-5 mb-5">
            <button
              type="button"
              onClick={() => setCityFilter("all")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                cityFilter === "all"
                  ? "bg-[#e5a93c] text-black shadow-lg shadow-[#e5a93c]/25"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <span>All Cities</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${cityFilter === "all" ? "bg-black/20 text-black" : "bg-black/40 text-zinc-300"}`}>
                {countAll.toLocaleString()}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCityFilter("South Jakarta")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                cityFilter === "South Jakarta"
                  ? "bg-[#e5a93c] text-black shadow-lg shadow-[#e5a93c]/25"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <span>South Jakarta</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${cityFilter === "South Jakarta" ? "bg-black/20 text-black" : "bg-black/40 text-zinc-300"}`}>
                {countJaksel.toLocaleString()}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCityFilter("Bandung")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                cityFilter === "Bandung"
                  ? "bg-[#e5a93c] text-black shadow-lg shadow-[#e5a93c]/25"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <span>Bandung</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${cityFilter === "Bandung" ? "bg-black/20 text-black" : "bg-black/40 text-zinc-300"}`}>
                {countBandung.toLocaleString()}
              </span>
            </button>
          </div>

          {/* Search Bar + Selects */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <div className="md:col-span-2 flex items-center bg-[#07080a] border border-white/10 focus-within:border-[#e5a93c] rounded-xl px-3.5 py-2.5 transition-colors">
              <Search className="w-4 h-4 text-[#e5a93c] shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, road, district (Kebayoran, Dago, Kemang)..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-zinc-200 placeholder-zinc-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-500 hover:text-white p-1"
                  aria-label="Clear filter"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting Select */}
            <div>
              <label htmlFor="sortSelect" className="sr-only">Sort by</label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating_desc" | "reviews_desc" | "name_asc")}
                className="w-full bg-[#07080a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 outline-none cursor-pointer"
              >
                <option value="rating_desc">Highest Rating (5.0 &rarr; 1.0)</option>
                <option value="reviews_desc">Most Reviewed / Popular</option>
                <option value="name_asc">Name (A &rarr; Z)</option>
              </select>
            </div>

            {/* Landmark Select */}
            <div>
              <label htmlFor="landmarkSelect" className="sr-only">Nearby Landmark</label>
              <select
                id="landmarkSelect"
                value={landmarkFilter}
                onChange={(e) => setLandmarkFilter(e.target.value)}
                className="w-full bg-[#07080a] border border-white/10 focus:border-[#e5a93c] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 outline-none cursor-pointer"
              >
                <option value="all">Any Campus / District</option>
                <option value="ITB">Near ITB Bandung</option>
                <option value="UNPAD">Near UNPAD Bandung</option>
                <option value="Telkom">Near Telkom University</option>
                <option value="UI">Near Univ. Indonesia / Depok border</option>
                <option value="SCBD">Near SCBD / Sudirman</option>
                <option value="Simatupang">Near TB Simatupang</option>
                <option value="Kuningan">Near Mega Kuningan</option>
              </select>
            </div>
          </div>

          {/* Toggle Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <button
              type="button"
              onClick={() => setTopRatedOnly(!topRatedOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                topRatedOnly
                  ? "bg-[#e5a93c]/20 text-[#f6d288] border border-[#e5a93c]"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#e5a93c] fill-[#e5a93c]" />
              <span>Top Rated Only (4.8+★)</span>
            </button>

            <button
              type="button"
              onClick={() => setHasWaOnly(!hasWaOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hasWaOnly
                  ? "bg-[#25d366]/20 text-[#25d366] border border-[#25d366]"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
              <span>Instant WhatsApp Enabled</span>
            </button>

            <button
              type="button"
              onClick={() => setHasLandmarkOnly(!hasLandmarkOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hasLandmarkOnly
                  ? "bg-[#e5a93c]/20 text-[#f6d288] border border-[#e5a93c]"
                  : "bg-[#181b24] text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>Near Campus / CBD Only</span>
            </button>

            <button
              type="button"
              onClick={resetAllFilters}
              className="ml-auto text-xs text-zinc-400 hover:text-white underline p-1.5"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        {filteredList.length === 0 ? (
          <div className="text-center py-20 px-4 bg-[#12141a] rounded-2xl border border-white/10">
            <span className="text-4xl mb-3 block">✂️</span>
            <h3 className="font-serif font-bold text-xl text-white mb-2">No barbershops found</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              We couldn&apos;t find any establishment matching your current filter criteria. Try adjusting your query or resetting all filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-5 py-2.5 rounded-lg bg-[#e5a93c] text-black font-bold text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedItems.map((shop) => {
              const isJaksel = shop.city === "South Jakarta";
              const mapsLink =
                shop.maps_url ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.city)}`;

              // Custom WhatsApp message
              const waText = encodeURIComponent(
                `Hello ${shop.name}, I found your barbershop on Crown & Blade directory. I would like to book a haircut appointment. Do you have any available slots today? Thank you!`
              );
              const fullWaUrl = shop.whatsapp_url
                ? shop.whatsapp_url.includes("?")
                  ? `${shop.whatsapp_url}&text=${waText}`
                  : `${shop.whatsapp_url}?text=${waText}`
                : null;

              return (
                <article
                  key={shop.id}
                  onClick={() => onOpenDetail(shop)}
                  className="bg-[#12141a] border border-white/10 hover:border-[#e5a93c]/50 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 transition-all cursor-pointer group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                          isJaksel
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {shop.city}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs font-bold text-[#e5a93c]">
                          <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
                          <span>{shop.rating.toFixed(1)}</span>
                          <span className="text-[11px] text-zinc-500 font-normal">({shop.reviews})</span>
                        </div>
                        {shop.is_top_rated && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#e5a93c]/15 border border-[#e5a93c] text-[#f6d288]">
                            Top Rated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Shop Name */}
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white group-hover:text-[#f6d288] transition-colors mb-1 line-clamp-1">
                      {shop.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-3">
                      {shop.service_type || "Barbershop"}
                    </p>

                    {/* Address */}
                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {shop.address || "Address provided upon reservation."}
                    </p>

                    {/* Landmark Tag if available */}
                    {(shop.nearby_campus || shop.nearby_office) && (
                      <div className="mb-5 p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-xs text-zinc-300">
                        {shop.nearby_campus ? (
                          <>
                            <GraduationCap className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                            <span className="truncate">{shop.nearby_campus.split("(")[0]}</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                            <span className="truncate">{shop.nearby_office?.split("(")[0]}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2.5">
                    {fullWaUrl ? (
                      <a
                        href={fullWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#25d366] hover:bg-[#1ebd5a] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25d366]/20 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetail(shop);
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold transition-all"
                      >
                        View Details
                      </button>
                    )}

                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-lg bg-[#181b24] hover:bg-[#232734] border border-white/10 hover:border-[#e5a93c]/50 text-zinc-400 hover:text-[#e5a93c] flex items-center justify-center transition-all"
                      title="Google Maps Directions"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <span className="text-xs text-zinc-400">
              Showing {((currentPage - 1) * PAGE_SIZE + 1).toLocaleString()} to{" "}
              {Math.min(currentPage * PAGE_SIZE, filteredList.length).toLocaleString()} of{" "}
              {filteredList.length.toLocaleString()} barbershops
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  scrollToDirectory();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#12141a] border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &larr; Prev
              </button>

              <span className="px-3 py-1.5 text-xs font-bold text-[#e5a93c]">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  scrollToDirectory();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#12141a] border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
