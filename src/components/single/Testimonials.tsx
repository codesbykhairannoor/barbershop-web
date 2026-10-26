import { Star, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Bagas Adiputra",
      date: "3 days ago",
      service: "Signature Precision Cut",
      text: "Hands down the best fade in Senopati. Alex took time to ask how I style my hair in the morning and adapted the taper to my natural hairline. The complimentary iced coffee was a great touch.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Henderson",
      date: "1 week ago",
      service: "Royal Hot Towel Shave",
      text: "As an expat living in Jakarta for 4 years, I struggled to find a barber who understood classic straight-razor shaving. Dimas gave me the smoothest shave with zero irritation. Clean studio and great soundtrack.",
      rating: 5,
    },
    {
      id: 3,
      name: "Reza Farhan",
      date: "2 weeks ago",
      service: "The Executive Grooming Combo",
      text: "Booked via WhatsApp 1 hour ahead and was seated immediately. The hot towel treatment and head massage melted away all my office fatigue. Super professional, no awkward rush.",
      rating: 5,
    },
    {
      id: 4,
      name: "Kevin Pratama",
      date: "3 weeks ago",
      service: "Textured Crop & Beard Sculpt",
      text: "Ryan is a wizard with clippers. My French crop sits perfectly with zero styling effort every morning. Fair price for the level of care and clean aesthetic you get here.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200/80" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-3">
            Trusted by over 1,200 gentlemen
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Real feedback from regulars who trust us with their hair, beards, and morning routine.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{rev.name}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Client</span>
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                  <span className="text-xs text-stone-500 font-medium ml-2">
                    &bull; {rev.service}
                  </span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
