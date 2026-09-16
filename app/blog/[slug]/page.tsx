import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, post, service } from "@/lib/site";
import { meta } from "@/lib/meta";
import { Breadcrumbs, Section, Cta } from "@/components/Ui";
import JsonLd, { breadcrumbs, blogPosting } from "@/components/JsonLd";
export const dynamicParams = false;
export function generateStaticParams() { return posts().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = post(slug); if (!p) return {}; return meta(p.title.length > 65 ? p.title : `${p.title} | Магистраль`, p.description, `/blog/${p.slug}/`); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params;
  const p = post(slug); if (!p) notFound();
  const s = service(p.related);
  const crumbs = [{ href: "/blog/", label: "Советы" }, { label: p.title }];
  const more = posts().filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <section className="container mt-6"><Breadcrumbs items={crumbs} /><div className="max-w-3xl"><h1>{p.title}</h1><p className="mt-3 text-lg text-muted">{p.description}</p><p className="mt-2 text-sm text-muted">{new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</p></div></section>
      <Section className="!mt-8"><div className="grid lg:grid-cols-[1fr_320px] gap-10"><article className="prose-site max-w-3xl" dangerouslySetInnerHTML={{ __html: p.html }} />
        <aside className="space-y-4">{s && <Link href={`/uslugi/${s.slug}/`} className="card p-5 block hover:border-accent"><p className="text-xs text-muted">Услуга по теме</p><p className="font-extrabold text-lg mt-1">{s.name}</p><p className="text-sm text-muted mt-1">{s.short}</p><span className="mt-3 inline-block text-accent font-bold">Цены и запись</span></Link>}
          <div className="card p-5"><p className="font-bold mb-3">Ещё советы</p><ul className="space-y-2 text-sm">{more.map((m) => <li key={m.slug}><Link href={`/blog/${m.slug}/`} className="hover:text-accent">{m.title}</Link></li>)}</ul></div></aside></div></Section>
      <Section><Cta title="Не уверены, что с машиной?" text="Приезжайте на диагностику — покажем и объясним, а не просто назовём цену." /></Section>
      <JsonLd data={[breadcrumbs(crumbs), blogPosting(p)]} />
    </>
  );
}
