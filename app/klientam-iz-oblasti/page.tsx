import Image from "next/image";
import Link from "next/link";
import { PAGES, SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, FaqList } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage } from "@/components/JsonLd";
const P = PAGES["klientam-iz-oblasti"];
export const metadata = meta(P.title, P.description, "/klientam-iz-oblasti/");
export default function Page() {
  const crumbs = [{ label: "Клиентам из области" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start"><div><h1>{P.h1}</h1><div className="mt-5 space-y-4 text-[17px]">{P.intro.map((t: string, i: number) => <p key={i}>{t}</p>)}</div></div><div className="relative aspect-[4/3] rounded-xl2 overflow-hidden"><Image src="/img/fasad-1.webp" alt="Въезд в автосервис Магистраль" fill priority sizes="40vw" className="object-cover" /></div></div></section>
    <Section className="!mt-10"><h2 className="mb-4">Как добраться</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SITE.cities.map((c) => <div key={c.name} className="card p-5"><h3>{c.name}</h3><p className="text-sm text-muted mt-1">≈ {c.km} км, {c.min} мин {c.road}</p><p className="text-sm mt-3">Запись на точное время: <a href={`tel:${SITE.phoneRaw}`} className="font-bold">{SITE.phone}</a></p></div>)}</div><p className="mt-4 text-sm text-muted">Адрес: {SITE.address}, {SITE.addressHint}. <Link href="/kontakty/" className="text-accent font-semibold">Схема проезда</Link>.</p></Section>
    <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={P.faq} /><div><h2 className="mb-4">Записаться заранее</h2><LeadForm compact source="из области" /></div></div></Section>
    <JsonLd data={[breadcrumbs(crumbs), faqPage(P.faq)]} />
  </>);
}
