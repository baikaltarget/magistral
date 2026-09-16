import type { Metadata } from "next";
export function meta(title: string, description: string, path: string, image?: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, ...(image ? { images: [image] } : {}) } };
}
