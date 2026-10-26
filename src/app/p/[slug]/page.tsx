import Home from "@/app/page";
import barbershopsData from "@/data/barbershops.json";

export async function generateStaticParams() {
  // Pre-render the top 100 pitch leads
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
    return {
      title: `${shop.name} | Official Barbershop & Grooming Studio`,
      description: `Official website & online WhatsApp reservations for ${shop.name} in ${shop.city_orig}. Rating: ⭐ ${shop.rating} (${shop.reviews} reviews). Address: ${shop.address}`,
      openGraph: {
        title: `${shop.name} - Official Barbershop & Grooming Studio`,
        description: `Experience classic haircutting, razor fades & beard trims at ${shop.name}. Book an appointment online.`,
        images: ["/assets/images/hero-light.jpg"],
      },
    };
  }

  return {
    title: "The Modern Cut & Co. | Premier Men's Barbershop & Grooming Studio",
    description: "Experience precision haircuts, royal hot-towel shaves, and beard grooming in a sunlit, welcoming modern studio.",
  };
}

export default function LeadPitchPage() {
  return <Home />;
}
