"use client";

import { useLanguageStore } from "@/store/languageStore";

const content = {
  en: {
    badge: "Contact Us",
    title: "We'd love to hear from you",
    subtitle: "Have a question about a product or your order? Reach out and we'll get back to you as soon as possible.",
    phone: { label: "Phone", value: "050-415-8044", href: "tel:0504158044" },
    email: { label: "Email", value: "yehudit2359@gmail.com", href: "mailto:yehudit2359@gmail.com" },
    hours: { label: "Hours", value: "Sun – Thu  9:00 – 18:00" },
    formTitle: "Send us a message",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Your message…",
    send: "Send message",
    sent: "Message sent! We'll be in touch soon.",
  },
  he: {
    badge: "יצירת קשר",
    title: "שמחים לשמוע מכם",
    subtitle: "יש לכם שאלה על מוצר או הזמנה? פנו אלינו ונחזור אליכם בהקדם.",
    phone: { label: "טלפון", value: "050-415-8044", href: "tel:0504158044" },
    email: { label: "מייל", value: "yehudit2359@gmail.com", href: "mailto:yehudit2359@gmail.com" },
    hours: { label: "שעות פעילות", value: "א׳ – ה׳  9:00 – 18:00" },
    formTitle: "שלחו לנו הודעה",
    namePlaceholder: "השם שלך",
    emailPlaceholder: "האימייל שלך",
    messagePlaceholder: "ההודעה שלך…",
    send: "שלח הודעה",
    sent: "ההודעה נשלחה! ניצור איתך קשר בקרוב.",
  },
};

export default function ContactContent() {
  const lang = useLanguageStore((s) => s.lang);
  const t = content[lang];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector("button[type='submit']") as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = t.sent;
  }

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="max-w-3xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
          {t.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {t.title}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-md mx-auto">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Contact details */}
        <div className="flex flex-col gap-4">
          {[t.phone, t.email].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-colors group"
            >
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                <p className="text-gray-800 font-medium group-hover:text-emerald-600 transition-colors">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                {t.hours.label}
              </p>
              <p className="text-gray-800 font-medium">{t.hours.value}</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4"
        >
          <h2 className="font-bold text-gray-800 text-base">{t.formTitle}</h2>
          <input
            type="text"
            required
            placeholder={t.namePlaceholder}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <textarea
            required
            rows={4}
            placeholder={t.messagePlaceholder}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t.send}
          </button>
        </form>
      </div>
    </div>
  );
}
