import Link from "next/link";
import Image from "next/image";
import { brandLogo, type Brand } from "@/lib/site";
export default function BrandTile({ b }: { b: Brand }) {
  const logo = brandLogo(b.slug);
  return (
    <Link href={`/marki/${b.slug}/`} className="card px-4 py-4 hover:border-accent transition flex items-center gap-3">
      {logo && <span className="w-14 h-10 shrink-0 flex items-center justify-center"><Image src={logo} alt={b.name} width={56} height={40} className="max-h-10 max-w-14 w-auto h-auto object-contain opacity-80" /></span>}
      <span className="min-w-0"><span className="block font-extrabold text-lg leading-tight">{b.name}</span><span className="block text-xs text-muted mt-0.5 line-clamp-1">{b.models.slice(0, 3).join(", ")}</span></span>
    </Link>
  );
}
