import Image from "next/image";
import { PAGES, SITE, BRANDS } from "@/lib/site";
import Link from "next/link";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, FaqList } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage, serviceLd } from "@/components/JsonLd";
const P = PAGES.zapchasti;
export const metadata = meta(P.title, P.description, "/zapchasti/");
export default function Page() {
  const crumbs = [{ label: "Запчасти под заказ" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start"><div><h1>{P.h1}</h1><div className="mt-5 space-y-4 text-[17px]">{P.intro.map((t: string, i: number) => <p key={i}>{t}</p>)}</div></div><div className="relative aspect-[4/3] rounded-xl2 overflow-hidden"><Image src="/img/reception.webp" alt="Стойка приёмки автосервиса" fill priority sizes="40vw" className="object-cover" /></div></div></section>
    <Section className="!mt-10"><h2 className="mb-5">Как заказать</h2><ol className="grid gap-4 md:grid-cols-4">{P.how.map((t: string, i: number) => <li key={i} className="card p-5"><span className="w-9 h-9 rounded-lg bg-accent text-white font-extrabold flex items-center justify-center">{i + 1}</span><p className="mt-3">{t}</p></li>)}</ol></Section>
    <Section><h2 className="mb-4">Запчасти по маркам</h2><div className="flex flex-wrap gap-2">{BRANDS.filter(b => b.priority === 1).map((b) => <Link key={b.slug} href={`/marki/${b.slug}/#zapchasti`} className="rounded-pill bg-[#F2F3F5] px-4 py-2 font-semibold hover:bg-accent-soft hover:text-accent-deep">Запчасти {b.name}</Link>)}</div></Section>
    <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={P.faq} /><div><h2 className="mb-4">Подобрать запчасть</h2><p className="text-muted mb-4">Укажите VIN и что нужно — ответим с вариантами и ценой.</p><LeadForm compact source="запчасти" /></div></div></Section>
    <JsonLd data={[breadcrumbs(crumbs), faqPage(P.faq), serviceLd("Подбор и заказ автозапчастей", P.description, "/zapchasti/")]} />
  </>);
}
