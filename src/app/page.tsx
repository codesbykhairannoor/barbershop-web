"use client";

import { useState } from "react";
import { BarbershopProvider } from "@/context/BarbershopContext";
import PitchBanner from "@/components/single/PitchBanner";
import Navbar from "@/components/single/Navbar";
import Hero from "@/components/single/Hero";
import Services from "@/components/single/Services";
import Lookbook from "@/components/single/Lookbook";
import Barbers from "@/components/single/Barbers";
import BookingSection from "@/components/single/BookingSection";
import Testimonials from "@/components/single/Testimonials";
import LocationHours from "@/components/single/LocationHours";
import Footer from "@/components/single/Footer";

function BarbershopApp() {
  const [selectedService, setSelectedService] = useState("Signature Precision Cut");
  const [selectedBarber, setSelectedBarber] = useState("Any available master barber");

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToBooking();
  };

  const handleSelectBarber = (barberName: string) => {
    setSelectedBarber(barberName);
    scrollToBooking();
  };

  const handleBookCut = () => {
    setSelectedService("Signature Precision Cut");
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] flex flex-col font-sans selection:bg-[#b47820] selection:text-white">
      {/* Pitch Banner for prospective owner */}
      <PitchBanner />

      {/* Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      {/* Hero */}
      <Hero onBookClick={scrollToBooking} />

      {/* Services & Pricing Menu */}
      <Services onSelectService={handleSelectService} />

      {/* Hairstyle Gallery / Lookbook */}
      <Lookbook onBookCut={handleBookCut} />

      {/* Team / Master Barbers */}
      <Barbers onSelectBarber={handleSelectBarber} />

      {/* Direct Booking Section */}
      <BookingSection
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedBarber={selectedBarber}
        setSelectedBarber={setSelectedBarber}
      />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Studio Location & Hours */}
      <LocationHours />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <BarbershopProvider>
      <BarbershopApp />
    </BarbershopProvider>
  );
}
