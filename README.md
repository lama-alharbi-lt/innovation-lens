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
- 🔒 مفتاح API محمي عبر Netlify Functions (لا يُكشف في المتصفح)

---

## هيكل المشروع

```
innovation-lens/
├── index.html                  ← هيكل الصفحة
├── src/
│   ├── style.css               ← جميع التصميمات
│   └── main.js                 ← جميع الوظائف (frontend)
├── netlify/
│   └── functions/
│       └── analyze.js          ← Serverless function (API proxy)
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

> ⚠️ ملاحظة: الـ API لن يعمل محلياً إلا باستخدام `netlify dev` بدلاً من `npm run dev`

```bash
npm install -g netlify-cli
netlify dev
```

---

## النشر على Netlify

1. ارفعي المشروع على GitHub
2. في Netlify → New Site → Import from GitHub
3. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Environment Variables** (مهم جداً):
   - اذهبي إلى Site Settings → Environment Variables
   - أضيفي: `ANTHROPIC_API_KEY` = مفتاحك
5. انقري Deploy!

أي `push` على `main` يُحدّث الموقع تلقائياً.

---

## التقنيات

- HTML · CSS · JavaScript (Vanilla) + Vite
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- Netlify Functions (serverless proxy)
- Google Fonts: Almarai + Outfit

---

## المطوّرة

**Lama Alharbi** — [LinkedIn](https://www.linkedin.com/in/lamatalalalharbi)

---

*أداة تعليمية لتنمية الوعي بالابتكار*
