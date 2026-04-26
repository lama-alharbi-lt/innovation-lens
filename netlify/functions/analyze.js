// netlify/functions/analyze.js
// Serverless proxy — يحمي مفتاح API من الكشف في المتصفح

export default async function handler(req) {
  // Only POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "API key not configured on server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { innovation, lang } = await req.json();

    if (!innovation || innovation.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "الرجاء إدخال اسم الابتكار" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const isAr = lang === "ar";

    const systemPrompt = isAr
      ? `أنت محلل ابتكار خبير وصارم. حلّل الابتكار المُعطى وفق إطار SCAMPER السبعة.

قواعد التحليل الصارمة:
- كن انتقائياً جداً. ليس كل ابتكار يستخدم جميع الأبعاد السبعة.
- معظم الابتكارات تتميز في 2-4 أبعاد فقط. الأبعاد الباقية يجب أن تحصل على نسبة منخفضة (أقل من 40%).
- إذا كان البُعد لا ينطبق فعلياً على الابتكار، أعطه نسبة 0 إلى 20%.
- لا تتساهل في النسب. نسبة 80%+ تعني أن هذا البُعد هو جوهر الابتكار.
- رتّب الأبعاد من الأعلى نسبةً إلى الأقل.

أعد الإجابة بصيغة JSON فقط بدون أي نص إضافي أو علامات markdown.
الصيغة المطلوبة:
{
  "dimensions": [
    {
      "letter": "<حرف S/C/A/M/P/E/R>",
      "name": "<الاسم بالعربية (الاسم بالإنجليزية)>",
      "score": <رقم من 0 إلى 100>,
      "explanation": "<شرح مختصر بجملتين — فقط إذا كانت النسبة 50% أو أعلى. إذا كانت أقل من 50% اكتب جملة واحدة قصيرة>"
    }
  ],
  "summary": "<خلاصة بـ 2-3 جمل تركز على الأبعاد الأقوى فقط>"
}

مثال: Uber — الأبعاد الأقوى هي الاستبدال (استبدال التاكسي) والدمج (GPS + دفع + تقييم) والحذف (إزالة الحاجة للاتصال). أما التكيّف والعكس فلا ينطبقان بقوة.`
      : `You are a strict expert innovation analyst. Analyze the given innovation using the 7 SCAMPER dimensions.

Strict analysis rules:
- Be highly selective. Not every innovation uses all 7 dimensions.
- Most innovations excel in only 2-4 dimensions. Remaining dimensions should score below 40%.
- If a dimension does not genuinely apply, give it 0-20%.
- Do not inflate scores. 80%+ means this dimension is core to the innovation.
- Sort dimensions from highest score to lowest.

Return ONLY valid JSON with no extra text or markdown fences.
Required format:
{
  "dimensions": [
    {
      "letter": "<S/C/A/M/P/E/R>",
      "name": "<dimension name>",
      "score": <number 0-100>,
      "explanation": "<2 sentence explanation — only if score is 50%+. If below 50%, write one short sentence>"
    }
  ],
  "summary": "<2-3 sentence summary focusing only on the strongest dimensions>"
}

Example: Uber — strongest dimensions are Substitute (replacing taxis), Combine (GPS + payment + rating), and Eliminate (no need to call dispatch). Adapt and Reverse do not strongly apply.`;

    const userMessage = isAr
      ? `حلّل الابتكار التالي: "${innovation.trim()}"`
      : `Analyze the following innovation: "${innovation.trim()}"`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return new Response(
        JSON.stringify({ error: "فشل الاتصال بالذكاء الاصطناعي" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    // Strip markdown fences if present
    const clean = text.replace(/```json\s*/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(clean);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: "حدث خطأ أثناء التحليل. حاول مرة أخرى." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  path: "/api/analyze",
};
