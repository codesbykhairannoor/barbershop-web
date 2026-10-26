"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Scissors, User, Phone, CheckCircle, MessageSquare } from "lucide-react";
import { useBarbershop } from "@/context/BarbershopContext";
import { servicesList } from "./Services";

interface BookingSectionProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
  selectedBarber: string;
  setSelectedBarber: (barber: string) => void;
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
    // Populate today's date safely on client hydration
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const [timeSlot, setTimeSlot] = useState("14:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const barbersList = [
    "Barber siapa saja yang tersedia",
    "Alex Pratama (Head Barber)",
    "Ryan Wijaya (Fade Specialist)",
    "Dimas Nugraha (Shave & Beard)",
  ];

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedServiceObj = servicesList.find((s) => s.name === selectedService);
    const priceText = selectedServiceObj ? ` (${selectedServiceObj.price})` : "";

    const message = `Halo ${shop.name}, saya ingin booking jadwal potong rambut:\n\n` +
      `• Layanan: *${selectedService}${priceText}*\n` +
      `• Barber: *${selectedBarber}*\n` +
      `• Tanggal: *${date}*\n` +
      `• Jam: *${timeSlot} WIB*\n` +
      `• Nama: *${name || "Pelanggan"}*\n` +
      `• No. HP: *${phone || "-"}*\n` +
      (notes ? `• Catatan: _${notes}_\n\n` : "\n") +
      `Apakah slot waktu tersebut masih tersedia? Terima kasih!`;

    const cleanShopPhone = (shop.phone || "").replace(/[^0-9]/g, "");
    const formattedShopPhone = cleanShopPhone.startsWith("0")
      ? "62" + cleanShopPhone.slice(1)
      : cleanShopPhone.startsWith("8")
      ? "62" + cleanShopPhone
      : cleanShopPhone || "6281214807192";

    const waUrl = `https://wa.me/${formattedShopPhone}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    window.open(waUrl, "_blank");
  };

  return (
    <section className="py-12 sm:py-20 bg-stone-100/70 border-b border-stone-200/80" id="booking">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold text-[#b47820] block mb-2">
            Reservasi Kursi Cepat
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight mb-3">
            Pesan jadwal di {shop.name}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Pilih layanan, barber idaman, dan waktu kedatangan Anda. Permintaan booking akan langsung dikirim ke WhatsApp studio ({shop.phone}).
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 sm:py-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 mb-2">
                Permintaan booking telah terkirim!
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Aplikasi WhatsApp Anda telah terbuka dengan detail pesanan ke {shop.name}. Tim concierge akan segera mengonfirmasi ketersediaan kursi Anda.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 cursor-pointer"
              >
                Buat booking jadwal lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
              {/* Row 1: Service & Barber */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="serviceSelect" className="block text-xs font-semibold text-stone-700 mb-2">
                    Pilihan Layanan *
                  </label>
                  <select
                    id="serviceSelect"
                    value={selectedService || "Signature Precision Cut"}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 outline-none cursor-pointer transition-colors"
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="barberSelect" className="block text-xs font-semibold text-stone-700 mb-2">
                    Pilihan Barber *
                  </label>
                  <select
                    id="barberSelect"
                    value={selectedBarber || barbersList[0]}
                    onChange={(e) => setSelectedBarber(e.target.value)}
                    className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 outline-none cursor-pointer transition-colors"
                  >
                    {barbersList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="dateInput" className="block text-xs font-semibold text-stone-700 mb-2">
                    Tanggal Kunjungan *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="dateInput"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeSlotSelect" className="block text-xs font-semibold text-stone-700 mb-2">
                    Waktu Kedatangan *
                  </label>
                  <select
                    id="timeSlotSelect"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 outline-none cursor-pointer transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} WIB
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="guestName" className="block text-xs font-semibold text-stone-700 mb-2">
                    Nama Lengkap Anda *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="guestName"
                      placeholder="Contoh: Budi Santoso"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guestPhone" className="block text-xs font-semibold text-stone-700 mb-2">
                    Nomor WhatsApp Anda *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      id="guestPhone"
                      placeholder="0812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full min-h-[46px] bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notesInput" className="block text-xs font-semibold text-stone-700 mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="notesInput"
                  rows={2}
                  placeholder="Contoh: Ingin fade tipis di samping, atau rambut sedang agak tebal..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full min-h-[50px] py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Jadwal via WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-stone-500">
                Data jadwal Anda langsung dikirimkan ke WhatsApp resmi {shop.name}.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
