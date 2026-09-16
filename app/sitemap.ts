import type { MetadataRoute } from "next";
import { SERVICES, BRANDS, posts, url } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const stat = ["/", "/uslugi/", "/marki/", "/zapchasti/", "/kommercheskiy-transport/", "/yurlicam/", "/klientam-iz-oblasti/", "/blog/", "/o-kompanii/", "/kontakty/", "/otzyvy/", "/akcii/", "/vakansii/", "/zapis/"];
  return [
    ...stat.map((p) => ({ url: url(p), lastModified: now, priority: p === "/" ? 1 : 0.7 })),
    ...SERVICES.map((s) => ({ url: url(`/uslugi/${s.slug}/`), lastModified: now, priority: 0.9 })),
    ...BRANDS.map((b) => ({ url: url(`/marki/${b.slug}/`), lastModified: now, priority: 0.8 })),
    ...posts().map((p) => ({ url: url(`/blog/${p.slug}/`), lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
