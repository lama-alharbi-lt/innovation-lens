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
      ? `أنت محلل ابتكار خبير. حلّل الابتكار المُعطى وفق إطار SCAMPER السبعة.

أعد الإجابة بصيغة JSON فقط بدون أي نص إضافي أو علامات markdown.
الصيغة المطلوبة:
{
  "dimensions": [
    {
      "letter": "S",
      "name": "الاستبدال (Substitute)",
      "score": <رقم من 0 إلى 100>,
      "explanation": "<شرح مختصر بجملتين أو ثلاث>"
    },
    {
      "letter": "C",
      "name": "الدمج (Combine)",
      "score": <رقم>,
      "explanation": "<شرح>"
    },
    {
      "letter": "A",
      "name": "التكيّف (Adapt)",
      "score": <رقم>,
      "explanation": "<شرح>"
    },
    {
      "letter": "M",
      "name": "التعديل (Modify)",
      "score": <رقم>,
      "explanation": "<شرح>"
    },
    {
      "letter": "P",
      "name": "توظيف جديد (Put to Other Use)",
      "score": <رقم>,
      "explanation": "<شرح>"
    },
    {
      "letter": "E",
      "name": "الحذف (Eliminate)",
      "score": <رقم>,
      "explanation": "<شرح>"
    },
    {
      "letter": "R",
      "name": "العكس (Reverse)",
      "score": <رقم>,
      "explanation": "<شرح>"
    }
  ],
  "summary": "<خلاصة شاملة بـ 3-4 جمل عن سبب ابتكارية هذا المنتج/الفكرة>"
}`
      : `You are an expert innovation analyst. Analyze the given innovation using the 7 SCAMPER dimensions.

Return ONLY valid JSON with no extra text or markdown fences.
Required format:
{
  "dimensions": [
    {
      "letter": "S",
      "name": "Substitute",
      "score": <number 0-100>,
      "explanation": "<2-3 sentence explanation>"
    },
    {
      "letter": "C",
      "name": "Combine",
      "score": <number>,
      "explanation": "<explanation>"
    },
    {
      "letter": "A",
      "name": "Adapt",
      "score": <number>,
      "explanation": "<explanation>"
    },
    {
      "letter": "M",
      "name": "Modify",
      "score": <number>,
      "explanation": "<explanation>"
    },
    {
      "letter": "P",
      "name": "Put to Other Use",
      "score": <number>,
      "explanation": "<explanation>"
    },
    {
      "letter": "E",
      "name": "Eliminate",
      "score": <number>,
      "explanation": "<explanation>"
    },
    {
      "letter": "R",
      "name": "Reverse",
      "score": <number>,
      "explanation": "<explanation>"
    }
  ],
  "summary": "<3-4 sentence summary of why this product/idea is innovative>"
}`;

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
