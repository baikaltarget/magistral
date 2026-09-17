"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem("cookie-ok")) setShow(true); } catch {} }, []);
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Использование cookie" className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-4 sm:max-w-md z-50 card shadow-card p-4 flex gap-3 items-start">
      <p className="text-sm text-muted flex-1">Сайт использует cookie и Яндекс Метрику для статистики. Оставаясь на сайте, вы соглашаетесь с <Link href="/politika/" className="underline text-ink">политикой конфиденциальности</Link>.</p>
      <button onClick={() => { try { localStorage.setItem("cookie-ok", "1"); } catch {} setShow(false); }} className="btn-primary btn-sm">Хорошо</button>
    </div>
  );
}
