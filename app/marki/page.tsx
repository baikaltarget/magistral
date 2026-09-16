import Link from "next/link";
import { BRANDS } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta } from "@/components/Ui";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
export const metadata = meta("Ремонт японских и корейских автомобилей в Иркутске — все марки | Магистраль", "Ремонт и обслуживание Toyota, Honda, Nissan, Mazda, Subaru, Mitsubishi, Lexus, Suzuki, Hyundai, Kia, а также Lada, УАЗ, Ford, VW, Skoda в Иркутске. Автосервис «Магистраль».", "/marki/");
const G = ({ title, text, list }: { title: string; text: string; list: typeof BRANDS }) => (
  <div><h2 className="text-2xl">{title}</h2><p className="mt-2 text-muted max-w-2xl">{text}</p>
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{list.map((b) => (<Link key={b.slug} href={`/marki/${b.slug}/`} className="card px-4 py-4 hover:border-accent transition"><p className="font-extrabold text-lg">{b.name}</p><p className="text-xs text-muted mt-1 line-clamp-2">{b.models.slice(0, 4).join(", ")}</p></Link>))}</div></div>
);
export default function Page() {
  return (
    <>
      <section className="container mt-6"><Breadcrumbs items={[{ label: "Марки" }]} /><h1>Ремонт японских и корейских авто в Иркутске</h1><p className="mt-3 text-lg text-muted max-w-2xl">Специализируемся на японских и корейских марках — это большинство машин в нашем цехе. Остальные распространённые марки тоже обслуживаем.</p></section>
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
