import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BRANDS, brand, hubs, SERVICES, SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta, Checks, FaqList } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage, serviceLd } from "@/components/JsonLd";
export const dynamicParams = false;
export function generateStaticParams() { return BRANDS.map((b) => ({ slug: b.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params;
  const b = brand(slug); if (!b) return {};
  return meta(`Ремонт ${b.name} в Иркутске — ТО, диагностика, подвеска | Магистраль`, `Ремонт и обслуживание ${b.name} (${b.ru}) в Иркутске: ТО, подвеска, двигатель, тормоза. ${b.models.slice(0, 5).join(", ")}. Запчасти под заказ от 30 минут. Ул. Баррикад, 88д.`, `/marki/${b.slug}/`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params;
  const b = brand(slug); if (!b) notFound();
  const crumbs = [{ href: "/marki/", label: "Марки" }, { label: b.name }];
  const faq = [
    { q: `Обслуживаете все модели ${b.name}?`, a: `Да, включая ${b.models.slice(0, 4).join(", ")} и другие. ${b.group === "jp" ? "Праворульные модели — тоже." : ""}` },
    { q: `Есть запчасти на ${b.name}?`, a: "Под заказ с удалённого склада, ожидание от 30 минут. Подбираем по VIN: оригинал и проверенные аналоги. Свои запчасти — та же цена работы." },
    { q: "Сколько стоит диагностика?", a: "Диагностика подвески — 700 ₽, компьютерная диагностика — от 1 000 ₽. При ремонте у нас засчитываем в стоимость работ." },
  ];
  const others = BRANDS.filter((x) => x.slug !== b.slug && x.group === b.group).slice(0, 6);
  return (
    <>
      <section className="container mt-6">
        <Breadcrumbs items={crumbs} />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <h1>Ремонт {b.name} в Иркутске</h1>
            <p className="mt-5 text-[17px] text-ink/90">{b.intro}</p>
            <p className="mt-4 text-muted"><span className="font-bold text-ink">Модели:</span> {b.models.join(", ")}.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3"><Link href="/zapis/" className="btn-primary">Записаться</Link><a href={`tel:${SITE.phoneRaw}`} className="btn-ghost">{SITE.phone}</a></div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-xl2 overflow-hidden"><Image src={`/img/${b.group === "kr" ? "lift-2" : b.priority === 1 ? "ceh-4" : "ceh-3"}.webp`} alt={`Ремонт ${b.name} в автосервисе Магистраль`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
        </div>
      </section>
      <Section className="!mt-10"><h2 className="mb-4">Что делаем на {b.name} чаще всего</h2><Checks items={b.typical} /></Section>
      <Section><h2 className="mb-4">Услуги для {b.name}</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[...hubs().filter((h) => h.slug !== "prochee"), SERVICES.find((s) => s.slug === "razval-shozhdenie")!, SERVICES.find((s) => s.slug === "zamena-masla")!, SERVICES.find((s) => s.slug === "zamena-masla-akpp-variator")!].map((s) => (<Link key={s.slug} href={`/uslugi/${s.slug}/`} className="card p-4 hover:border-accent transition"><p className="font-bold">{s.name}</p><p className="text-xs text-muted mt-1">{s.short}</p></Link>))}</div></Section>
      <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={faq} /><div><h2 className="mb-4">Записать {b.name}</h2><LeadForm compact source={`марка ${b.name}`} /></div></div></Section>
      <Section><p className="text-sm text-muted">Другие марки: {others.map((o, i) => <span key={o.slug}>{i > 0 && ", "}<Link href={`/marki/${o.slug}/`} className="hover:text-accent">{o.name}</Link></span>)} — <Link href="/marki/" className="text-accent font-semibold">все марки</Link>.</p></Section>
      <Section><Cta /></Section>
      <JsonLd data={[breadcrumbs(crumbs), faqPage(faq), serviceLd(`Ремонт ${b.name}`, `Ремонт и обслуживание ${b.name} в Иркутске`, `/marki/${b.slug}/`)]} />
    </>
  );
}
