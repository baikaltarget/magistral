import { SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Placeholder } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Вакансии автосервиса «Магистраль», Иркутск — автослесарь, автоэлектрик", "Работа в автосервисе в Иркутске: автослесарь, автоэлектрик-диагност, мастер-приёмщик. Тёплый цех, оборудованные посты, стабильный поток машин.", "/vakansii/");
export default function Page() {
  const crumbs = [{ label: "Вакансии" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><h1>Вакансии</h1><p className="mt-3 text-muted max-w-2xl">Ищем людей, которым важно делать хорошо. Тёплый цех, шесть постов с подъёмниками, честная сдельная оплата.</p></section>
    <Section className="!mt-8"><div className="grid gap-4 md:grid-cols-3">{SITE.vacancies.map((v) => <div key={v.slug} className="card p-6"><h2 className="text-xl">{v.title}</h2><p className="mt-1 font-bold text-accent-deep"><Placeholder flag={!!v.placeholder}>{v.salary}</Placeholder></p><p className="mt-3 text-muted">{v.text}</p></div>)}</div>
    <p className="mt-6">Откликнуться: <a href={`tel:${SITE.phoneRaw}`} className="font-bold">{SITE.phone}</a> или <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="font-bold text-accent">WhatsApp</a>.</p></Section>
    <JsonLd data={breadcrumbs(crumbs)} />
  </>);
}
