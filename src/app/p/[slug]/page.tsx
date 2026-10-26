import { BarbershopApp } from "@/app/page";
import { BarbershopProvider, BarbershopData } from "@/context/BarbershopContext";
import barbershopsData from "@/data/barbershops.json";
import { toTitleCase } from "@/utils/text";

export async function generateStaticParams() {
  // Pre-render top 100 pitch leads
  return barbershopsData.slice(0, 100).map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const slug = resolved?.slug?.toLowerCase();
  const shop = barbershopsData.find(
    (b) => b.slug.toLowerCase() === slug || String(b.id) === slug
  );

  if (shop) {
    const formattedName = toTitleCase(shop.name);
    return {
      title: `${formattedName} | Official Barbershop & Grooming Studio`,
      description: `Official website & online WhatsApp reservations for ${formattedName} in ${shop.city_orig}. Rating: ⭐ ${shop.rating} (${shop.reviews} reviews). Address: ${shop.address}`,
      openGraph: {
        title: `${formattedName} - Official Barbershop & Grooming Studio`,
        description: `Experience classic haircutting, razor fades & beard trims at ${formattedName}. Book an appointment online.`,
        images: ["/assets/images/hero-light.jpg"],
      },
    };
  }

  return {
    title: "The Modern Cut & Co. | Premier Men's Barbershop & Grooming Studio",
    description: "Experience precision haircuts, royal hot-towel shaves, and beard grooming in a sunlit, welcoming modern studio.",
  };
}

export default async function LeadPitchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const slug = resolved?.slug?.toLowerCase();
  const shop = barbershopsData.find(
    (b) => b.slug.toLowerCase() === slug || String(b.id) === slug
  );

  let initialShop: BarbershopData | undefined = undefined;

  if (shop) {
    const cleanPhone = (shop.phone || "").replace(/[^0-9]/g, "");
    const formattedWa = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone.startsWith("8")
      ? "62" + cleanPhone
      : cleanPhone;

    const defaultMyWa = "6285718203535";
    const formattedName = toTitleCase(shop.name);
    const claimMsg = encodeURIComponent(
      `Halo Mas, saya pemilik/manajemen dari *${formattedName}* (${shop.city_orig}). Saya sudah lihat preview websitenya di https://barbershop-web-demo.vercel.app/p/${shop.slug}. Saya tertarik untuk pasang website ini ke domain resmi kami.`
    );

    initialShop = {
      name: formattedName,
      city: shop.city_orig === "Bandung" ? "Bandung" : "South Jakarta",
      cityOrig: shop.city_orig,
      rating: shop.rating,
      reviews: shop.reviews,
      address: shop.address,
      phone: shop.phone || "0812-1480-7192",
      whatsappUrl: formattedWa ? `https://wa.me/${formattedWa}` : "https://wa.me/6281214807192",
      myWa: defaultMyWa,
      isPitch: true,
      claimUrl: `https://wa.me/${defaultMyWa}?text=${claimMsg}`,
    };
  }

  return (
    <BarbershopProvider initialData={initialShop}>
      <BarbershopApp />
    </BarbershopProvider>
  );
}
