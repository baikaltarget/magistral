import { SITE, url } from "@/lib/site";
export const org = () => ({
  "@context": "https://schema.org", "@type": "AutoRepair", "@id": url("/#org"), name: SITE.fullName, url: SITE.domain, telephone: SITE.phoneRaw, email: SITE.email,
  image: url("/img/fasad-2.webp"), logo: url("/img/logo-mark.png"), priceRange: "₽₽",
  address: { "@type": "PostalAddress", streetAddress: "ул. Баррикад, 88д", addressLocality: "Иркутск", addressRegion: "Иркутская область", postalCode: "664001", addressCountry: "RU" },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "08:30", closes: "20:00" }],
  areaServed: ["Иркутск", "Ангарск", "Шелехов", "Усолье-Сибирское", "Усть-Ордынский"],
  sameAs: [SITE.vk, SITE.reviewsLinks.twogis, SITE.reviewsLinks.yandex],
});
export const breadcrumbs = (items: { href?: string; label: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [{ href: "/", label: "Главная" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, ...(it.href ? { item: url(it.href) } : {}) })),
});
export const faqPage = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
export const serviceLd = (name: string, desc: string, path: string, price?: string) => ({
  "@context": "https://schema.org", "@type": "Service", name, description: desc, url: url(path), serviceType: name,
  provider: { "@id": url("/#org") }, areaServed: { "@type": "City", name: "Иркутск" },
  ...(price ? { offers: { "@type": "Offer", price, priceCurrency: "RUB" } } : {}),
});
export const blogPosting = (p: { title: string; description: string; date: string; slug: string }) => ({
  "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date,
  url: url(`/blog/${p.slug}/`), author: { "@type": "Organization", name: SITE.fullName }, publisher: { "@id": url("/#org") },
});
export default function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return <>{arr.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}</>;
}
