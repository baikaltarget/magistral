import Link from "next/link";
import { posts } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Советы автовладельцам от автосервиса «Магистраль», Иркутск", "Что значит горящий «чек», почему стучит подвеска, когда менять масло в вариаторе — простые ответы от мастеров автосервиса «Магистраль».", "/blog/");
export default function Page() {
  return (
    <>
      <section className="container mt-6"><Breadcrumbs items={[{ label: "Советы" }]} /><h1>Советы автовладельцам</h1><p className="mt-3 text-lg text-muted max-w-2xl">Разбираем частые симптомы простым языком: что это, насколько срочно и сколько примерно стоит.</p></section>
      <Section className="!mt-8"><div className="grid gap-4 md:grid-cols-2">{posts().map((p) => (<Link key={p.slug} href={`/blog/${p.slug}/`} className="card p-5 sm:p-6 hover:border-accent transition"><h2 className="text-xl">{p.title}</h2><p className="mt-2 text-sm text-muted">{p.description}</p></Link>))}</div></Section>
      <Section><Cta /></Section>
      <JsonLd data={breadcrumbs([{ label: "Советы" }])} />
    </>
  );
}
