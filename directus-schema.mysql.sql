-- directus-schema.mysql.sql
--
-- Custom content schema for Flexstone (to be used with Directus + MySQL 8+).
--
-- Notes:
-- 1) Directus itself creates system tables (directus_*). This script creates ONLY custom collections.
-- 2) File references are stored as CHAR(36) UUID strings to match Directus file ids in MySQL.
-- 3) Singletons are modelled as tables with a single row (id = 1) enforced by a CHECK (MySQL 8.0.16+).
--
-- Recommended execution:
--   mysql -u user -p -D database < directus-schema.mysql.sql

START TRANSACTION;

-- =========================
-- SINGLETONS
-- =========================

CREATE TABLE IF NOT EXISTS site_settings (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  brand_name           TEXT,
  phone                TEXT,
  email                TEXT,

  telegram_url         TEXT,
  whatsapp_url         TEXT,

  privacy_policy_url   TEXT,

  catalog_file_id      CHAR(36),

  seo_title_default    TEXT,
  seo_description_default TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT site_settings_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS home_hero (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  kicker               TEXT,
  title                TEXT,
  description          TEXT,
  cta_text             TEXT,

  media_image_id       CHAR(36),
  media_video_url      TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT home_hero_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS assortment_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  description          TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT assortment_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS works_page (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  seo_title            TEXT,
  seo_description      TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT works_page_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS faq_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  ask_button_text      TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT faq_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS certificates_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  subtitle             TEXT,
  download_all_file_id CHAR(36),

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT certificates_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS house_texture_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  text                 TEXT,
  price_from_value     DECIMAL(12,2),
  price_from_unit      TEXT,

  cta_text             TEXT,
  cta_url              TEXT,
  cta_file_id          CHAR(36),

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT house_texture_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_hero (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  text                 TEXT,
  cta_text             TEXT,
  cta_href             TEXT,
  image_id             CHAR(36),

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT delivery_hero_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_characteristics_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT delivery_characteristics_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_pallet_card (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  image_id             CHAR(36),
  cta_text             TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT delivery_pallet_card_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contacts_page (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  subtitle             TEXT,

  work_hours           TEXT,
  phone                TEXT,
  email                TEXT,
  address              TEXT,

  map_embed_url        TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT contacts_page_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS colors_page (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT colors_page_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS installation_request_section (
  id                   SMALLINT UNSIGNED PRIMARY KEY DEFAULT 1,
  status               ENUM('draft', 'published') NOT NULL DEFAULT 'draft',

  title                TEXT,
  submit_text          TEXT,
  image_id             CHAR(36),

  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT installation_request_section_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- COLLECTIONS (repeatable)
-- =========================

CREATE TABLE IF NOT EXISTS navigation_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  label       TEXT NOT NULL,
  url         TEXT NOT NULL,
  place       ENUM('header', 'footer') NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY navigation_items_place_idx (place),
  KEY navigation_items_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS benefits (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  title       TEXT NOT NULL,
  text        TEXT NOT NULL,
  variant     ENUM('left', 'center', 'right') NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY benefits_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS assortment_products (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status            ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort              INT NOT NULL DEFAULT 0,

  name              TEXT NOT NULL,
  slug              VARCHAR(255) UNIQUE,
  short_description TEXT,

  image_id          CHAR(36),

  module_area_m2    DECIMAL(12,4),
  tiles_per_module  INT,
  tile_size         TEXT,
  seam_mm           TEXT,
  thickness_mm      INT,

  created_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY assortment_products_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS assortment_price_tiers (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  product_id  BIGINT UNSIGNED NOT NULL,
  from_m2     INT NOT NULL,
  to_m2       INT,
  price_rub   INT NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT assortment_price_tiers_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT assortment_price_tiers_range_chk
    CHECK (to_m2 IS NULL OR to_m2 >= from_m2),

  KEY assortment_price_tiers_product_idx (product_id),
  KEY assortment_price_tiers_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS assortment_home_products (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  product_id  BIGINT UNSIGNED NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT assortment_home_products_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT assortment_home_products_unique_product UNIQUE (product_id),

  KEY assortment_home_products_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS works_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  image_id    CHAR(36) NOT NULL,
  alt         TEXT NOT NULL,
  title       TEXT,

  show_on_works_page     TINYINT(1) NOT NULL DEFAULT 1,
  show_on_home_carousel  TINYINT(1) NOT NULL DEFAULT 1,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY works_items_status_sort_idx (status, sort),
  KEY works_items_flags_idx (show_on_works_page, show_on_home_carousel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS faq_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY faq_items_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS certificates_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  title       TEXT NOT NULL,
  description TEXT,
  file_id     CHAR(36) NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY certificates_items_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS house_texture_items (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status           ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort             INT NOT NULL DEFAULT 0,

  texture_image_id CHAR(36) NOT NULL,
  house_image_id   CHAR(36) NOT NULL,

  created_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY house_texture_items_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_methods (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  title       TEXT NOT NULL,
  description TEXT,
  icon_id     CHAR(36),

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY delivery_methods_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_metrics (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  value       TEXT NOT NULL,
  unit        TEXT,
  caption     TEXT NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY delivery_metrics_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_pallet_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  text        TEXT NOT NULL,

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY delivery_pallet_items_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS colors_textures (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status      ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort        INT NOT NULL DEFAULT 0,

  label       TEXT NOT NULL,
  image_id    CHAR(36),

  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  KEY colors_textures_status_sort_idx (status, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS leads (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  type          ENUM('request', 'question', 'calculator', 'installation', 'assortment') NOT NULL,
  status        ENUM('new', 'in_progress', 'done', 'spam') NOT NULL DEFAULT 'new',

  name          TEXT,
  middle_name   TEXT,
  phone         TEXT NOT NULL,

  city          TEXT,
  area_m2       DECIMAL(12,2),
  message       TEXT,
  agree         TINYINT(1),

  product_id    BIGINT UNSIGNED,
  product_name_snapshot TEXT,

  source_url    TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  utm_content   TEXT,
  utm_term      TEXT,

  created_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  CONSTRAINT leads_product_fk
    FOREIGN KEY (product_id) REFERENCES assortment_products(id)
      ON UPDATE CASCADE ON DELETE SET NULL,

  KEY leads_type_idx (type),
  KEY leads_status_idx (status),
  KEY leads_created_at_idx (created_at),
  KEY leads_product_id_idx (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- OPTIONAL: Foreign keys to Directus files
-- =========================
-- Uncomment AFTER Directus is installed (so directus_files table exists).
--
-- In MySQL Directus uses CHAR(36) UUIDs for directus_files.id.
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

