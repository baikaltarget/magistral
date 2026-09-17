import Image from "next/image";
import { PAGES, SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, FaqList, Checks, Placeholder } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage, serviceLd } from "@/components/JsonLd";
const P = PAGES["kommercheskiy-transport"];
export const metadata = meta(P.title, P.description, "/kommercheskiy-transport/");
export default function Page() {
  const crumbs = [{ label: "Коммерческий транспорт" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start"><div><h1>{P.h1}</h1><div className="mt-5 space-y-4 text-[17px]">{P.intro.map((t: string, i: number) => <p key={i}>{t}</p>)}</div><p className="mt-4 card p-4 text-sm"><span className="font-bold">Приём по согласованию.</span> Ограничения по габаритам: <Placeholder>{SITE.placeholders.commercialDimensions}</Placeholder>. Позвоните и назовите модель — скажем сразу.</p></div><div className="relative aspect-[4/3] rounded-xl2 overflow-hidden"><Image src="/img/truck-bay.webp" alt="Бокс для коммерческого транспорта" fill priority sizes="40vw" className="object-cover" /></div></div></section>
    <Section className="!mt-10"><h2 className="mb-4">Что делаем</h2><Checks items={P.works} /></Section>
    <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={P.faq} /><div><h2 className="mb-4">Согласовать приём</h2><LeadForm compact source="коммерческий транспорт" /></div></div></Section>
    <JsonLd data={[breadcrumbs(crumbs), faqPage(P.faq), serviceLd("Ремонт коммерческого транспорта", P.description, "/kommercheskiy-transport/")]} />
  </>);
}
