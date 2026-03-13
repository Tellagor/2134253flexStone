# Схема Directus (MySQL) — Flexstone

Документ описывает кастомные таблицы из `directus-schema.mysql.sql` и то, как они соотносятся с UI проекта.

## Общие принципы

- **Directus создаёт системные таблицы** `directus_*` сам. В скрипте — только ваши “контентные” коллекции.
- **Singleton** в Directus: таблицы, где по смыслу должна быть одна запись (в скрипте это `id = 1` + `CHECK`).
- **Статус публикации**: почти везде есть `status` со значениями `draft/published`. В Directus это удобно включать как “Status field”.
- **Сортировка**: в повторяемых коллекциях есть `sort` (int). В Directus это “Sort field”.
- **Файлы/иконки/картинки**: ссылки на файлы хранятся как `CHAR(36)` UUID строки (например `image_id`, `file_id`, `icon_id`). В Directus это обычно relation к `directus_files`.
- **Даты**: `created_at` и `updated_at` в MySQL обновляются автоматически (`updated_at` через `ON UPDATE CURRENT_TIMESTAMP(3)`).

## Таблицы (Singleton)

### `site_settings`
**Назначение:** глобальные настройки сайта (бренд + контакты + ссылки + SEO дефолты).

**Где используется в UI:** общие данные для всего сайта (шапка/подвал, meta по умолчанию, ссылка на политику, файл каталога).

**Поля:**
- `brand_name` — название бренда.
- `phone`, `email` — общие контакты.
- `telegram_url`, `whatsapp_url` — ссылки на мессенджеры.
- `privacy_policy_url` — ссылка на политику.
- `catalog_file_id` — файл (каталог/прайс).
- `seo_title_default`, `seo_description_default` — дефолтные meta.

### `home_hero`
**Назначение:** контент первого экрана главной страницы (hero).

**Где используется в UI:** блок hero на `/` (kicker/title/description/CTA/медиа).

**Поля:**
- `kicker`, `title`, `description` — тексты hero.
- `cta_text` — текст кнопки.
- `media_image_id` — картинка hero.
- `media_video_url` — ссылка на видео (если используешь).

### `assortment_section`
**Назначение:** тексты секции “Ассортимент” (заголовок/описание).

**Где используется в UI:** секция ассортимента на главной/странице ассортимента (если появится).

### `works_page`
**Назначение:** настройки страницы “Наши работы”.

**Где используется в UI:** `/works` (заголовок + SEO).

**Поля:**
- `title` — заголовок.
- `seo_title`, `seo_description` — meta для страницы.

### `faq_section`
**Назначение:** настройки секции FAQ.

**Где используется в UI:** блок FAQ (заголовок + текст кнопки “задать вопрос”).

**Поля:**
- `title` — заголовок секции.
- `ask_button_text` — текст кнопки.

### `certificates_section`
**Назначение:** настройки секции сертификатов (заголовок/подзаголовок + “скачать всё”).

**Где используется в UI:** блок “Сертификаты”.

**Поля:**
- `title`, `subtitle` — тексты.
- `download_all_file_id` — файл “скачать всё” (zip/pdf и т.п.).

### `house_texture_section`
**Назначение:** настройки блока “Текстуры/дом” (текст + цена “от” + CTA).

**Где используется в UI:** блок с текстом, ценой и кнопкой/файлом.

**Поля:**
- `text` — основной текст.
- `price_from_value`, `price_from_unit` — “от X …”.
- `cta_text`, `cta_url`, `cta_file_id` — CTA (ссылка/файл).

### `delivery_hero`
**Назначение:** hero-блок страницы доставки.

**Где используется в UI:** `/delivery` — верхний блок с заголовком, описанием, CTA, картинкой.

**Поля:**
- `title`, `text`, `cta_text`, `cta_href`, `image_id`.

### `delivery_characteristics_section`
**Назначение:** заголовок секции “Характеристики доставки”.

**Где используется в UI:** `/delivery` — левый блок с метриками + правая карточка.

### `delivery_pallet_card`
**Назначение:** правая карточка “На одном европоддоне” (заголовок, картинка, текст кнопки).

**Где используется в UI:** `/delivery` — карточка с буллетами и кнопкой “ЗАДАТЬ ВОПРОС”.

**Поля:**
- `title` — заголовок карточки.
- `image_id` — картинка (паллет/коробки).
- `cta_text` — текст кнопки.

### `contacts_page`
**Назначение:** контент страницы “Контакты”.

**Где используется в UI:** `/contacts` — заголовок, подзаголовок, график работы, телефон/почта, адрес, embed карты.

**Поля:**
- `title`, `subtitle` — верхние тексты.
- `work_hours`, `phone`, `email`, `address` — левый блок.
- `map_embed_url` — ссылка для встраивания карты (iframe).

### `colors_page`
**Назначение:** настройки страницы “Цвета/Каталог текстур”.

**Где используется в UI:** `/colors` — заголовок страницы.

**Поля:**
- `title` — заголовок (“Каталог текстур”).

### `installation_request_section`
**Назначение:** настройки секции “Заявка на установку”.

**Где используется в UI:** виджет `installation-request` (форма + картинка).

**Поля:**
- `title` — заголовок.
- `submit_text` — текст кнопки.
- `image_id` — картинка фона/блока.

## Таблицы (Повторяемые коллекции)

### `navigation_items`
**Назначение:** пункты навигации (header/footer).

**Где используется в UI:** ссылки в шапке/подвале.

**Поля:**
- `label`, `url` — текст/ссылка.
- `place` — где показывать: `header` или `footer`.
- `sort` — порядок.

### `benefits`
**Назначение:** карточки “Преимущества”.

**Где используется в UI:** блок benefits.

**Поля:**
- `title`, `text` — контент.
- `variant` — позиционирование/вариант (`left/center/right`).
- `sort` — порядок.

### `assortment_products`
**Назначение:** продукты для ассортимента.

**Где используется в UI:** карточки ассортимента, детали продукта, цена, тех.характеристики.

**Поля:**
- `name`, `slug`, `short_description`.
- `image_id` — картинка продукта.
- `module_area_m2`, `tiles_per_module`, `tile_size`, `seam_mm`, `thickness_mm` — характеристики.
- `sort`, `status`.

### `assortment_price_tiers`
**Назначение:** ценовые диапазоны (tiers) для конкретного продукта.

**Где используется в UI:** таблица цен в карточке продукта.

**Поля/связи:**
- `product_id` → `assortment_products.id` (**FK**).
- `from_m2`, `to_m2`, `price_rub` — диапазон и цена.
- `sort`.

### `assortment_home_products`
**Назначение:** какие продукты показывать на главной в секции ассортимента.

**Где используется в UI:** витрина ассортимента на `/`.

**Поля/связи:**
- `product_id` → `assortment_products.id` (**FK**).
- `sort`.

### `works_items`
**Назначение:** изображения “Наши работы” (галерея/карусель).

**Где используется в UI:** `works-scroll`, а также страница `/works` (если решишь показывать из CMS).

**Поля:**
- `image_id` — картинка работы.
- `alt`, `title`.
- `show_on_works_page`, `show_on_home_carousel` — флаги отображения.
- `sort`, `status`.

### `faq_items`
**Назначение:** элементы FAQ (вопрос/ответ).

**Где используется в UI:** секция FAQ.

### `certificates_items`
**Назначение:** список сертификатов (название + файл).

**Где используется в UI:** секция сертификатов, ссылки на скачивание.

**Поля:**
- `title`, `description`, `file_id`.
- `sort`, `status`.

### `house_texture_items`
**Назначение:** пары картинок “текстура + дом” для блока house-texture.

**Где используется в UI:** блок house-texture.

**Поля:**
- `texture_image_id` — картинка текстуры.
- `house_image_id` — картинка дома/рендера.
- `sort`, `status`.

### `delivery_methods`
**Назначение:** карточки “Способы доставки”.

**Где используется в UI:** `/delivery` — блок с 4 карточками (иконка + заголовок + описание).

**Поля:**
- `title`, `description`.
- `icon_id` — иконка.
- `sort`, `status`.

### `delivery_metrics`
**Назначение:** метрики в “Характеристиках доставки” (например “0.47 м2”, “11 шт” и т.п.).

**Где используется в UI:** `/delivery` — левый блок метрик.

**Поля:**
- `value`, `unit`, `caption`.
- `sort`, `status`.

### `delivery_pallet_items`
**Назначение:** буллеты в карточке “На одном европоддоне”.

**Где используется в UI:** `/delivery` — список из 2+ пунктов.

**Поля:**
- `text` — текст пункта (например “до 24 коробок”).
- `sort`, `status`.

### `colors_textures`
**Назначение:** элементы “Каталога текстур” на странице `/colors`.

**Где используется в UI:** сетка карточек (прямоугольник + подпись; при желании — картинка вместо серого прямоугольника).

**Поля:**
- `label` — подпись под карточкой.
- `image_id` — картинка текстуры (опционально).
- `sort`, `status`.

### `leads`
**Назначение:** заявки/лиды из форм (заявка, вопрос, калькулятор и т.п.).

**Где используется в UI:** отправки из модалок/форм (backend/Directus flows).

**Поля:**
- `type` — источник/тип лида (`request/question/calculator/installation/assortment`).
- `status` — статус обработки (`new/in_progress/done/spam`).
- `name`, `middle_name`, `phone` (+ дополнительные поля формы: `city`, `area_m2`, `message`, `agree`).
- `product_id` → `assortment_products.id` (**FK**, опционально) + `product_name_snapshot`.
- `source_url` и UTM-метки.

## Рекомендованные настройки в Directus (быстро)

1) **Singleton** включить для:
`site_settings`, `home_hero`, `assortment_section`, `works_page`, `faq_section`, `certificates_section`, `house_texture_section`, `delivery_hero`, `delivery_characteristics_section`, `delivery_pallet_card`, `contacts_page`, `colors_page`, `installation_request_section`.

2) **Status field** (`status`) и **Sort field** (`sort`) включить для коллекций:
`navigation_items`, `benefits`, `assortment_products`, `assortment_price_tiers`, `assortment_home_products`, `works_items`, `faq_items`, `certificates_items`, `house_texture_items`, `delivery_methods`, `delivery_metrics`, `delivery_pallet_items`, `colors_textures`.

3) Поля файлов (`*_id`) удобно оформить как relation к `directus_files` и UI-интерфейс “File”.

