"use client";
import { useState } from "react";
import site from "@/content/site.json";
const BRANDS = ["Toyota", "Lexus", "Honda", "Nissan", "Mazda", "Mitsubishi", "Subaru", "Suzuki", "Hyundai", "Kia", "Lada", "УАЗ", "Ford", "Volkswagen", "Skoda", "Другая"];
const REASONS = ["ТО / замена масла", "Диагностика", "Подвеска / стук", "Тормоза", "Развал-схождение", "Электрика / не заводится", "Двигатель", "Другое"];

export default function LeadForm({ compact = false, source = "site" }: { compact?: boolean; source?: string }) {
  const [step, setStep] = useState(compact ? 3 : 1);
  const [d, setD] = useState({ brand: "", model: "", reason: "", name: "", phone: "", comment: "", source });
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fallback" | "err">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: string, v: string) => setD({ ...d, [k]: v });
  const text = `Заявка с сайта (${source})\nМарка: ${d.brand} ${d.model}\nПричина: ${d.reason}\nИмя: ${d.name}\nТелефон: ${d.phone}\nКомментарий: ${d.comment}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!d.phone.trim()) { setMsg("Укажите телефон — без него не сможем перезвонить."); return; }
    setState("sending"); setMsg("");
    try {
      const r = await fetch("/api/lead/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await r.json();
      if (j.ok) setState("ok"); else { setState("fallback"); setMsg(j.error || ""); }
    } catch { setState("fallback"); }
  }

  if (state === "ok") return (<div className="card p-6 text-center"><p className="text-xl font-extrabold">Заявка отправлена</p><p className="mt-2 text-muted">Перезвоним в течение 5 минут в рабочее время ({site.hours.toLowerCase()}).</p></div>);
  if (state === "fallback") return (
    <div className="card p-6">
      <p className="text-lg font-extrabold">Онлайн-отправка пока не настроена</p>
      <p className="mt-2 text-muted">Заявка сохранена в логе сайта, но надёжнее — позвонить или отправить в WhatsApp одной кнопкой.</p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <a href={`tel:${site.phoneRaw}`} className="btn-primary">{site.phone}</a>
        <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener" className="btn-ghost">Отправить в WhatsApp</a>
      </div>
    </div>
  );

  const Progress = () => (<div className="flex gap-1.5 mb-5">{[1, 2, 3].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-line"}`} />)}</div>);
  const inp = "w-full rounded-xl border border-line px-4 py-3 text-[16px] focus:border-accent";
  const chip = (active: boolean) => `rounded-pill border px-4 py-2.5 text-sm font-semibold transition ${active ? "bg-accent text-white border-accent" : "bg-white border-line hover:border-ink"}`;

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6" noValidate>
      {!compact && <Progress />}
      {step === 1 && (<div>
        <p className="font-extrabold text-lg mb-3">Какая у вас машина?</p>
        <div className="flex flex-wrap gap-2 mb-3">{BRANDS.map((b) => <button type="button" key={b} onClick={() => set("brand", b)} className={chip(d.brand === b)}>{b}</button>)}</div>
        <input className={inp} placeholder="Модель и год, например Camry 2014" value={d.model} onChange={(e) => set("model", e.target.value)} />
        <button type="button" onClick={() => setStep(2)} className="btn-primary mt-4 w-full sm:w-auto">Дальше</button>
      </div>)}
      {step === 2 && (<div>
        <p className="font-extrabold text-lg mb-3">Что нужно сделать?</p>
        <div className="flex flex-wrap gap-2 mb-3">{REASONS.map((r) => <button type="button" key={r} onClick={() => set("reason", r)} className={chip(d.reason === r)}>{r}</button>)}</div>
        <textarea className={inp} rows={2} placeholder="Опишите проблему своими словами (необязательно)" value={d.comment} onChange={(e) => set("comment", e.target.value)} />
        <div className="mt-4 flex gap-3"><button type="button" onClick={() => setStep(1)} className="btn-ghost">Назад</button><button type="button" onClick={() => setStep(3)} className="btn-primary">Дальше</button></div>
      </div>)}
      {step === 3 && (<div>
        <p className="font-extrabold text-lg mb-3">{compact ? "Оставьте номер — перезвоним" : "Куда перезвонить?"}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={inp} placeholder="Имя" value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
          <input className={inp} placeholder="Телефон" type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" required />
        </div>
        {compact && <input className={`${inp} mt-3`} placeholder="Марка, модель и что нужно (необязательно)" value={d.comment} onChange={(e) => set("comment", e.target.value)} />}
        {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          {!compact && <button type="button" onClick={() => setStep(2)} className="btn-ghost">Назад</button>}
          <button type="submit" disabled={state === "sending"} className="btn-primary">{state === "sending" ? "Отправляем…" : "Перезвоните мне"}</button>
          <span className="text-xs text-muted">Нажимая кнопку, вы соглашаетесь с <a href="/politika/" className="underline">политикой конфиденциальности</a>.</span>
        </div>
      </div>)}
    </form>
  );
}
