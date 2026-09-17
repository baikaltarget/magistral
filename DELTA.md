# Дельта v2 (17.09.2026) относительно v1 (16.09.2026)

Распакуйте архив поверх проекта, заменяя файлы. Затем:

**Удалить файл:** `components/CallBar.tsx` (прикреплённое меню на мобильных).

**Изменённые файлы** — см. список ниже (все включены в архив). Ключевое:
- `content/site.json` — новый H1/оффер, ссылки Max и Telegram вместо WhatsApp, SEO-текст главной, блок «Почему в Магистрали».
- `content/services.json` — у каждой услуги добавлены `when` (когда обращаться), `time`, `note`.
- `components/Header.tsx`, `MobileNav.tsx`, `Footer.tsx` — иконки в меню, Max/Telegram, мобильные кнопки.
- `components/LeadForm.tsx` — маска телефона, чекбокс согласия.
- `app/uslugi/[slug]/page.tsx` — блок Стоимость/Время/Гарантия, «Когда обращаться», «Почему в Магистрали», убран нижний CTA.
- `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx` — меньше отступов, cookie-плашка.

**Новые файлы:** `components/Messengers.tsx`, `components/CookieBar.tsx`, `components/BrandTile.tsx`, `public/img/max.png`, папка `public/img/brands/` для логотипов марок.

## Полный список файлов в архиве
- README.md
- app/globals.css
- app/klientam-iz-oblasti/page.tsx
- app/kommercheskiy-transport/page.tsx
- app/kontakty/page.tsx
- app/layout.tsx
- app/marki/[slug]/page.tsx
- app/marki/page.tsx
- app/page.tsx
- app/uslugi/[slug]/page.tsx
- app/vakansii/page.tsx
- app/yurlicam/page.tsx
- app/zapchasti/page.tsx
- components/BrandTile.tsx
- components/CookieBar.tsx
- components/Footer.tsx
- components/Header.tsx
- components/Icons.tsx
- components/LeadForm.tsx
- components/Messengers.tsx
- components/MobileNav.tsx
- content/pages.json
- content/services.json
- content/site.json
- lib/site.ts
- public/img/max.png
- tailwind.config.ts
