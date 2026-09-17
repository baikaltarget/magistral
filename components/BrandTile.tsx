import Link from "next/link";
import Image from "next/image";
import { brandLogo, type Brand } from "@/lib/site";
export default function BrandTile({ b }: { b: Brand }) {
  const logo = brandLogo(b.slug);
  return (
    <Link href={`/marki/${b.slug}/`} className="card px-4 py-4 hover:border-accent transition flex items-center gap-3">
      {logo ? <Image src={logo} alt={b.name} width={56} height={40} className="h-9 w-auto max-w-[64px] object-contain grayscale opacity-70" /> : <span className="w-10 h-10 rounded-lg bg-[#F2F3F5] flex items-center justify-center font-extrabold text-muted">{b.name[0]}</span>}
      <span><span className="block font-extrabold text-lg leading-tight">{b.name}</span><span className="block text-xs text-muted mt-0.5 line-clamp-1">{b.models.slice(0, 3).join(", ")}</span></span>
    </Link>
  );
}
