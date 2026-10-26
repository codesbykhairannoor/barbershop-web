"use client";

import { useState, useEffect } from "react";
import { servicesList } from "./Services";
import { MessageCircle, Shield, CheckCircle } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";

interface BookingSectionProps {
  selectedService: string;
  setSelectedService: (s: string) => void;
  selectedBarber: string;
  setSelectedBarber: (b: string) => void;
}

export default function BookingSection({
  selectedService,
  setSelectedService,
  selectedBarber,
  setSelectedBarber,
}: BookingSectionProps) {
  const shop = useBarbershop();

  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  }, []);

  const [timeSlot, setTimeSlot] = useState("14:00 - 15:00 (Afternoon)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const barbers = [
    "Any available master barber",
    "Alex Pratama (Head Barber)",
    "Ryan Wijaya (Fade Specialist)",
    "Dimas Nugraha (Shave & Beard)",
  ];

  const timeSlots = [
    "10:00 - 11:00 (Morning)",
    "11:30 - 12:30 (Morning)",
    "13:30 - 14:30 (Afternoon)",
    "15:00 - 16:00 (Afternoon)",
    "17:00 - 18:00 (Evening)",
    "19:00 - 20:00 (Evening)",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanService = selectedService || "Signature Precision Cut";
    const cleanBarber = selectedBarber || "Any available master barber";
    const guestName = name.trim() || "Guest";
    const guestPhone = phone.trim() || "-";

    const message = `Hello ${shop.name}, I would like to book an appointment:
- Service: ${cleanService}
- Preferred Barber: ${cleanBarber}
- Date: ${date}
- Preferred Time: ${timeSlot}
- Name: ${guestName}
- WhatsApp: ${guestPhone}
${notes ? `- Note: ${notes}` : ""}

Please confirm if this slot is open. Thank you!`;

    const encoded = encodeURIComponent(message);
    const cleanShopPhone = shop.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanShopPhone.startsWith("0")
      ? "62" + cleanShopPhone.slice(1)
      : cleanShopPhone.startsWith("8")
      ? "62" + cleanShopPhone
      : cleanShopPhone || "6281214807192";

    const waUrl = `https://wa.me/${formattedPhone}?text=${encoded}`;

    setSubmitted(true);
    window.open(waUrl, "_blank");
  };

  return (
    <section className="py-20 bg-stone-100/70 border-b border-stone-200/80" id="booking">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#b47820] uppercase tracking-widest block mb-2">
            Instant Reservations
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-3">
            Reserve your chair at {shop.name}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Choose your service, preferred barber, and time slot. Your reservation goes directly to {shop.name}&apos;s studio WhatsApp ({shop.phone}).
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-stone-900 mb-2">
                Booking request initiated!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                Your WhatsApp has been opened with your appointment details directly to {shop.name}. Their concierge will reply shortly to lock in your chair.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Row 1: Service & Barber */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="serviceSelect" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select Service *
                  </label>
                  <select
                    id="serviceSelect"
                    value={selectedService || "Signature Precision Cut"}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none cursor-pointer transition-all"
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="barberSelect" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Preferred Barber
                  </label>
                  <select
                    id="barberSelect"
                    value={selectedBarber || "Any available master barber"}
                    onChange={(e) => setSelectedBarber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none cursor-pointer transition-all"
                  >
                    {barbers.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="dateInput" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Preferred Date *
                  </label>
                  <input
                    id="dateInput"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="timeSlotSelect" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Preferred Time Window *
                  </label>
                  <select
                    id="timeSlotSelect"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none cursor-pointer transition-all"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="guestName" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Your Full Name *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Raditya Pratama"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="guestPhone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    id="guestPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0812-3456-7890"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notesInput" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Special Notes or Desired Style (Optional)
                </label>
                <input
                  id="notesInput"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Skin fade, beard sculpting, or sensitive scalp"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-[#16a34a] hover:bg-[#15803d] shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm &amp; Book via {shop.name}&apos;s WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-stone-400" />
                  <span>Direct to {shop.phone}</span>
                </span>
                <span>&bull;</span>
                <span>Free cancellation anytime</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
