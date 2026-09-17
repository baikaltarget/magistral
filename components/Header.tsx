import Link from "next/link";
import Image from "next/image";
import { SITE, hubs } from "@/lib/site";
import { Phone, Chevron, Wrench, Car, Box, Doc, Tag, Users, Pin } from "./Icons";
import { MaxLink, TgLink } from "./Messengers";
import MobileNav from "./MobileNav";

export const NAV = [
  { href: "/uslugi/", label: "Услуги", icon: "wrench", children: hubs().filter(h => h.slug !== "prochee").map((h) => ({ href: `/uslugi/${h.slug}/`, label: h.name })).concat([{ href: "/uslugi/razval-shozhdenie/", label: "Развал-схождение" }, { href: "/uslugi/zamena-masla/", label: "Замена масла" }, { href: "/uslugi/diagnostika-avto/", label: "Диагностика" }, { href: "/uslugi/", label: "Все услуги и цены" }]) },
  { href: "/marki/", label: "Марки", icon: "car" },
  { href: "/zapchasti/", label: "Запчасти", icon: "box" },
  { href: "/yurlicam/", label: "Юрлицам", icon: "doc" },
  { href: "/akcii/", label: "Акции", icon: "tag" },
  { href: "/o-kompanii/", label: "О нас", icon: "users" },
  { href: "/kontakty/", label: "Контакты", icon: "pin" },
];
const ICONS: Record<string, any> = { wrench: Wrench, car: Car, box: Box, doc: Doc, tag: Tag, users: Users, pin: Pin };

export default function Header() {
  return (
    <header className="container pt-3 sm:pt-4">
      <div className="flex items-center justify-between gap-3 py-2">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Автосервис Магистраль — на главную">
          <Image src="/img/logo.png" alt="Магистраль автосервис" width={561} height={120} priority className="h-10 w-auto sm:h-14" />
        </Link>
        <p className="hidden xl:block text-sm text-muted max-w-[230px] leading-snug">{SITE.tagline}</p>
        <Link href="/zapis/" className="hidden md:inline-flex btn-primary btn-sm lg:px-6 lg:py-3 lg:text-base">Записаться на ремонт</Link>
        <div className="hidden lg:flex items-center gap-3 text-sm"><span className="text-muted">Напишите нам</span><MaxLink /><TgLink /></div>
        <div className="hidden md:block text-right">
          <div className="text-xs text-muted">{SITE.hours}</div>
          <a href={`tel:${SITE.phoneRaw}`} className="text-xl font-extrabold tracking-tight leading-tight hover:text-accent">{SITE.phone}</a>
          <div><Link href="/zapis/" className="text-sm text-accent font-semibold underline underline-offset-2">Заказать звонок</Link></div>
        </div>
        {/* mobile: phone + max + burger */}
        <div className="flex md:hidden items-center gap-2">
          <a href={`tel:${SITE.phoneRaw}`} aria-label="Позвонить" className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center"><Phone width={20} height={20} /></a>
          <MaxLink className="w-11 h-11" />
          <MobileNav nav={NAV} />
        </div>
      </div>
      <nav className="hidden md:block mt-2 rounded-pill bg-[#E9EBEF] px-2" aria-label="Основное меню">
        <ul className="flex items-center justify-between">
          {NAV.map((n) => { const I = ICONS[n.icon]; return (
            <li key={n.href} className="relative group">
              <Link href={n.href} className="flex items-center gap-2 px-3 lg:px-4 py-3.5 text-[15px] font-bold text-ink hover:text-accent">
                <I width={18} height={18} className="text-accent" />{n.label}{n.children && <Chevron width={16} height={16} className="text-muted" />}
              </Link>
              {n.children && (
                <div className="absolute left-0 top-full z-30 hidden group-hover:block group-focus-within:block pt-1">
                  <ul className="card shadow-card min-w-[260px] p-2">
                    {n.children.map((c) => (<li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-accent-soft hover:text-accent-deep">{c.label}</Link></li>))}
                  </ul>
                </div>
              )}
            </li>); })}
        </ul>
      </nav>
    </header>
  );
}
