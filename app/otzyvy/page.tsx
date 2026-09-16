import { SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Отзывы об автосервисе «Магистраль», Иркутск", "Отзывы клиентов автосервиса «Магистраль» в Иркутске: подвеска, ТО, электрика, рулевые рейки. Настоящие отзывы на 2ГИС и Яндекс Картах.", "/otzyvy/");
export default function Page() {
  const crumbs = [{ label: "Отзывы" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><h1>Отзывы</h1><p className="mt-3 text-muted max-w-2xl">Настоящие отзывы читайте на <a href={SITE.reviewsLinks.twogis} target="_blank" rel="noopener" className="text-accent font-semibold">2ГИС</a> и <a href={SITE.reviewsLinks.yandex} target="_blank" rel="noopener" className="text-accent font-semibold">Яндекс Картах</a> — там их нельзя отредактировать. Ниже — несколько из них.</p></section>
    <Section className="!mt-8"><div className="grid gap-4 md:grid-cols-2">{SITE.reviews.map((r, i) => <blockquote key={i} className="card p-5"><p className={SITE.placeholders.showFrames && r.placeholder ? "ph" : ""}>{r.text}</p><footer className="mt-4 text-sm text-muted"><span className="font-bold text-ink">{r.author}</span> · {r.source}</footer></blockquote>)}</div></Section>
    <Section><Cta title="Были у нас? Оставьте отзыв" text="Это помогает другим владельцам выбрать сервис, а нам — стать лучше. Спасибо." /></Section>
    <JsonLd data={breadcrumbs(crumbs)} />
  </>);
}
