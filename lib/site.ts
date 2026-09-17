import site from "@/content/site.json";
import services from "@/content/services.json";
import brands from "@/content/brands.json";
import pages from "@/content/pages.json";
import fs from "fs";
import path from "path";

export type Work = { name: string; price: string; placeholder?: boolean };
export type Faq = { q: string; a: string; placeholder?: boolean };
export type Service = {
  slug: string; hub?: boolean; parent?: string; old?: string; name: string; h1: string; title: string;
  description: string; image: string; short: string; intro: string[]; works: Work[]; children?: string[]; faq: Faq[]; when?: string[]; time?: string; note?: string;
};
export type Brand = { slug: string; name: string; ru: string; group: "jp" | "kr" | "other"; priority: number; models: string[]; intro: string; typical: string[] };
export type Post = { slug: string; title: string; description: string; date: string; related: string; relatedName: string; html: string; };

export const SITE = site;
export const SERVICES = services as Service[];
export const BRANDS = brands as Brand[];
export const PAGES = pages as any;
export const hubs = () => SERVICES.filter((s) => s.hub);
export const service = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const children = (s: Service) => (s.children || []).map((c) => service(c)!).filter(Boolean);
export const parentOf = (s: Service) => (s.parent ? service(s.parent) : undefined);
export const brand = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const serviceUrl = (s: Service) => `/uslugi/${s.slug}/`;
export const url = (p: string) => `${SITE.domain}${p}`;

/* minimal markdown → html: headings, paragraphs, lists, bold */
export function md(src: string): string {
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const inline = (t: string) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const lines = src.split("\n");
  const out: string[] = []; let para: string[] = []; let list: string[] = [];
  const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
  const flushL = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`); list = []; } };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { flushP(); flushL(); continue; }
    if (l.startsWith("## ")) { flushP(); flushL(); out.push(`<h2>${inline(l.slice(3))}</h2>`); continue; }
    if (l.startsWith("### ")) { flushP(); flushL(); out.push(`<h3>${inline(l.slice(4))}</h3>`); continue; }
    if (l.startsWith("- ")) { flushP(); list.push(l.slice(2)); continue; }
    flushL(); para.push(l);
  }
  flushP(); flushL();
  return out.join("\n");
}

export function posts(): Post[] {
  const dir = path.join(process.cwd(), "content", "blog");
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
    const meta: any = {};
    m[1].split("\n").forEach((l) => { const i = l.indexOf(":"); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    return { slug: f.replace(/\.md$/, ""), ...meta, html: md(m[2]) } as Post;
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}
export const post = (slug: string) => posts().find((p) => p.slug === slug);

export const priceIsPlaceholder = (w: Work) => !!w.placeholder;

export const brandLogo = (slug: string) => { const p = path.join(process.cwd(), "public", "img", "brands", `${slug}.png`); return fs.existsSync(p) ? `/img/brands/${slug}.png` : null; };
