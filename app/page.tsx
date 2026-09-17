import Link from "next/link";
import Image from "next/image";
import { SITE, hubs, SERVICES, BRANDS, posts } from "@/lib/site";
import BrandTile from "@/components/BrandTile";
import { meta } from "@/lib/meta";
import { Section, FaqList, Cta, Checks, Placeholder } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { faqPage } from "@/components/JsonLd";
import { Shield, Gauge, Box, Clock, Coffee, Users, Doc, Car, Wrench } from "@/components/Icons";

export const metadata = meta("Автосервис в Иркутске — ремонт японских и корейских авто | Магистраль", "Автосервис «Магистраль» в Иркутске: диагностика, ТО, ремонт подвески, двигателя, тормозов, автоэлектрика, развал-схождение. Запчасти под заказ от 30 минут. Ул. Баррикад, 88д, ежедневно 08:30–20:00.", "/");

const icons = [Car, Doc, Box, Coffee, Users, Shield];
const factIcons = [Shield, Gauge, Wrench];

export default function Home() {
  const h = SITE.hero;
  const popular = ["razval-shozhdenie", "zamena-masla", "diagnostika-avto", "zamena-masla-akpp-variator", "zamena-kolodok", "zamena-grm"].map((s) => SERVICES.find((x) => x.slug === s)!);
  return (
    <>
      {/* Hero */}
      <section className="container mt-4 sm:mt-6">
        <div className="relative overflow-hidden rounded-xl2 bg-[#F6F4F1] min-h-[520px] grid lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <h1><span className="text-accent">{h.titleAccent}</span> {h.title}</h1>
            <p className="mt-5 text-lg text-ink/80 max-w-xl">{h.text}</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {h.facts.map((f, i) => { const I = factIcons[i]; return (
                <li key={i} className="flex gap-3 sm:block">
                  <span className="w-11 h-11 rounded-xl bg-white text-accent flex items-center justify-center shrink-0 sm:mb-3 shadow-card"><I /></span>
                  <div><p className="font-bold leading-snug"><Placeholder flag={!!f.placeholder}>{f.title}</Placeholder></p><p className="text-sm text-muted mt-0.5">{f.text}</p></div>
                </li>); })}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Link href="/zapis/" className="btn-primary text-base px-8 py-4">Записаться на ремонт</Link>
              <p className="text-sm text-muted">Перезвоним в течение 5 минут<br className="hidden sm:block" /> и назовём стоимость</p>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <Image src="/img/fasad-2.webp" alt="Автосервис Магистраль — оранжевые ворота постов на ул. Баррикад, 88д" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[35%_60%]" />
                      </div>
        </div>
      </section>

      {/* Popular */}
      <Section>
        <div className="flex items-end justify-between gap-4 mb-6"><h2>С чем приезжают чаще всего</h2><Link href="/uslugi/" className="text-accent font-bold shrink-0 hidden sm:inline">Все услуги и цены</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <Link key={s.slug} href={`/uslugi/${s.slug}/`} className="card p-5 hover:border-accent hover:shadow-card transition flex flex-col">
              <h3>{s.name}</h3><p className="mt-1.5 text-sm text-muted flex-1">{s.short}</p>
              <p className="mt-4 font-bold text-accent-deep"><Placeholder flag={!!s.works[0].placeholder}>{s.works[0].price}</Placeholder> <span className="text-muted font-medium text-sm">— {s.works[0].name.toLowerCase()}</span></p>
            </Link>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {hubs().map((s) => (<Link key={s.slug} href={`/uslugi/${s.slug}/`} className="rounded-xl bg-[#F2F3F5] px-4 py-3 text-sm font-bold hover:bg-accent-soft hover:text-accent-deep">{s.name}</Link>))}
        </div>
      </Section>

      {/* Why */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <h2>Почему 80% клиентов возвращаются</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {SITE.advantages.map((a, i) => { const I = icons[i]; return (
                <li key={i} className="flex gap-3"><span className="w-10 h-10 rounded-lg bg-accent-soft text-accent-deep flex items-center justify-center shrink-0"><I width={20} height={20} /></span><div><p className="font-bold">{a.title}</p><p className="text-sm text-muted mt-1">{a.text}</p></div></li>); })}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden"><Image src="/img/master-hood.webp" alt="Мастер за диагностикой двигателя" fill sizes="25vw" className="object-cover" /></div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8"><Image src="/img/waiting-1.webp" alt="Зона ожидания с видом в цех" fill sizes="25vw" className="object-cover" /></div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden -mt-8"><Image src="/img/ceh-1.webp" alt="Посты с подъёмниками" fill sizes="25vw" className="object-cover" /></div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden"><Image src="/img/coffee.webp" alt="Кофе-пойнт для клиентов" fill sizes="25vw" className="object-cover" /></div>
          </div>
        </div>
      </Section>

      {/* Steps */}
      <Section>
        <h2 className="mb-6">Как проходит визит</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {SITE.steps.map((s, i) => (<li key={i} className="card p-5"><span className="w-9 h-9 rounded-lg bg-accent text-white font-extrabold flex items-center justify-center">{i + 1}</span><h3 className="mt-4">{s.title}</h3><p className="mt-1.5 text-sm text-muted">{s.text}</p></li>))}
        </ol>
      </Section>

      {/* Brands */}
      <Section>
        <div className="flex items-end justify-between gap-4 mb-6"><h2>Марки, которые знаем лучше всего</h2><Link href="/marki/" className="text-accent font-bold shrink-0 hidden sm:inline">Все марки</Link></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BRANDS.filter((b) => b.priority === 1).map((b) => (<BrandTile key={b.slug} b={b} />))}
        </div>
        <p className="mt-4 text-sm text-muted">А также Lada, УАЗ, Ford, Volkswagen, Skoda — <Link href="/marki/" className="text-accent font-semibold">обслуживаем все распространённые марки</Link>.</p>
      </Section>

      {/* Parts + area */}
      <Section>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/zapchasti/" className="card p-6 sm:p-8 hover:border-accent transition"><h3 className="text-xl">Запчасти под заказ — от 30 минут</h3><p className="mt-2 text-muted">Своего склада нет, поэтому нет наценки за хранение. Подбираем по VIN, привозят с удалённого склада, ставим сразу. Свои запчасти — та же цена работы.</p><span className="mt-4 inline-block text-accent font-bold">Как это работает</span></Link>
          <Link href="/klientam-iz-oblasti/" className="card p-6 sm:p-8 hover:border-accent transition"><h3 className="text-xl">Из Ангарска, Шелехова, Усолья, Усть-Орды</h3><p className="mt-2 text-muted">Записываем на точное время, чтобы вы не ждали после дороги. Диагностика, запчасти и ремонт — за один визит.</p><span className="mt-4 inline-block text-accent font-bold">Как добраться и записаться</span></Link>
        </div>
      </Section>

      {/* Reviews */}
      <Section>
        <div className="flex items-end justify-between gap-4 mb-6"><h2>Отзывы</h2><Link href="/otzyvy/" className="text-accent font-bold shrink-0 hidden sm:inline">Все отзывы</Link></div>
        <div className="grid gap-4 md:grid-cols-3">
          {SITE.reviews.slice(0, 3).map((r, i) => (<blockquote key={i} className="card p-5"><p className={SITE.placeholders.showFrames && r.placeholder ? "ph" : ""}>{r.text}</p><footer className="mt-4 text-sm text-muted"><span className="font-bold text-ink">{r.author}</span> · {r.source}</footer></blockquote>))}
        </div>
      </Section>

      {/* Form */}
      <Section id="zapis">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          <div><h2>Запись на ремонт</h2><p className="mt-3 text-muted">Три коротких шага: машина, что нужно, телефон. Перезвоним в течение 5 минут в рабочее время, назовём стоимость и подберём время.</p><p className="mt-4 text-sm text-muted">Или сразу: <a href={`tel:${SITE.phoneRaw}`} className="font-bold text-ink">{SITE.phone}</a></p></div>
          <LeadForm source="главная" />
        </div>
      </Section>

      <Section><FaqList faq={SITE.faq} /></Section>
      <Section><div className="max-w-4xl"><h2>Автосервис «Магистраль» в Иркутске</h2><div className="mt-4 space-y-4 text-[17px] text-ink/90">{SITE.seoText.map((t, i) => <p key={i}>{t}</p>)}</div></div></Section>
      <JsonLd data={faqPage(SITE.faq)} />
    </>
  );
}
