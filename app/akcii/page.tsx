import { SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta, Placeholder } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Акции автосервиса «Магистраль» в Иркутске", "Текущие акции: диагностика подвески 700 ₽, замена масла 700 ₽ за работу, условия для постоянных клиентов.", "/akcii/");
export default function Page() {
  const crumbs = [{ label: "Акции" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><h1>Акции</h1></section>
    <Section className="!mt-8"><div className="grid gap-4 md:grid-cols-3">{SITE.akcii.map((a, i) => <div key={i} className="card p-6"><h2 className="text-xl"><Placeholder flag={!!a.placeholder}>{a.title}</Placeholder></h2><p className="mt-2 text-muted">{a.text}</p></div>)}</div></Section>
    <Section><Cta /></Section>
    <JsonLd data={breadcrumbs(crumbs)} />
  </>);
}
