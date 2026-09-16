import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, service, children, parentOf, SITE, BRANDS, posts } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, PriceTable, FaqList, Cta, LinkCard } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd, { breadcrumbs, faqPage, serviceLd } from "@/components/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() { return SERVICES.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = service(slug); if (!s) return {}; return meta(s.title, s.description, `/uslugi/${s.slug}/`, `/img/${s.image}.webp`); }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params;
  const s = service(slug); if (!s) notFound();
  const parent = parentOf(s); const kids = children(s);
  const crumbs = [{ href: "/uslugi/", label: "Услуги" }, ...(parent ? [{ href: `/uslugi/${parent.slug}/`, label: parent.name }] : []), { label: s.name }];
  const siblings = parent ? children(parent).filter((c) => c.slug !== s.slug) : [];
  const related = posts().filter((p) => p.related === s.slug).slice(0, 3);
  const firstPrice = s.works.find((w) => !w.placeholder && /\d/.test(w.price));
  return (
    <>
      <section className="container mt-6">
        <Breadcrumbs items={crumbs} />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <h1>{s.h1}</h1>
            <div className="mt-5 space-y-4 text-[17px] text-ink/90">{s.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3"><Link href="/zapis/" className="btn-primary">Записаться</Link><a href={`tel:${SITE.phoneRaw}`} className="btn-ghost">{SITE.phone}</a></div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-xl2 overflow-hidden"><Image src={`/img/${s.image}.webp`} alt={s.h1} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
        </div>
      </section>
      {kids.length > 0 && (<Section className="!mt-10"><h2 className="mb-4">Отдельные работы</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{kids.map((k) => <LinkCard key={k.slug} href={`/uslugi/${k.slug}/`} title={k.name} text={k.short} small />)}</div></Section>)}
      <Section className="!mt-10"><PriceTable works={s.works} title={`Цены: ${s.name.toLowerCase()}`} /><p className="mt-3 text-sm text-muted">Запчасти — под заказ с удалённого склада от 30 минут, или привозите свои: цена работы не меняется.</p></Section>
      <Section><div className="grid lg:grid-cols-2 gap-8 items-start"><FaqList faq={s.faq} /><div><h2 className="mb-4">Записаться</h2><LeadForm compact source={s.name} /></div></div></Section>
      {(siblings.length > 0 || related.length > 0) && (
        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            {siblings.length > 0 && <div><h2 className="text-xl mb-3">Смежные работы</h2><ul className="flex flex-wrap gap-2">{siblings.map((c) => <li key={c.slug}><Link href={`/uslugi/${c.slug}/`} className="rounded-pill bg-[#F2F3F5] px-3 py-1.5 text-sm font-semibold hover:bg-accent-soft hover:text-accent-deep">{c.name}</Link></li>)}{parent && <li><Link href={`/uslugi/${parent.slug}/`} className="rounded-pill bg-[#F2F3F5] px-3 py-1.5 text-sm font-semibold hover:bg-accent-soft hover:text-accent-deep">Все: {parent.name.toLowerCase()}</Link></li>}</ul></div>}
            {related.length > 0 && <div><h2 className="text-xl mb-3">Полезное по теме</h2><ul className="space-y-2">{related.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}/`} className="font-semibold hover:text-accent">{p.title}</Link></li>)}</ul></div>}
          </div>
        </Section>
      )}
      <Section><p className="text-sm text-muted">Обслуживаем {BRANDS.filter(b => b.priority === 1).map((b, i) => <span key={b.slug}>{i > 0 && ", "}<Link href={`/marki/${b.slug}/`} className="hover:text-accent">{b.name}</Link></span>)} и другие марки.</p></Section>
      <Section><Cta /></Section>
      <JsonLd data={[breadcrumbs(crumbs), faqPage(s.faq), serviceLd(s.h1, s.description, `/uslugi/${s.slug}/`, firstPrice ? firstPrice.price.replace(/[^\d]/g, "") : undefined)]} />
    </>
  );
}
