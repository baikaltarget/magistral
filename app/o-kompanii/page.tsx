import Image from "next/image";
import { PAGES, SITE } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
const P = PAGES["o-kompanii"];
export const metadata = meta(P.title, P.description, "/o-kompanii/");
const photos = [["fasad-1", "Фасад автосервиса"], ["ceh-2", "Цех"], ["lift-2", "Автомобиль на подъёмнике"], ["waiting-2", "Зона ожидания"], ["master-disc", "Мастер с тормозным диском"], ["compressor", "Оборудование цеха"]];
export default function Page() {
  const crumbs = [{ label: "О компании" }];
  return (<>
    <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="max-w-3xl"><h1>{P.h1}</h1><div className="mt-5 space-y-4 text-[17px]">{P.intro.map((t: string, i: number) => <p key={i}>{t}</p>)}</div></div></section>
    <Section className="!mt-10"><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{P.facts.map((f: any, i: number) => <div key={i} className="card p-5"><p className="text-3xl font-extrabold text-accent">{f.n}</p><p className="text-sm text-muted mt-1">{f.t}</p></div>)}</div></Section>
    <Section><h2 className="mb-4">Цех и зона ожидания</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{photos.map(([n, a]) => <div key={n} className="relative aspect-[4/3] rounded-2xl overflow-hidden"><Image src={`/img/${n}.webp`} alt={a} fill sizes="33vw" className="object-cover" /></div>)}</div></Section>
    <Section><h2 className="mb-4">Чего мы не делаем</h2><p className="max-w-3xl text-[17px]">Кузовной ремонт, шиномонтаж, ремонт АКПП и вариаторов (только замена масла), установку ГБО и сигнализаций, заправку кондиционеров, ремонт высоковольтных батарей гибридов и дизельной топливной аппаратуры. Если вам нужно что-то из этого — честно скажем и подскажем, к кому обратиться.</p></Section>
    <Section><Cta /></Section>
    <JsonLd data={breadcrumbs(crumbs)} />
  </>);
}
