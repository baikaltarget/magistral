import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import type { Faq, Work } from "@/lib/site";
import { Chevron, Check } from "./Icons";

const ph = (flag?: boolean) => (flag && SITE.placeholders.showFrames ? "ph" : "");

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  const all = [{ href: "/", label: "Главная" }, ...items];
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-muted mb-5">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {all.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href && i < all.length - 1 ? <Link href={it.href} className="hover:text-accent">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`container mt-14 sm:mt-20 ${className}`}>{children}</section>;
}

export function PriceTable({ works, title = "Цены" }: { works: Work[]; title?: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between"><h2 className="text-xl">{title}</h2><span className="text-sm text-muted">работа, без запчастей</span></div>
      <table className="w-full text-[15px]">
        <tbody>
          {works.map((w, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              <td className="px-5 py-3">{w.name}</td>
              <td className="px-5 py-3 text-right whitespace-nowrap font-bold"><span className={ph(w.placeholder)}>{w.price}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqList({ faq, title = "Частые вопросы" }: { faq: Faq[]; title?: string }) {
  return (
    <div>
      <h2 className="mb-5">{title}</h2>
      <div className="divide-y divide-line card px-5">
        {faq.map((f, i) => (
          <details key={i} className="py-4 group">
            <summary className="flex items-center justify-between gap-4 font-bold text-[17px]"><span>{f.q}</span><Chevron className="chev shrink-0 text-accent" /></summary>
            <p className={`mt-3 text-muted ${ph(f.placeholder)}`}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Cta({ title = "Запишитесь на удобное время", text = "Позвоните или оставьте номер — перезвоним в течение 5 минут в рабочее время." }: { title?: string; text?: string }) {
  return (
    <div className="rounded-xl2 bg-accent text-white px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div><h2 className="text-white">{title}</h2><p className="mt-2 text-white/90 max-w-xl">{text}</p></div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <a href={`tel:${SITE.phoneRaw}`} className="btn bg-white text-ink px-6 py-3.5 hover:bg-accent-soft">{SITE.phone}</a>
        <Link href="/zapis/" className="btn border-2 border-white/70 text-white px-6 py-3.5 hover:bg-white/10">Записаться онлайн</Link>
      </div>
    </div>
  );
}

export function Photo({ name, alt, className = "", priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { name: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <Image src={`/img/${name}.webp`} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}

export function Checks({ items }: { items: string[] }) {
  return (<ul className="grid gap-3 sm:grid-cols-2">{items.map((t, i) => (<li key={i} className="flex gap-3"><span className="mt-0.5 w-6 h-6 rounded-md bg-accent-soft text-accent-deep flex items-center justify-center shrink-0"><Check width={16} height={16} /></span><span>{t}</span></li>))}</ul>);
}

export function LinkCard({ href, title, text, small }: { href: string; title: string; text?: string; small?: boolean }) {
  return (
    <Link href={href} className={`card block hover:border-accent hover:shadow-card transition ${small ? "p-4" : "p-5 sm:p-6"}`}>
      <h3 className={small ? "text-base" : ""}>{title}</h3>
      {text && <p className="mt-1.5 text-sm text-muted">{text}</p>}
      <span className="mt-3 inline-block text-sm font-bold text-accent">Подробнее</span>
    </Link>
  );
}

export function Placeholder({ children, flag = true }: { children: React.ReactNode; flag?: boolean }) {
  return <span className={ph(flag)}>{children}</span>;
}
