"use client";
import { useState } from "react";
import Link from "next/link";
import site from "@/content/site.json";
import { MaxLink, TgLink } from "./Messengers";
type Item = { href: string; label: string; children?: { href: string; label: string }[] };
export default function MobileNav({ nav }: { nav: Item[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Меню" className="w-11 h-11 rounded-full border border-line flex flex-col items-center justify-center gap-1.5">
        <span className={`block w-5 h-0.5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-5 h-0.5 bg-ink ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-20 px-6 pb-28">
          <button onClick={() => setOpen(false)} aria-label="Закрыть" className="absolute top-5 right-5 w-11 h-11 rounded-full border border-line text-2xl">×</button>
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-3 text-xl font-extrabold">{n.label}</Link>
                {n.children && <ul className="pl-4 pb-2">{n.children.map((c) => (<li key={c.href}><Link href={c.href} onClick={() => setOpen(false)} className="block py-2 text-muted">{c.label}</Link></li>))}</ul>}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-line pt-6 text-sm text-muted">
            <div>{site.address}</div><div>{site.hours}</div>
            <a href={`tel:${site.phoneRaw}`} className="block mt-2 text-2xl font-extrabold text-ink">{site.phone}</a><div className="mt-3 flex gap-3"><MaxLink /><TgLink /></div>
          </div>
        </div>
      )}
    </div>
  );
}
