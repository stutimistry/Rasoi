import { testimonials } from "../services/mockData";

function Stars({ rating }) {
  return (
    <div className="text-turmeric text-sm mb-3" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-ink/15">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white border-y border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-cardamom mb-3 text-center">
          Loved by home cooks
        </p>
        <h2 className="font-display text-3xl font-semibold text-center mb-12">
          What people are cooking up
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-papad border border-ink/10 rounded-xl p-6">
              <Stars rating={t.rating} />
              <p className="text-sm text-ink leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cardamom text-white flex items-center justify-center font-display text-sm font-semibold shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">{t.name}</p>
                  <p className="text-xs text-steel">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
