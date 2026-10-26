import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barbershop-web-demo.vercel.app"),
  title: "The Modern Cut & Co. | Premier Men's Barbershop & Grooming Studio",
  description: "Experience precision haircuts, royal hot-towel shaves, and beard grooming in a sunlit, welcoming modern studio. Book your appointment online today.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✂️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#fafaf9] text-[#1c1917] antialiased min-h-screen flex flex-col font-sans selection:bg-[#b47820] selection:text-white">
        {children}
      </body>
    </html>
  );
}
