import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  const text = `🔧 Заявка с сайта (${data.source || "site"})\nМарка: ${data.brand || "—"} ${data.model || ""}\nПричина: ${data.reason || "—"}\nИмя: ${data.name || "—"}\nТелефон: ${data.phone || "—"}\nКомментарий: ${data.comment || "—"}`;
  console.log("[LEAD]", JSON.stringify(data));
  if (!token || !chat) return NextResponse.json({ ok: false, error: "Telegram не настроен: добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в Vercel → Settings → Environment Variables." });
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chat, text }) });
    if (!r.ok) throw new Error(await r.text());
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[LEAD ERROR]", e?.message);
    return NextResponse.json({ ok: false, error: "Не удалось отправить в Telegram." });
  }
}
