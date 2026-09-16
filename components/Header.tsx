import Link from "next/link";
import Image from "next/image";
import { SITE, hubs } from "@/lib/site";
import { Phone, Wa, Tg, Chevron } from "./Icons";
import MobileNav from "./MobileNav";

export default function Header() {
  const nav = [
    { href: "/uslugi/", label: "Услуги", children: hubs().map((h) => ({ href: `/uslugi/${h.slug}/`, label: h.name })).concat([{ href: "/uslugi/razval-shozhdenie/", label: "Развал-схождение" }, { href: "/uslugi/zamena-masla/", label: "Замена масла" }, { href: "/uslugi/diagnostika-avto/", label: "Диагностика" }]) },
    { href: "/marki/", label: "Марки" },
    { href: "/zapchasti/", label: "Запчасти" },
    { href: "/yurlicam/", label: "Юрлицам" },
    { href: "/akcii/", label: "Акции" },
    { href: "/o-kompanii/", label: "О нас" },
    { href: "/kontakty/", label: "Контакты" },
  ];
  return (
    <header className="container pt-3 sm:pt-5">
      <div className="flex items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Автосервис Магистраль — на главную">
          <Image src="/img/logo.png" alt="Магистраль автосервис" width={561} height={120} priority className="h-11 w-auto sm:h-14" />
        </Link>
        <p className="hidden xl:block text-sm text-muted max-w-[240px] leading-snug">Ремонт японских и корейских авто в Иркутске</p>
        <Link href="/zapis/" className="hidden md:inline-flex btn-primary btn-sm lg:px-6 lg:py-3 lg:text-base">Записаться на ремонт</Link>
        <div className="hidden lg:flex items-center gap-3 text-sm">
          <span className="text-muted">Напишите нам</span>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center"><Wa /></a>
          <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener" aria-label="Telegram" className="w-10 h-10 rounded-full bg-[#2AABEE] text-white flex items-center justify-center"><Tg /></a>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs text-muted">{SITE.hours}</div>
          <a href={`tel:${SITE.phoneRaw}`} className="text-xl font-extrabold tracking-tight leading-tight hover:text-accent">{SITE.phone}</a>
          <div><Link href="/zapis/" className="text-sm text-accent font-semibold underline underline-offset-2">Заказать звонок</Link></div>
        </div>
        <MobileNav nav={nav} />
      </div>
      <nav className="hidden md:block mt-2 rounded-pill bg-[#E9EBEF] px-2" aria-label="Основное меню">
        <ul className="flex items-center justify-between">
          {nav.map((n) => (
            <li key={n.href} className="relative group">
              <Link href={n.href} className="flex items-center gap-1 px-4 py-3.5 text-[15px] font-bold text-ink hover:text-accent">
                {n.label}{n.children && <Chevron width={16} height={16} className="text-accent" />}
              </Link>
              {n.children && (
                <div className="absolute left-0 top-full z-30 hidden group-hover:block group-focus-within:block pt-1">
                  <ul className="card shadow-card min-w-[260px] p-2">
                    {n.children.map((c) => (<li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-accent-soft hover:text-accent-deep">{c.label}</Link></li>))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
