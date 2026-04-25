# 🔍 Innovation Lens — عدسة الابتكار

**أداة تعليمية تحلّل أي ابتكار وتكشف لماذا هو مبتكر وفق إطار SCAMPER**

---

## ما هي الأداة؟

Innovation Lens تأخذ أي منتج أو تطبيق أو فكرة وتحللها وفق أبعاد SCAMPER السبعة مع نسب مئوية توضح قوة كل بُعد.

**SCAMPER** = Substitute · Combine · Adapt · Modify · Put to Other Use · Eliminate · Reverse

---

## المميزات

- 🤖 تحليل ذكي مدعوم بـ Claude AI (Anthropic)
- 🌐 واجهة ثنائية اللغة — عربي (RTL) وإنجليزي
- 📊 نتائج بنسب مئوية مع شريط تقدم ملوّن لكل بُعد
- 📖 نافذة شرح تفاعلية لإطار SCAMPER
- 📱 متجاوب مع جميع الأجهزة

---

## هيكل المشروع

```
innovation-lens/
├── index.html          ← هيكل الصفحة
├── src/
│   ├── style.css       ← جميع التصميمات
│   └── main.js         ← جميع الوظائف والـ API
├── package.json
├── vite.config.js
├── netlify.toml
└── .gitignore
```

---

## تشغيل المشروع محلياً

```bash
npm install
npm run dev
```

---

## النشر

الأداة منشورة على Netlify متصلة بـ GitHub.
أي `push` على `main` يُحدّث الموقع تلقائياً عبر `npm run build`.

---

## التقنيات

- HTML · CSS · JavaScript (Vanilla) + Vite
- Anthropic Claude API (`claude-sonnet-4-6`)
- Google Fonts: Almarai + Outfit

---

## المطوّرة

**Lama Alharbi** — [LinkedIn](https://www.linkedin.com/in/lamatalalalharbi)

---

*أداة تعليمية لتنمية الوعي بالابتكار*
