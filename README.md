# Сайт автосервиса «Магистраль» — magistral138.ru

Next.js 15 (App Router) + Tailwind, статическая генерация. Хостинг: GitHub → Vercel.

## 1. Как опубликовать (≈10 минут)

1. **GitHub.** Зайдите на github.com → **New repository** → имя `magistral138`, Private → Create.
   Нажмите **uploading an existing file**, перетащите **содержимое** этой папки (не саму папку: в корне репозитория должен лежать `package.json`) → **Commit changes**.
2. **Vercel.** vercel.com → Sign up через GitHub → **Add New → Project** → выберите репозиторий `magistral138` → **Deploy**. Ничего менять не нужно, Vercel сам определит Next.js.
3. Через 2–3 минуты сайт откроется на адресе вида `magistral138.vercel.app`. Проверьте его глазами и с телефона.
4. **Домен.** В Vercel: Project → Settings → Domains → Add `magistral138.ru`. Vercel покажет, какие DNS-записи прописать у регистратора домена (A-запись `76.76.21.21` и CNAME `www` → `cname.vercel-dns.com`). Делайте это **только после** проверки сайта на `*.vercel.app`.

Если после правок сайт не обновился: посмотрите счётчик коммитов на GitHub → Vercel → Deployments (Building / Ready / Error) → Ctrl+Shift+R в браузере или окно инкогнито.

## 2. Заявки в Telegram

1. В Telegram напишите @BotFather → `/newbot` → получите **токен**.
2. Добавьте бота в чат/группу, куда должны приходить заявки, отправьте туда любое сообщение.
3. Откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` — найдите `"chat":{"id":-100...}` — это **chat_id**.
4. Vercel → Project → Settings → **Environment Variables** → добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` → Redeploy.

Пока ключей нет, форма честно пишет «не настроено», показывает телефон и кнопку «Отправить в WhatsApp», а заявка попадает в лог Vercel (Project → Logs, искать `[LEAD]`).

## 2а. Логотипы марок

Положите png-логотипы в `public/img/brands/` с именами `toyota.png`, `honda.png`, `nissan.png`, `mazda.png`, `mitsubishi.png`, `subaru.png`, `suzuki.png`, `lexus.png`, `hyundai.png`, `kia.png`, `lada.png`, `uaz.png`, `ford.png`, `volkswagen.png`, `skoda.png` (на старом сайте они лежат в `/distadmin/image/catalog/brands/names/`). Сайт подхватит их автоматически и покажет чёрно-белыми; пока файла нет — показывает название.

## 3. Где что править

Всё, что видит клиент, лежит в папке `content/`. Код трогать не нужно.

| Что | Где |
|---|---|
| Телефон, адрес, режим, ссылки Max/Telegram/VK, тексты главной, FAQ, отзывы, акции, вакансии | `content/site.json` |
| Услуги: тексты, **цены**, FAQ | `content/services.json` |
| Марки: модели, тексты | `content/brands.json` |
| Запчасти, юрлица, коммерческий транспорт, область, о компании | `content/pages.json` |
| Статьи блога | `content/blog/*.md` |
| Фото | `public/img/` |
| Цвета и шрифты | `tailwind.config.ts`, `app/globals.css` |

Правка на GitHub: открыть файл → карандаш → изменить → **Commit changes**. Vercel пересоберёт сайт за 2 минуты.

### Красные рамки «заполнить»

Это места, где нужны ваши данные. У каждого такого элемента в JSON стоит `"placeholder": true` — впишите значение и удалите этот флаг. Когда всё заполнено, выключите рамки разом: `content/site.json` → `"placeholders": { "showFrames": false }`.

Список заглушек:
- **Цены** `от ___ ₽` — во всех услугах в `services.json` (поле `price`).
- **Срок гарантии** — `site.json` → `hero.facts[0]`, `faq` («Даёте гарантию?»), `placeholders.guaranteeTerm`.
- **Габариты коммерческого транспорта** — `site.json` → `placeholders.commercialDimensions`, `pages.json` → `kommercheskiy-transport.faq[0]`.
- **Отзывы** — `site.json` → `reviews`. Сейчас написаны по мотивам реальных с 2ГИС/Яндекса. Замените на настоящие.
- **Зарплаты в вакансиях** — `site.json` → `vacancies`.
- **Акция для постоянных клиентов** — `site.json` → `akcii[2]`.
- **Реквизиты юрлица** — `app/politika/page.tsx` (единственная правка в коде).
- **Карта** — `app/kontakty/page.tsx`: вставьте iframe из Конструктора карт Яндекса вместо блока-заглушки.
- **Координаты для JSON-LD** — `site.json` → `geo` (сейчас примерные, взять из Яндекс Карт).
- **3D-стенд** — если стенд действительно 3D, добавьте слово в `services.json` → `razval-shozhdenie` (h1, intro, works).
- **«Запчасти к приезду»** — `pages.json` → `klientam-iz-oblasti.faq[1]`.

## 4. Как добавить

**Услугу.** В `services.json` скопируйте любой объект, поменяйте `slug` (латиницей, это адрес `/uslugi/<slug>/`), `name`, `h1`, `title`, `description`, `intro`, `works`, `faq`. Если это подраздел хаба — укажите `"parent": "remont-podveski"` и добавьте slug в `children` хаба. Страница, sitemap и меню подхватят сами.

**Марку.** В `brands.json` — аналогично, адрес `/marki/<slug>/`.

**Статью.** Файл `content/blog/<slug>.md` с шапкой:
```
---
title: Заголовок
description: Одно-два предложения для сниппета
date: 2026-10-01
related: zamena-kolodok
relatedName: Замена колодок
---
Текст. Подзаголовки через `## `, списки через `- `, жирный через `**`.
```

**Фото.** Сжать на squoosh.app → WebP, ширина до 1600 px → загрузить в `public/img/` (github.com/<user>/<repo>/upload/main/public/img). В услуге поле `image` — имя файла без расширения.

## 5. Структура адресов

- `/` главная · `/uslugi/` все услуги · `/uslugi/<slug>/` — 23 страницы услуг
- `/marki/` · `/marki/<slug>/` — 15 марок
- `/zapchasti/` · `/kommercheskiy-transport/` · `/yurlicam/` · `/klientam-iz-oblasti/`
- `/blog/` · `/blog/<slug>/` — 10 статей
- `/o-kompanii/` · `/kontakty/` · `/otzyvy/` · `/akcii/` · `/vakansii/` · `/zapis/` · `/politika/`
- `/sitemap.xml` · `/robots.txt` — генерируются автоматически

301-редиректы со старых адресов (`/category/...`, `/page/about`, `/contact`, `/specials`, `/vacancies`, `/testimonials`, `/faq`) прописаны в `vercel.json`.

## 6. После публикации

1. **Яндекс Вебмастер** — добавить сайт, подтвердить, указать `https://magistral138.ru/sitemap.xml`, регион «Иркутск».
2. **Google Search Console** — то же самое.
3. **Яндекс Метрика** — создать счётчик, код вставить в `app/layout.tsx` перед `</body>` (там есть комментарий-метка).
4. **Яндекс Бизнес и 2ГИС** — телефон и адрес должны совпадать с сайтом до символа. Добавить ссылку на сайт в карточки.
5. Попросить довольных клиентов оставить отзывы на Яндекс Картах и 2ГИС.
6. Старый сайт: не отключать хостинг, пока новый не проверен на домене. После переезда старый выключить — редиректы уже настроены.

## 7. Локальный запуск (для разработчика)

```
npm install
npm run dev      # http://localhost:3000
npm run build    # проверка сборки
```
