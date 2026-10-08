"use client";

import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";

const content = {
  en: {
    badge: "About Us",
    title: "Bringing premium nutrition to your door",
    subtitle:
      "Maxi Health has been a trusted name in kosher vitamins and supplements for over 40 years. We believe that feeling your best starts with the right nutrients — and we're here to make that simple, affordable, and accessible for every family.",
    valuesTitle: "Our values",
    values: [
      {
        icon: "✦",
        title: "Kosher certified",
        desc: "Every product is certified kosher, manufactured under strict rabbinical supervision.",
      },
      {
        icon: "✦",
        title: "No compromise on quality",
        desc: "We use premium raw materials and rigorous testing to ensure every capsule meets the highest standards.",
      },
      {
        icon: "✦",
        title: "Family first",
        desc: "From children's chewables to prenatal multivitamins, we cover every stage of life.",
      },
      {
        icon: "✦",
        title: "Cash on delivery",
        desc: "Order online and pay only when your order arrives at your door — no risk, no upfront payment.",
      },
    ],
    storyTitle: "Our story",
    story: [
      "Maxi Health was founded with a single mission: to provide the Jewish community with high-quality, kosher-certified vitamins and supplements that actually work. What started as a small family operation has grown into one of the most recognized names in kosher nutrition worldwide.",
      "Today, our full range includes over 200 products spanning multivitamins, minerals, omega-3s, probiotics, children's formulas, and more — all manufactured to pharmaceutical-grade standards and available for home delivery across Israel.",
    ],
    cta: "Shop all products",
    ctaLink: "/products",
  },
  he: {
    badge: "אודות",
    title: "תזונה מהמובחרים — עד הדלת שלך",
    subtitle:
      "מקסי הלט היא שם מוכר ומהימן בתחום הוויטמינים וגלולות הקוֹשֶר כבר למעלה מ-40 שנה. אנחנו מאמינים שהרגשה טובה מתחילה בחומרים מזינים נכונים — ואנחנו כאן כדי להפוך את זה לפשוט, משתלם ונגיש לכל משפחה.",
    valuesTitle: "הערכים שלנו",
    values: [
      {
        icon: "✦",
        title: "כשר למהדרין",
        desc: "כל מוצר מוסמך כשר, מיוצר תחת פיקוח רבני קפדני.",
      },
      {
        icon: "✦",
        title: "ללא פשרות על איכות",
        desc: "אנחנו משתמשים בחומרי גלם מהמובחרים ובבקרת איכות מחמירה כדי לוודא שכל כמוסה עומדת בסטנדרטים הגבוהים ביותר.",
      },
      {
        icon: "✦",
        title: "המשפחה קודמת",
        desc: "מסוכריות לעיסה לילדים ועד מולטי-ויטמין לנשים בהריון — יש לנו פתרון לכל שלב בחיים.",
      },
      {
        icon: "✦",
        title: "תשלום עם קבלה",
        desc: "מזמינים אונליין ומשלמים רק כשהחבילה מגיעה לדלת — ללא סיכון, ללא תשלום מראש.",
      },
    ],
    storyTitle: "הסיפור שלנו",
    story: [
      "מקסי הלט נוסדה עם משימה אחת: לספק לקהילה היהודית ויטמינים ותוספי תזונה כשרים באיכות גבוהה שבאמת עובדים. מה שהתחיל כעסק משפחתי קטן הפך לאחד השמות המוכרים ביותר בתחום התזונה הכשרה בעולם.",
      "היום, הקולקציה שלנו כוללת למעלה מ-200 מוצרים — מולטי-ויטמין, מינרלים, אומגה-3, פרוביוטיקה, פורמולות לילדים ועוד — כולם מיוצרים לפי סטנדרטים פרמצבטיים ומשוגרים ישירות לבתים ברחבי ישראל.",
    ],
    cta: "לכל המוצרים",
    ctaLink: "/products",
  },
};

export default function AboutContent() {
  const lang = useLanguageStore((s) => s.lang);
  const t = content[lang];

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="max-w-3xl mx-auto px-4 py-14">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
          {t.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {t.title}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Values */}
      <div className="mb-14">
        <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">{t.valuesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 items-start"
            >
              <span className="text-emerald-500 text-lg mt-0.5">{v.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 mb-1">{v.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="mb-14 bg-emerald-50 rounded-2xl p-7">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t.storyTitle}</h2>
        {t.story.map((p, i) => (
          <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href={t.ctaLink}
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
