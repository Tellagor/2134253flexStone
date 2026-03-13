const DEFAULT_LOCALE = "ru-RU";

const collectionLabels = {
  site_settings: "Настройки сайта",
  home_hero: "Главная — Hero",
  assortment_section: "Ассортимент — Секция",
  works_page: "Наши работы — Страница",
  faq_section: "FAQ — Секция",
  certificates_section: "Сертификаты — Секция",
  house_texture_section: "Текстуры дома — Секция",
  delivery_hero: "Доставка — Hero",
  delivery_characteristics_section: "Доставка — Характеристики (секция)",
  delivery_pallet_card: "Доставка — Карточка паллеты",
  contacts_page: "Контакты — Страница",
  colors_page: "Цвета — Страница",
  installation_request_section: "Заявка на установку — Секция",
  navigation_items: "Навигация",
  benefits: "Преимущества",
  assortment_products: "Ассортимент — Продукты",
  assortment_price_tiers: "Ассортимент — Цены (диапазоны)",
  assortment_home_products: "Ассортимент — Продукты на главной",
  works_items: "Наши работы — Элементы",
  faq_items: "FAQ — Вопросы",
  certificates_items: "Сертификаты — Файлы",
  house_texture_items: "Текстуры дома — Элементы",
  delivery_methods: "Доставка — Способы",
  delivery_metrics: "Доставка — Метрики",
  delivery_pallet_items: "Доставка — Пункты паллеты",
  colors_textures: "Цвета — Текстуры",
  leads: "Заявки (лиды)",
};

const fieldLabels = {
  id: "ID",
  status: "Статус",
  sort: "Порядок",
  title: "Заголовок",
  subtitle: "Подзаголовок",
  text: "Текст",
  description: "Описание",
  label: "Название",
  url: "Ссылка",
  place: "Расположение",
  variant: "Вариант",
  slug: "Слаг",
  alt: "Alt-текст",
  phone: "Телефон",
  email: "Email",
  address: "Адрес",
  work_hours: "График работы",
  map_embed_url: "Ссылка карты (embed)",
  brand_name: "Название бренда",
  telegram_url: "Telegram",
  whatsapp_url: "WhatsApp",
  privacy_policy_url: "Политика конфиденциальности",
  seo_title: "SEO заголовок",
  seo_description: "SEO описание",
  seo_title_default: "SEO заголовок (по умолчанию)",
  seo_description_default: "SEO описание (по умолчанию)",
  kicker: "Кикер",
  cta_text: "Текст кнопки",
  cta_href: "Ссылка кнопки",
  cta_url: "Ссылка кнопки",
  submit_text: "Текст отправки",
  created_at: "Создано",
  updated_at: "Обновлено",
  image_id: "Изображение",
  media_image_id: "Изображение",
  file_id: "Файл",
  catalog_file_id: "Файл каталога",
  download_all_file_id: "Файл «Скачать всё»",
  icon_id: "Иконка",
  texture_image_id: "Изображение текстуры",
  house_image_id: "Изображение дома",
  media_video_url: "Видео (URL)",
  name: "Имя",
  middle_name: "Отчество",
  message: "Сообщение",
  agree: "Согласие",
  city: "Город",
  area_m2: "Площадь (м²)",
  type: "Тип",
  product_id: "Продукт",
  product_name_snapshot: "Название продукта (снимок)",
  source_url: "URL источника",
  utm_source: "UTM source",
  utm_medium: "UTM medium",
  utm_campaign: "UTM campaign",
  utm_content: "UTM content",
  utm_term: "UTM term",
  show_on_works_page: "Показывать на /works",
  show_on_home_carousel: "Показывать в карусели на главной",
  value: "Значение",
  unit: "Ед. изм.",
  caption: "Подпись",
  from_m2: "От (м²)",
  to_m2: "До (м²)",
  price_rub: "Цена (₽)",
  product_id: "Продукт",
  short_description: "Краткое описание",
  module_area_m2: "Площадь модуля (м²)",
  tiles_per_module: "Плиток в модуле",
  tile_size: "Размер плитки",
  seam_mm: "Шов (мм)",
  thickness_mm: "Толщина (мм)",
};

function parseArgs(argv) {
  const out = { locale: DEFAULT_LOCALE, dryRun: false };
  for (const arg of argv) {
    if (arg === "--dry-run") out.dryRun = true;
    if (arg.startsWith("--locale=")) out.locale = arg.slice("--locale=".length);
  }
  return out;
}

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

async function httpJson(url, { method = "GET", token, body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore
  }
  if (!res.ok) {
    const details = json?.errors?.[0]?.message ?? text ?? res.statusText;
    throw new Error(`${method} ${url} -> ${res.status}: ${details}`);
  }
  return json;
}

function upsertTranslation(meta, locale, label) {
  const translations = Array.isArray(meta?.translations) ? [...meta.translations] : [];
  const idx = translations.findIndex((t) => t?.language === locale);
  if (idx >= 0) translations[idx] = { ...translations[idx], translation: label };
  else translations.push({ language: locale, translation: label });
  return { ...(meta ?? {}), translations };
}

function humanizeFallback(fieldName) {
  const s = String(fieldName).replace(/_/g, " ").trim();
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

async function main() {
  const { locale, dryRun } = parseArgs(process.argv.slice(2));
  const baseUrl = requiredEnv("DIRECTUS_URL").replace(/\/+$/, "");
  const token = requiredEnv("DIRECTUS_TOKEN");

  const collectionsResp = await httpJson(`${baseUrl}/collections`, { token });
  const fieldsResp = await httpJson(`${baseUrl}/fields?limit=-1`, { token });

  const collections = collectionsResp?.data ?? [];
  const fields = fieldsResp?.data ?? [];

  let planned = 0;

  for (const c of collections) {
    const name = c?.collection;
    if (!name || !(name in collectionLabels)) continue;
    const label = collectionLabels[name];
    const nextMeta = upsertTranslation(c.meta, locale, label);

    const currentLabel = Array.isArray(c?.meta?.translations)
      ? c.meta.translations.find((t) => t?.language === locale)?.translation
      : undefined;
    if (currentLabel === label) continue;

    planned++;
    console.log(`[collection] ${name} -> ${label}`);
    if (!dryRun) {
      await httpJson(`${baseUrl}/collections/${encodeURIComponent(name)}`, {
        token,
        method: "PATCH",
        body: { meta: nextMeta },
      });
    }
  }

  for (const f of fields) {
    const collection = f?.collection;
    const field = f?.field;
    if (!collection || !field) continue;
    if (!(collection in collectionLabels)) continue;

    const label = fieldLabels[field] ?? humanizeFallback(field);
    const nextMeta = upsertTranslation(f.meta, locale, label);

    const currentLabel = Array.isArray(f?.meta?.translations)
      ? f.meta.translations.find((t) => t?.language === locale)?.translation
      : undefined;
    if (currentLabel === label) continue;

    planned++;
    console.log(`[field] ${collection}.${field} -> ${label}`);
    if (!dryRun) {
      await httpJson(
        `${baseUrl}/fields/${encodeURIComponent(collection)}/${encodeURIComponent(field)}`,
        {
          token,
          method: "PATCH",
          body: { meta: nextMeta },
        }
      );
    }
  }

  console.log(dryRun ? `\nDRY RUN: ${planned} changes planned.` : `\nDone: ${planned} changes applied.`);
}

main().catch((err) => {
  console.error(err?.message ?? String(err));
  process.exit(1);
});

