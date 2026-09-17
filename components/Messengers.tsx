import Image from "next/image";
import SITE from "@/content/site.json";
import { Tg } from "./Icons";
export function MaxLink({ className = "w-10 h-10", label = true }: { className?: string; label?: boolean }) {
  return (<a href={SITE.max} target="_blank" rel="noopener" aria-label="Написать в Max" title="Написать в Max" className={`${className} flex items-center justify-center shrink-0`}><Image src="/img/max.png" alt="Max" width={40} height={40} className="w-full h-full" /></a>);
}
export function TgLink({ className = "w-10 h-10" }: { className?: string }) {
  return (<a href={SITE.telegramUrl} target="_blank" rel="noopener" aria-label="Написать в Telegram" title="Написать в Telegram" className={`${className} rounded-full bg-[#2AABEE] text-white flex items-center justify-center shrink-0`}><Tg /></a>);
}
