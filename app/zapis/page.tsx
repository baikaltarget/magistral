import { meta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { Breadcrumbs, Section } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
export const metadata = meta("Запись на ремонт — автосервис «Магистраль», Иркутск", "Запишитесь на ремонт или ТО онлайн: марка, что нужно, телефон. Перезвоним в течение 5 минут в рабочее время.", "/zapis/");
export default function Page() { return (<><section className="container mt-6"><Breadcrumbs items={[{ label: "Запись" }]} /><div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start"><div><h1>Запись на ремонт</h1><p className="mt-3 text-muted">Три коротких шага. Перезвоним в течение 5 минут в рабочее время ({SITE.hours.toLowerCase()}), назовём стоимость и подберём время.</p><p className="mt-4">Или сразу по телефону: <a href={`tel:${SITE.phoneRaw}`} className="font-extrabold text-xl">{SITE.phone}</a></p></div><LeadForm source="страница записи" /></div></section></>); }
