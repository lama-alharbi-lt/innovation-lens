/* ══════════════════════════════════════════════
   Innovation Lens — main.js
   ══════════════════════════════════════════════ */

// ── State ──
let currentLang = "ar";

// ── SCAMPER dimension colors ──
const DIM_COLORS = {
  S: "#ff6b6b",
  C: "#ffa94d",
  A: "#ffe066",
  M: "#69db7c",
  P: "#4dabf7",
  E: "#9775fa",
  R: "#f783ac",
};

// ── i18n strings ──
const i18n = {
  ar: {
    heroEyebrow: "ما هو إطار SCAMPER؟",
    heroTitle: 'اكتشف <span class="gradient-text">الابتكار</span><br/>من حولك',
    heroDesc: 'أدخل أي منتج أو تطبيق أو فكرة، وستكشف لك الأداة <em>لماذا</em> هي مبتكرة — من خلال تحليل دقيق وفق أبعاد SCAMPER السبعة.',
    heroPurpose: "الهدف من هذه الأداة تنمية الوعي بالابتكار وتطوير تفكيرك النقدي تجاه المنتجات والأفكار من حولك.",
    inputLabel: "أدخل الابتكار الذي تريد تحليله",
    inputPlaceholder: "مثال: Airbnb، Uber، كاميرا iPhone، أكواب القهوة القابلة للتحلل...",
    analyzeBtn: "تحليل ←",
    inputHint: 'اضغط Enter أو انقر على "تحليل" للبدء',
    loadingText: "جارٍ التحليل عبر عدسة الابتكار...",
    resultsSubtitle: "تحليل SCAMPER",
    summaryLabel: "خلاصة القول",
    analyzeAnother: "تحليل ابتكار آخر ←",
    examplesEyebrow: "أمثلة توضيحية",
    examplesTitle: "استلهم من هذه الأمثلة",
    footerTagline: "أداة تعليمية لتنمية الوعي بالابتكار",
    modalTitle: "ما هو إطار SCAMPER؟",
    modalIntro: "SCAMPER هو إطار تفكير إبداعي طوّره Bob Eberle بهدف توليد أفكار مبتكرة عن طريق إعادة النظر في المنتجات والعمليات من زوايا مختلفة. كل حرف يمثّل أسلوباً مختلفاً للابتكار.",
    errorEmpty: "الرجاء إدخال اسم المنتج أو الابتكار",
    errorGeneric: "حدث خطأ أثناء التحليل. حاول مرة أخرى.",
  },
  en: {
    heroEyebrow: "What is the SCAMPER framework?",
    heroTitle: 'Discover <span class="gradient-text">Innovation</span><br/>Around You',
    heroDesc: 'Enter any product, app, or idea and this tool will reveal <em>why</em> it\'s innovative — through a detailed analysis across the 7 SCAMPER dimensions.',
    heroPurpose: "This tool is designed to cultivate innovation awareness and sharpen your critical thinking about products and ideas around you.",
    inputLabel: "Enter the innovation you want to analyze",
    inputPlaceholder: "e.g. Airbnb, Uber, iPhone Camera, reusable coffee cups...",
    analyzeBtn: "Analyze →",
    inputHint: 'Press Enter or click "Analyze" to start',
    loadingText: "Analyzing through the Innovation Lens...",
    resultsSubtitle: "SCAMPER ANALYSIS",
    summaryLabel: "Key Takeaway",
    analyzeAnother: "→ Analyze Another",
    examplesEyebrow: "EXAMPLE INNOVATIONS",
    examplesTitle: "Get inspired by these examples",
    footerTagline: "An educational tool for innovation awareness",
    modalTitle: "What is the SCAMPER framework?",
    modalIntro: "SCAMPER is a creative thinking framework developed by Bob Eberle to generate innovative ideas by rethinking products and processes from different angles. Each letter represents a different approach to innovation.",
    errorEmpty: "Please enter a product or innovation name",
    errorGeneric: "An error occurred during analysis. Please try again.",
  },
};

// ── SCAMPER modal data ──
const scamperData = {
  ar: [
    { letter: "S", name: "الاستبدال — Substitute", desc: "استبدال مكوّن أو عملية بأخرى لتحسين المنتج أو الخدمة.", color: DIM_COLORS.S },
    { letter: "C", name: "الدمج — Combine", desc: "دمج عنصرين أو أكثر معاً لخلق قيمة جديدة.", color: DIM_COLORS.C },
    { letter: "A", name: "التكيّف — Adapt", desc: "تكييف فكرة أو حل من مجال آخر وتطبيقه في سياق جديد.", color: DIM_COLORS.A },
    { letter: "M", name: "التعديل — Modify", desc: "تعديل الحجم أو الشكل أو الخصائص لتحسين الأداء.", color: DIM_COLORS.M },
    { letter: "P", name: "توظيف جديد — Put to Other Use", desc: "استخدام المنتج أو الفكرة لغرض مختلف عن المقصود أصلاً.", color: DIM_COLORS.P },
    { letter: "E", name: "الحذف — Eliminate", desc: "إزالة عناصر غير ضرورية لتبسيط التجربة.", color: DIM_COLORS.E },
    { letter: "R", name: "العكس — Reverse", desc: "عكس الترتيب أو الأدوار أو الاتجاه لخلق منظور جديد.", color: DIM_COLORS.R },
  ],
  en: [
    { letter: "S", name: "Substitute", desc: "Replace a component or process with something else to improve the product.", color: DIM_COLORS.S },
    { letter: "C", name: "Combine", desc: "Merge two or more elements to create new value.", color: DIM_COLORS.C },
    { letter: "A", name: "Adapt", desc: "Adapt an idea or solution from another field and apply it in a new context.", color: DIM_COLORS.A },
    { letter: "M", name: "Modify", desc: "Change size, shape, or attributes to improve performance.", color: DIM_COLORS.M },
    { letter: "P", name: "Put to Other Use", desc: "Use the product or idea for a different purpose than originally intended.", color: DIM_COLORS.P },
    { letter: "E", name: "Eliminate", desc: "Remove unnecessary elements to simplify the experience.", color: DIM_COLORS.E },
    { letter: "R", name: "Reverse", desc: "Reverse the order, roles, or direction to create a new perspective.", color: DIM_COLORS.R },
  ],
};

// ── Examples ──
const examples = {
  ar: [
    { emoji: "🏠", name: "Airbnb", desc: "منصة تأجير المنازل" },
    { emoji: "🚗", name: "Uber", desc: "خدمة النقل الذكي" },
    { emoji: "📱", name: "كاميرا iPhone", desc: "التصوير بالهاتف الذكي" },
    { emoji: "🎧", name: "Spotify", desc: "بث الموسيقى" },
    { emoji: "📦", name: "Amazon Prime", desc: "التوصيل السريع" },
    { emoji: "🤖", name: "ChatGPT", desc: "الذكاء الاصطناعي التوليدي" },
  ],
  en: [
    { emoji: "🏠", name: "Airbnb", desc: "Home rental platform" },
    { emoji: "🚗", name: "Uber", desc: "Smart transportation" },
    { emoji: "📱", name: "iPhone Camera", desc: "Smartphone photography" },
    { emoji: "🎧", name: "Spotify", desc: "Music streaming" },
    { emoji: "📦", name: "Amazon Prime", desc: "Fast delivery" },
    { emoji: "🤖", name: "ChatGPT", desc: "Generative AI" },
  ],
};

// ══════════════════════════════════════════════
//  Initialization
// ══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  renderExamples();
  renderModalLetters();
  setupEnterKey();
});

function setupEnterKey() {
  const input = document.getElementById("innovationInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      analyzeInnovation();
    }
  });
}

// ══════════════════════════════════════════════
//  Language Switching
// ══════════════════════════════════════════════

function setLang(lang) {
  currentLang = lang;
  const t = i18n[lang];
  const html = document.documentElement;

  // Direction
  html.dir = lang === "ar" ? "rtl" : "ltr";
  html.lang = lang;

  // Toggle active button
  document.getElementById("btnAr").classList.toggle("active", lang === "ar");
  document.getElementById("btnEn").classList.toggle("active", lang === "en");

  // Update texts
  document.getElementById("heroEyebrow").textContent = t.heroEyebrow;
  document.getElementById("heroTitle").innerHTML = t.heroTitle;
  document.getElementById("heroDesc").innerHTML = t.heroDesc;
  document.getElementById("heroPurpose").textContent = t.heroPurpose;
  document.getElementById("inputLabel").textContent = t.inputLabel;
  document.getElementById("innovationInput").placeholder = t.inputPlaceholder;
  document.getElementById("analyzeBtn").textContent = t.analyzeBtn;
  document.getElementById("inputHint").textContent = t.inputHint;
  document.getElementById("loadingText").textContent = t.loadingText;
  document.getElementById("resultsSubtitle").textContent = t.resultsSubtitle;
  document.getElementById("summaryLabel").textContent = t.summaryLabel;
  document.getElementById("analyzeAnotherBtn").textContent = t.analyzeAnother;
  document.getElementById("examplesEyebrow").textContent = t.examplesEyebrow;
  document.getElementById("examplesTitle").textContent = t.examplesTitle;
  document.getElementById("footerTagline").textContent = t.footerTagline;
  document.getElementById("modalTitle").textContent = t.modalTitle;
  document.getElementById("modalIntro").textContent = t.modalIntro;

  // Update legend chip labels
  const chips = document.querySelectorAll(".chip-label");
  chips.forEach((chip) => {
    chip.textContent = chip.dataset[lang];
  });

  // Re-render dynamic sections
  renderExamples();
  renderModalLetters();
}

// Make it globally accessible
window.setLang = setLang;

// ══════════════════════════════════════════════
//  Render Examples
// ══════════════════════════════════════════════

function renderExamples() {
  const grid = document.getElementById("examplesGrid");
  const data = examples[currentLang];
  grid.innerHTML = data
    .map(
      (ex) => `
    <div class="example-card" onclick="fillExample('${ex.name}')">
      <span class="example-emoji">${ex.emoji}</span>
      <div class="example-name">${ex.name}</div>
      <div class="example-desc">${ex.desc}</div>
    </div>`
    )
    .join("");
}

function fillExample(name) {
  const input = document.getElementById("innovationInput");
  input.value = name;
  input.focus();
  // Scroll to input
  document.querySelector(".input-section").scrollIntoView({ behavior: "smooth", block: "center" });
}
window.fillExample = fillExample;

// ══════════════════════════════════════════════
//  Render Modal Letters
// ══════════════════════════════════════════════

function renderModalLetters() {
  const container = document.getElementById("modalLetters");
  const data = scamperData[currentLang];
  container.innerHTML = data
    .map(
      (item) => `
    <div class="modal-letter-row">
      <div class="modal-letter-badge" style="background:${item.color}">${item.letter}</div>
      <div class="modal-letter-info">
        <div class="modal-letter-name">${item.name}</div>
        <div class="modal-letter-desc">${item.desc}</div>
      </div>
    </div>`
    )
    .join("");
}

// ══════════════════════════════════════════════
//  Modal
// ══════════════════════════════════════════════

function openModal() {
  document.getElementById("scamperModal").classList.add("open");
  document.body.style.overflow = "hidden";
}
window.openModal = openModal;

function closeModal() {
  document.getElementById("scamperModal").classList.remove("open");
  document.body.style.overflow = "";
}
window.closeModal = closeModal;

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) closeModal();
}
window.handleBackdropClick = handleBackdropClick;

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ══════════════════════════════════════════════
//  Analysis — Core Logic
// ══════════════════════════════════════════════

async function analyzeInnovation() {
  const input = document.getElementById("innovationInput");
  const value = input.value.trim();
  const t = i18n[currentLang];

  // Validate
  if (!value) {
    showError(t.errorEmpty);
    return;
  }

  hideError();
  showLoading(true);
  hideResults();

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ innovation: value, lang: currentLang }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || t.errorGeneric);
    }

    const data = await res.json();
    renderResults(value, data);
  } catch (err) {
    showError(err.message || t.errorGeneric);
  } finally {
    showLoading(false);
  }
}
window.analyzeInnovation = analyzeInnovation;

// ══════════════════════════════════════════════
//  Render Results
// ══════════════════════════════════════════════

function renderResults(innovationName, data) {
  const grid = document.getElementById("dimensionsGrid");
  const dims = data.dimensions || [];

  document.getElementById("innovationTitle").textContent = innovationName;

  grid.innerHTML = dims
    .map((dim, i) => {
      const color = DIM_COLORS[dim.letter] || "#4dabf7";
      return `
      <div class="dim-card" style="--dim-color:${color}; animation-delay:${i * 0.08}s">
        <div class="dim-top">
          <div class="dim-label">
            <div class="dim-letter" style="background:${color}">${dim.letter}</div>
            <span class="dim-name">${dim.name}</span>
          </div>
          <span class="dim-score" style="color:${color}">${dim.score}%</span>
        </div>
        <div class="dim-bar-track">
          <div class="dim-bar-fill" style="background:${color}" data-width="${dim.score}"></div>
        </div>
        <p class="dim-explanation">${dim.explanation}</p>
      </div>`;
    })
    .join("");

  document.getElementById("summaryText").textContent = data.summary || "";

  // Show section
  const section = document.getElementById("resultsSection");
  section.classList.add("active");

  // Hide examples
  document.getElementById("examplesSection").style.display = "none";

  // Animate bars after a tick
  requestAnimationFrame(() => {
    setTimeout(() => {
      grid.querySelectorAll(".dim-bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.width + "%";
      });
    }, 100);
  });

  // Scroll to results
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ══════════════════════════════════════════════
//  Reset
// ══════════════════════════════════════════════

function resetTool() {
  hideResults();
  document.getElementById("innovationInput").value = "";
  document.getElementById("examplesSection").style.display = "";
  document.querySelector(".hero").scrollIntoView({ behavior: "smooth", block: "start" });
}
window.resetTool = resetTool;

// ══════════════════════════════════════════════
//  Helpers
// ══════════════════════════════════════════════

function showLoading(show) {
  document.getElementById("loadingState").classList.toggle("active", show);
  document.getElementById("analyzeBtn").disabled = show;
}

function hideResults() {
  document.getElementById("resultsSection").classList.remove("active");
}

function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.classList.add("visible");
}

function hideError() {
  const el = document.getElementById("errorMsg");
  el.textContent = "";
  el.classList.remove("visible");
}
