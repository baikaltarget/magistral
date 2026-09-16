import Link from "next/link";
import { hubs, children, SERVICES } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta, Placeholder } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Услуги и цены автосервиса «Магистраль» в Иркутске", "Все услуги автосервиса «Магистраль»: ТО, подвеска, двигатель, тормоза, автоэлектрика, развал-схождение — с ценами на работы. Иркутск, ул. Баррикад, 88д.", "/uslugi/");
export default function Page() {
  const rs = SERVICES.find((s) => s.slug === "razval-shozhdenie")!;
  return (
    <>
      <section className="container mt-6"><Breadcrumbs items={[{ label: "Услуги" }]} /><h1>Услуги и цены</h1><p className="mt-3 text-lg text-muted max-w-2xl">Цены указаны за работу без стоимости запчастей. Точную стоимость называем после диагностики — до начала ремонта.</p></section>
      <Section className="!mt-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/uslugi/razval-shozhdenie/" className="card p-5 hover:border-accent transition border-accent/40"><h2 className="text-xl">Развал-схождение</h2><p className="mt-1.5 text-sm text-muted">{rs.short}</p><p className="mt-2 font-bold text-accent-deep"><Placeholder flag={!!rs.works[0].placeholder}>{rs.works[0].price}</Placeholder></p></Link>
          {hubs().map((h) => (
            <div key={h.slug} className="card p-5">
              <Link href={`/uslugi/${h.slug}/`}><h2 className="text-xl hover:text-accent">{h.name}</h2></Link>
              <p className="mt-1.5 text-sm text-muted">{h.short}</p>
              {children(h).length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{children(h).map((c) => (<li key={c.slug}><Link href={`/uslugi/${c.slug}/`} className="rounded-pill bg-[#F2F3F5] px-3 py-1.5 text-sm font-semibold hover:bg-accent-soft hover:text-accent-deep">{c.name}</Link></li>))}</ul>}
            </div>
          ))}
        </div>
      </Section>
      <Section><Cta /></Section>
      <JsonLd data={breadcrumbs([{ label: "Услуги" }])} />
    </>
  );
}
