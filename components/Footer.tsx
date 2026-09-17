import Link from "next/link";
import Image from "next/image";
import { SITE, hubs, BRANDS } from "@/lib/site";
import { Vk } from "./Icons";
import { MaxLink, TgLink } from "./Messengers";
export default function Footer() {
  return (
    <footer className="container mt-16 mb-6">
      <div className="rounded-xl2 bg-ink text-white/80 px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Image src="/img/logo-mark.png" alt="" width={56} height={63} className="h-14 w-auto mb-4" />
            <p className="text-white font-extrabold text-lg">{SITE.fullName}</p>
            <p className="mt-2 text-sm">{SITE.address}<br />{SITE.addressHint}</p>
            <p className="mt-2 text-sm">{SITE.hours}</p>
            <a href={`tel:${SITE.phoneRaw}`} className="mt-3 block text-2xl font-extrabold text-white">{SITE.phone}</a>
            <div className="mt-4 flex gap-3">
              <MaxLink className="w-10 h-10" /><TgLink className="w-10 h-10" />
              <a href={SITE.vk} target="_blank" rel="noopener" aria-label="ВКонтакте" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Vk /></a>
            </div>
          </div>
          <div>
            <p className="text-white font-bold mb-3">Услуги</p>
            <ul className="space-y-2 text-sm">
              {hubs().filter(h => h.slug !== "prochee").map((h) => (<li key={h.slug}><Link href={`/uslugi/${h.slug}/`} className="hover:text-white">{h.name}</Link></li>))}
              <li><Link href="/uslugi/razval-shozhdenie/" className="hover:text-white">Развал-схождение</Link></li>
              <li><Link href="/uslugi/zamena-masla/" className="hover:text-white">Замена масла</Link></li>
              <li><Link href="/uslugi/" className="hover:text-white">Все услуги и цены</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold mb-3">Марки</p>
            <ul className="space-y-2 text-sm">
              {BRANDS.filter((b) => b.priority === 1).map((b) => (<li key={b.slug}><Link href={`/marki/${b.slug}/`} className="hover:text-white">Ремонт {b.name}</Link></li>))}
              <li><Link href="/marki/" className="hover:text-white">Все марки</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold mb-3">Компания</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/zapchasti/" className="hover:text-white">Запчасти под заказ</Link></li>
              <li><Link href="/yurlicam/" className="hover:text-white">Юридическим лицам</Link></li>
              <li><Link href="/kommercheskiy-transport/" className="hover:text-white">Коммерческий транспорт</Link></li>
              <li><Link href="/klientam-iz-oblasti/" className="hover:text-white">Из Ангарска, Шелехова, Усолья</Link></li>
              <li><Link href="/blog/" className="hover:text-white">Советы</Link></li>
              <li><Link href="/otzyvy/" className="hover:text-white">Отзывы</Link></li>
              <li><Link href="/akcii/" className="hover:text-white">Акции</Link></li>
              <li><Link href="/vakansii/" className="hover:text-white">Вакансии</Link></li>
              <li><Link href="/kontakty/" className="hover:text-white">Контакты</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {SITE.fullName}. <Link href="/politika/" className="hover:text-white">Политика конфиденциальности</Link></p>
          {SITE.developer && (
            <p className="text-xs opacity-80">
              {SITE.developer.text} —{" "}
              <a href={SITE.developer.url} target="_blank" rel="noopener" className="hover:underline hover:text-white">{SITE.developer.name}</a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
