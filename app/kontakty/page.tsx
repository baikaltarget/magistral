import Link from "next/link";
import { SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Placeholder } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { Vk } from "@/components/Icons";
import Image from "next/image";
export const metadata = meta("Контакты автосервиса «Магистраль» — Иркутск, ул. Баррикад, 88д", `Автосервис «Магистраль»: ${SITE.address}, ${SITE.addressHint}. ${SITE.hours}. Телефон ${SITE.phone}, Max, Telegram.`, "/kontakty/");
export default function Page() {
  const crumbs = [{ label: "Контакты" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><h1>Контакты</h1>
      <div className="mt-6 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
        <div className="card p-6 space-y-5">
          <div><p className="text-sm text-muted">Адрес</p><p className="font-bold text-lg">{SITE.address}</p><p className="text-muted">{SITE.addressHint}</p><p className="text-sm text-muted mt-1">{SITE.district}</p></div>
          <div><p className="text-sm text-muted">Режим работы</p><p className="font-bold text-lg">{SITE.hours}</p></div>
          <div><p className="text-sm text-muted">Телефон</p><a href={`tel:${SITE.phoneRaw}`} className="font-extrabold text-2xl">{SITE.phone}</a></div>
          <div><p className="text-sm text-muted">Почта</p><a href={`mailto:${SITE.email}`} className="font-bold">{SITE.email}</a></div>
          <div className="flex gap-3">
            <a href={SITE.max} target="_blank" rel="noopener" className="btn-ghost pl-2 pr-4 py-2 text-sm"><Image src="/img/max.png" alt="" width={28} height={28} /> Max</a>
            <a href={SITE.telegramUrl} target="_blank" rel="noopener" className="btn bg-[#2AABEE] text-white px-4 py-2.5 text-sm">Telegram</a>
            <a href={SITE.vk} target="_blank" rel="noopener" className="btn bg-[#0077FF] text-white px-4 py-2.5 text-sm"><Vk /> VK</a>
          </div>
          <div className="text-sm text-muted">Отзывы: <a href={SITE.reviewsLinks.twogis} target="_blank" rel="noopener" className="text-accent font-semibold">2ГИС</a> · <a href={SITE.reviewsLinks.yandex} target="_blank" rel="noopener" className="text-accent font-semibold">Яндекс Карты</a></div>
        </div>
        <div>
          <div className="relative aspect-[16/10] rounded-xl2 overflow-hidden"><Image src="/img/fasad-2.webp" alt="Въезд: оранжевые ворота постов, ул. Баррикад, 88д" fill priority sizes="60vw" className="object-cover" /></div>
          <div className="mt-3 card p-4 text-sm"><Placeholder>Здесь будет карта. Вставьте iframe Яндекс Карт (Конструктор карт → «Получить код») вместо этого блока в app/kontakty/page.tsx.</Placeholder></div>
        </div>
      </div>
    </section>
    <Section><h2 className="mb-4">Как добраться</h2><div className="grid md:grid-cols-2 gap-4"><div className="card p-5"><h3>На машине</h3><p className="mt-2 text-muted">Территория «Восточные ворота» в Рабочем предместье, въезд с ул. Курортной. Ориентир — ряд оранжевых ворот с номерами постов. Парковка перед воротами.</p></div><div className="card p-5"><h3>Из городов области</h3><p className="mt-2 text-muted">{SITE.cities.map((c) => `${c.name} — ≈${c.min} мин ${c.road}`).join("; ")}. <Link href="/klientam-iz-oblasti/" className="text-accent font-semibold">Подробнее для иногородних</Link>.</p></div></div></Section>
    <Section><div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start"><div><h2>Записаться</h2><p className="mt-3 text-muted">Оставьте номер — перезвоним в течение 5 минут в рабочее время.</p></div><LeadForm compact source="контакты" /></div></Section>
    <JsonLd data={breadcrumbs(crumbs)} />
  </>);
}
