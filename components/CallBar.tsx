import Link from "next/link";
import { SITE } from "@/lib/site";
import { Phone, Wa } from "./Icons";
export default function CallBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-line px-3 py-2.5 flex gap-2" style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
      <a href={`tel:${SITE.phoneRaw}`} className="btn-primary flex-1 py-3"><Phone width={20} height={20} /> Позвонить</a>
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="btn bg-[#25D366] text-white px-4"><Wa /></a>
      <Link href="/zapis/" className="btn-ghost px-4">Запись</Link>
    </div>
  );
}
