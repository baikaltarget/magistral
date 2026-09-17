import Link from "next/link";
import { BRANDS } from "@/lib/site";
import BrandTile from "@/components/BrandTile";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta, Checks } from "@/components/Ui";
import Image from "next/image";
import { SITE } from "@/lib/site";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Ремонт японских и корейских автомобилей в Иркутске — все марки | Магистраль", "Ремонт и обслуживание Toyota, Honda, Nissan, Mazda, Subaru, Mitsubishi, Lexus, Suzuki, Hyundai, Kia, а также Lada, УАЗ, Ford, VW, Skoda в Иркутске. Автосервис «Магистраль».", "/marki/");
const G = ({ title, text, list }: { title: string; text: string; list: typeof BRANDS }) => (
  <div><h2 className="text-2xl">{title}</h2><p className="mt-2 text-muted max-w-2xl">{text}</p>
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{list.map((b) => (<BrandTile key={b.slug} b={b} />))}</div></div>
);
export default function Page() {
  return (
    <>
      <section className="container mt-6"><Breadcrumbs items={[{ label: "Марки" }]} />
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-start">
          <div><h1>Ремонт японских и корейских авто в Иркутске</h1><p className="mt-4 text-[17px] text-ink/90">Специализируемся на японских и корейских марках — это больше половины машин в нашем цехе. Знаем регламенты, допуски жидкостей и типовые неисправности по поколениям, поэтому не тратим ваше время и деньги на «поиск». Остальные распространённые марки тоже обслуживаем.</p>
            <div className="mt-6"><Checks items={SITE.why.slice(0, 4)} /></div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3"><a href="/zapis/" className="btn-primary">Записаться</a><a href={`tel:${SITE.phoneRaw}`} className="btn-ghost">{SITE.phone}</a></div></div>
          <div className="grid grid-cols-2 gap-3"><div className="relative col-span-2 aspect-[16/10] rounded-2xl overflow-hidden"><Image src="/img/ceh-4.webp" alt="Японские автомобили на подъёмниках в цехе Магистрали" fill priority sizes="45vw" className="object-cover" /></div><div className="relative aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/img/lift-2.webp" alt="Кроссовер на подъёмнике" fill sizes="22vw" className="object-cover" /></div><div className="relative aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/img/master-wheel.webp" alt="Мастер снимает колесо" fill sizes="22vw" className="object-cover" /></div></div>
        </div></section>
      <Section className="!mt-10 space-y-12">
        <G title="Японские автомобили" text="Toyota, Honda, Nissan и остальные — включая праворульные модели, гибриды и рамные внедорожники. Знаем регламенты, допуски жидкостей и типовые неисправности по поколениям." list={BRANDS.filter((b) => b.group === "jp")} />
        <G title="Корейские автомобили" text="Hyundai и Kia — самые массовые машины города. Подвеска, двигатели GDI, автоматы — обслуживаем ежедневно." list={BRANDS.filter((b) => b.group === "kr")} />
        <G title="Другие марки" text="Lada, УАЗ, Ford, Volkswagen, Skoda — ТО, подвеска, тормоза, электрика. Замена масла в DSG — да, ремонт DSG — нет." list={BRANDS.filter((b) => b.group === "other")} />
      </Section>
      <Section><Cta /></Section>
      <JsonLd data={breadcrumbs([{ label: "Марки" }])} />
    </>
  );
}
