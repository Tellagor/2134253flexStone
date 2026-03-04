-- directus-schema.postgres.sql
--
-- Custom content schema for Flexstone (to be used with Directus + PostgreSQL).
--
-- Notes:
-- 1) Directus itself creates system tables (directus_*). This script creates ONLY custom collections.
-- 2) If you want strict foreign keys to directus_files(id), run Directus migrations first.
--    directus_files.id is UUID in Directus. In this script we store file references as UUID.
-- 3) Singletons are modelled as tables with a single row (id = 1) enforced by a CHECK.
--
-- Recommended execution:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f directus-schema.postgres.sql

BEGIN;

-- =========================
-- ENUMS
-- =========================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status') THEN
    CREATE TYPE content_status AS ENUM ('draft', 'published');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nav_place') THEN
    CREATE TYPE nav_place AS ENUM ('header', 'footer');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'benefit_variant') THEN
    CREATE TYPE benefit_variant AS ENUM ('left', 'center', 'right');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_type') THEN
    CREATE TYPE lead_type AS ENUM ('request', 'question', 'calculator', 'installation', 'assortment');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_status') THEN
    CREATE TYPE lead_status AS ENUM ('new', 'in_progress', 'done', 'spam');
  END IF;
END $$;

-- =========================
-- HELPERS (optional timestamps)
-- =========================
-- Directus обычно добавляет свои системные поля через UI (date_created/user_created и т.п.).
-- Если ты хочешь вести базовые даты на уровне БД, оставляем created_at/updated_at.

-- =========================
-- SINGLETONS
-- =========================
CREATE TABLE IF NOT EXISTS site_settings (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  brand_name        text,
  phone             text,
  email             text,

  telegram_url      text,
  whatsapp_url      text,

  privacy_policy_url text,

  catalog_file_id   uuid,

  seo_title_default text,
  seo_description_default text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS home_hero (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  kicker            text,
  title             text,
  description       text,
  cta_text          text,

  media_image_id    uuid,
  media_video_url   text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT home_hero_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS assortment_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  description       text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT assortment_section_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS works_page (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  seo_title         text,
  seo_description   text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT works_page_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS faq_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  ask_button_text   text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT faq_section_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS certificates_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  subtitle          text,
  download_all_file_id uuid,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT certificates_section_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS house_texture_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  text              text,
  price_from_value  numeric(12,2),
  price_from_unit   text,

  cta_text          text,
  cta_url           text,
  cta_file_id       uuid,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT house_texture_section_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS delivery_hero (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  text              text,
  cta_text          text,
  cta_href          text,
  image_id          uuid,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT delivery_hero_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS delivery_characteristics_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT delivery_characteristics_section_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS delivery_pallet_card (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  image_id          uuid,
  cta_text          text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT delivery_pallet_card_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS contacts_page (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  subtitle          text,

  work_hours        text,
  phone             text,
  email             text,
  address           text,

  map_embed_url     text,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT contacts_page_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS installation_request_section (
  id                smallint PRIMARY KEY DEFAULT 1,
  status            content_status NOT NULL DEFAULT 'draft',

  title             text,
  submit_text       text,
  image_id          uuid,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT installation_request_section_singleton CHECK (id = 1)
);

-- =========================
-- COLLECTIONS (repeatable)
-- =========================

CREATE TABLE IF NOT EXISTS navigation_items (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  label       text NOT NULL,
  url         text NOT NULL,
  place       nav_place NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS navigation_items_place_idx ON navigation_items(place);
CREATE INDEX IF NOT EXISTS navigation_items_status_sort_idx ON navigation_items(status, sort);

CREATE TABLE IF NOT EXISTS benefits (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  title       text NOT NULL,
  text        text NOT NULL,
  variant     benefit_variant NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS benefits_status_sort_idx ON benefits(status, sort);

CREATE TABLE IF NOT EXISTS assortment_products (
  id                bigserial PRIMARY KEY,
  status            content_status NOT NULL DEFAULT 'draft',
  sort              integer NOT NULL DEFAULT 0,

  name              text NOT NULL,
  slug              text UNIQUE,
  short_description text,

  image_id          uuid,

  module_area_m2    numeric(12,4),
  tiles_per_module  integer,
  tile_size         text,
  seam_mm           text,
  thickness_mm      integer,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS assortment_products_status_sort_idx ON assortment_products(status, sort);

CREATE TABLE IF NOT EXISTS assortment_price_tiers (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  product_id  bigint NOT NULL,
  from_m2     integer NOT NULL,
  to_m2       integer,
  price_rub   integer NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT assortment_price_tiers_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT assortment_price_tiers_range_chk
    CHECK (to_m2 IS NULL OR to_m2 >= from_m2)
);

CREATE INDEX IF NOT EXISTS assortment_price_tiers_product_idx ON assortment_price_tiers(product_id);
CREATE INDEX IF NOT EXISTS assortment_price_tiers_status_sort_idx ON assortment_price_tiers(status, sort);

CREATE TABLE IF NOT EXISTS assortment_home_products (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  product_id  bigint NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT assortment_home_products_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT assortment_home_products_unique_product UNIQUE (product_id)
);

CREATE INDEX IF NOT EXISTS assortment_home_products_status_sort_idx ON assortment_home_products(status, sort);

CREATE TABLE IF NOT EXISTS works_items (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  image_id    uuid NOT NULL,
  alt         text NOT NULL,
  title       text,

  show_on_works_page   boolean NOT NULL DEFAULT true,
  show_on_home_carousel boolean NOT NULL DEFAULT true,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS works_items_status_sort_idx ON works_items(status, sort);
CREATE INDEX IF NOT EXISTS works_items_flags_idx ON works_items(show_on_works_page, show_on_home_carousel);

CREATE TABLE IF NOT EXISTS faq_items (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  question    text NOT NULL,
  answer      text NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS faq_items_status_sort_idx ON faq_items(status, sort);

CREATE TABLE IF NOT EXISTS certificates_items (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  title       text NOT NULL,
  description text,
  file_id     uuid NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS certificates_items_status_sort_idx ON certificates_items(status, sort);

CREATE TABLE IF NOT EXISTS house_texture_items (
  id            bigserial PRIMARY KEY,
  status        content_status NOT NULL DEFAULT 'draft',
  sort          integer NOT NULL DEFAULT 0,

  texture_image_id uuid NOT NULL,
  house_image_id   uuid NOT NULL,

  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS house_texture_items_status_sort_idx ON house_texture_items(status, sort);

CREATE TABLE IF NOT EXISTS delivery_methods (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  title       text NOT NULL,
  description text,
  icon_id     uuid,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_methods_status_sort_idx ON delivery_methods(status, sort);

CREATE TABLE IF NOT EXISTS delivery_metrics (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  value       text NOT NULL,
  unit        text,
  caption     text NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_metrics_status_sort_idx ON delivery_metrics(status, sort);

CREATE TABLE IF NOT EXISTS delivery_pallet_items (
  id          bigserial PRIMARY KEY,
  status      content_status NOT NULL DEFAULT 'draft',
  sort        integer NOT NULL DEFAULT 0,

  text        text NOT NULL,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_pallet_items_status_sort_idx ON delivery_pallet_items(status, sort);

CREATE TABLE IF NOT EXISTS leads (
  id            bigserial PRIMARY KEY,

  type          lead_type NOT NULL,
  status        lead_status NOT NULL DEFAULT 'new',

  name          text,
  middle_name   text,
  phone         text NOT NULL,

  city          text,
  area_m2       numeric(12,2),
  message       text,
  agree         boolean,

  product_id    bigint,
  product_name_snapshot text,

  source_url    text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,

  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT leads_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS leads_type_idx ON leads(type);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_product_id_idx ON leads(product_id);

-- =========================
-- OPTIONAL: Foreign keys to Directus files
-- =========================
-- Uncomment AFTER Directus is installed (so directus_files table exists).
--
-- ALTER TABLE site_settings
--   ADD CONSTRAINT site_settings_catalog_file_fk
--   FOREIGN KEY (catalog_file_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE home_hero
--   ADD CONSTRAINT home_hero_media_image_fk
--   FOREIGN KEY (media_image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE certificates_section
--   ADD CONSTRAINT certificates_section_download_all_file_fk
--   FOREIGN KEY (download_all_file_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE certificates_items
--   ADD CONSTRAINT certificates_items_file_fk
--   FOREIGN KEY (file_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- ALTER TABLE assortment_products
--   ADD CONSTRAINT assortment_products_image_fk
--   FOREIGN KEY (image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE works_items
--   ADD CONSTRAINT works_items_image_fk
--   FOREIGN KEY (image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- ALTER TABLE house_texture_items
--   ADD CONSTRAINT house_texture_items_texture_image_fk
--   FOREIGN KEY (texture_image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- ALTER TABLE house_texture_items
--   ADD CONSTRAINT house_texture_items_house_image_fk
--   FOREIGN KEY (house_image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- ALTER TABLE delivery_hero
--   ADD CONSTRAINT delivery_hero_image_fk
--   FOREIGN KEY (image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE delivery_methods
--   ADD CONSTRAINT delivery_methods_icon_fk
--   FOREIGN KEY (icon_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE delivery_pallet_card
--   ADD CONSTRAINT delivery_pallet_card_image_fk
--   FOREIGN KEY (image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE installation_request_section
--   ADD CONSTRAINT installation_request_section_image_fk
--   FOREIGN KEY (image_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;
--
-- ALTER TABLE house_texture_section
--   ADD CONSTRAINT house_texture_section_cta_file_fk
--   FOREIGN KEY (cta_file_id) REFERENCES directus_files(id) ON UPDATE CASCADE ON DELETE SET NULL;

COMMIT;
