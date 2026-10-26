"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import barbershopsData from "@/data/barbershops.json";

export interface BarbershopData {
  name: string;
  city: string;
  cityOrig: string;
  rating: number | string;
  reviews: number | string;
  address: string;
  phone: string;
  whatsappUrl: string;
  myWa: string;
  isPitch: boolean;
  claimUrl: string;
}

const DEFAULT_MY_WA = "6285718203535";

const defaultShopData: BarbershopData = {
  name: "The Modern Cut & Co.",
  city: "South Jakarta",
  cityOrig: "Jakarta Selatan",
  rating: 4.9,
  reviews: 1250,
  address: "Jl. Senopati No. 42, RT.6/RW.2, Selong, Kebayoran Baru, Jakarta Selatan 12190",
  phone: "0812-1480-7192",
  whatsappUrl: "https://wa.me/6281214807192",
  myWa: DEFAULT_MY_WA,
  isPitch: false,
  claimUrl: `https://wa.me/${DEFAULT_MY_WA}`,
};

const BarbershopContext = createContext<BarbershopData>(defaultShopData);

function QueryParamListener({
  onUpdate,
}: {
  onUpdate: (params: URLSearchParams) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onUpdate(searchParams);
  }, [searchParams, onUpdate]);
  return null;
}

export function BarbershopProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: BarbershopData;
}) {
  const [shop, setShop] = useState<BarbershopData>(initialData || defaultShopData);
  const pathname = usePathname();
  const params = useParams();

  const handleQueryUpdate = React.useCallback(
    (searchParams: URLSearchParams) => {
      const routeSlug =
        (params?.slug as string) ||
        (pathname?.startsWith("/p/") ? pathname.split("/p/")[1]?.split("/")[0] : null);

      const pParam = searchParams.get("p") || searchParams.get("slug") || searchParams.get("id");
      const nameParam = searchParams.get("name") || searchParams.get("shop");
      const cityParam = searchParams.get("city") || searchParams.get("kota");
      const ratingParam = searchParams.get("rating");
      const reviewsParam = searchParams.get("reviews") || searchParams.get("ulasan");
      const addressParam = searchParams.get("address") || searchParams.get("alamat");
      const phoneParam = searchParams.get("phone") || searchParams.get("wa");
      const myWaParam = searchParams.get("mywa") || DEFAULT_MY_WA;

      const lookupKey = routeSlug || pParam;

      let matched: any = null;
      if (lookupKey) {
        const decoded = decodeURIComponent(lookupKey).toLowerCase().trim();
        matched = barbershopsData.find(
          (b) =>
            b.slug.toLowerCase() === decoded ||
            String(b.id) === decoded ||
            b.name.toLowerCase().includes(decoded)
        );
      }

      const isPitchActive = Boolean(
        initialData?.isPitch ||
        matched ||
        lookupKey ||
        nameParam ||
        searchParams.get("pitch") === "true"
      );

      const base = initialData || defaultShopData;
      const resolvedName = nameParam || matched?.name || base.name;
      const resolvedCity = cityParam || matched?.city_orig || base.cityOrig;
      const resolvedRating = ratingParam || matched?.rating || base.rating;
      const resolvedReviews = reviewsParam || matched?.reviews || base.reviews;
      const resolvedAddress = addressParam || matched?.address || base.address;
      const resolvedPhone = phoneParam || matched?.phone || base.phone;

      const cleanPhone = (resolvedPhone || "").toString().replace(/[^0-9]/g, "");
      const formattedWa = cleanPhone.startsWith("0")
        ? "62" + cleanPhone.slice(1)
        : cleanPhone.startsWith("8")
        ? "62" + cleanPhone
        : cleanPhone;

      const waUrl = formattedWa ? `https://wa.me/${formattedWa}` : defaultShopData.whatsappUrl;

      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const claimMsg = encodeURIComponent(
        `Halo Mas, saya pemilik/manajemen dari *${resolvedName}* (${resolvedCity}). Saya sudah lihat preview websitenya di ${currentUrl}. Saya tertarik untuk pasang website ini ke domain resmi kami.`
      );
      const claimUrl = `https://wa.me/${myWaParam}?text=${claimMsg}`;

      setShop({
        name: resolvedName,
        city: resolvedCity === "Bandung" ? "Bandung" : "South Jakarta",
        cityOrig: resolvedCity,
        rating: resolvedRating,
        reviews: resolvedReviews,
        address: resolvedAddress,
        phone: resolvedPhone,
        whatsappUrl: waUrl,
        myWa: myWaParam,
        isPitch: isPitchActive,
        claimUrl: claimUrl,
      });

      if (isPitchActive && typeof document !== "undefined") {
        document.title = `${resolvedName} | Official Haircut & Grooming Studio`;
      }
    },
    [params, pathname, initialData]
  );

  return (
    <BarbershopContext.Provider value={shop}>
      <Suspense fallback={null}>
        <QueryParamListener onUpdate={handleQueryUpdate} />
      </Suspense>
      {children}
    </BarbershopContext.Provider>
  );
}

export function useBarbershop() {
  return useContext(BarbershopContext);
}
