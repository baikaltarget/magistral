import Image from "next/image";
import { PAGES } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta, FaqList, Checks } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage, serviceLd } from "@/components/JsonLd";
const P = PAGES.yurlicam;
export const metadata = meta(P.title, P.description, "/yurlicam/");
export default function Page() {
  const crumbs = [{ label: "Юридическим лицам" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start"><div><h1>{P.h1}</h1><div className="mt-5 space-y-4 text-[17px]">{P.intro.map((t: string, i: number) => <p key={i}>{t}</p>)}</div></div><div className="relative aspect-[4/3] rounded-xl2 overflow-hidden"><Image src="/img/ceh-van.webp" alt="Служебные автомобили в цехе" fill priority sizes="40vw" className="object-cover" /></div></div></section>
    <Section className="!mt-10"><h2 className="mb-4">Условия для организаций</h2><Checks items={P.benefits} /></Section>
    <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={P.faq} /><div><h2 className="mb-4">Запросить договор</h2><LeadForm compact source="юрлица" /></div></div></Section>
    <Section><Cta title="Обсудим обслуживание вашего парка" text="Позвоните или напишите — расскажем условия и подготовим договор за день." /></Section>
    <JsonLd data={[breadcrumbs(crumbs), faqPage(P.faq), serviceLd("Обслуживание автопарка юридических лиц", P.description, "/yurlicam/")]} />
  </>);
}
