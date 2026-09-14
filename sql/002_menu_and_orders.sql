-- Princes' Coffee — menu, branches and pickup ordering.
--
-- GENERATED FILE. Edit src/lib/content/*.ts and re-run:
--   node scripts/generate-seed.mjs
--
-- Additive migration: sql/init.sql is not modified. Safe to re-run.

BEGIN;

-- ---------------------------------------------------------------
-- Branches live in the existing multi-tenant `shops` table, so
-- loyalty, the stores page and ordering share one source of truth.
-- ---------------------------------------------------------------
ALTER TABLE shops ADD COLUMN IF NOT EXISTS name_en        VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS address_en     TEXT         NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS city           VARCHAR(60)  NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS maps_url       TEXT         NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS hours          VARCHAR(120) NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS accepts_orders BOOLEAN      NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS menu_categories (
    id      SERIAL PRIMARY KEY,
    slug    VARCHAR(60) UNIQUE NOT NULL,
    name_ar VARCHAR(160) NOT NULL,
    name_en VARCHAR(160) NOT NULL,
    image_url TEXT NOT NULL DEFAULT '',
    sort    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS menu_items (
    id          SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
    slug        VARCHAR(80) UNIQUE NOT NULL,
    name_ar     VARCHAR(160) NOT NULL,
    name_en     VARCHAR(160) NOT NULL,
    -- Prices in SAR. price_large is null when the item has one size.
    price       NUMERIC(8,2) NOT NULL CHECK (price >= 0),
    price_large NUMERIC(8,2) CHECK (price_large >= 0),
    image_url   TEXT NOT NULL DEFAULT '',
    is_available BOOLEAN NOT NULL DEFAULT true,
    sort        INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
    id          SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_id     INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    -- Short human-readable code shown at the counter.
    code        VARCHAR(12) UNIQUE NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','accepted','ready','collected','cancelled')),
    -- Always recomputed server-side from menu_items; never trusted from the client.
    total       NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    notes       TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
    id           SERIAL PRIMARY KEY,
    order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
    -- Name and price are denormalised so order history survives menu edits.
    name_ar      VARCHAR(160) NOT NULL,
    name_en      VARCHAR(160) NOT NULL,
    size         VARCHAR(10) NOT NULL DEFAULT 'regular' CHECK (size IN ('regular','large')),
    unit_price   NUMERIC(8,2) NOT NULL CHECK (unit_price >= 0),
    qty          INTEGER NOT NULL CHECK (qty > 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_shop_status  ON orders(shop_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_customer     ON orders(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_shops_city          ON shops(city);

-- ---------------- Branches (37) ----------------
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('السليمانية', 'sulaimaniyah', 'أبرق الرغامة، جدة ٢٢٢٦١', '+966539998999', 'Al-Sulaimaniyah', 'Abraq Al Raghamah, Jeddah 22261', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Sulaimaniyah%20Abraq%20Al%20Raghamah%2C%20Jeddah%2022261', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الراحيلي - طريق مكة', 'rahili-makkah-road', '٤٠٩٣ طريق مكة جدة السريع، الأجواد، جدة ٢٢٤٤١', '+966539998999', 'Al-Rahili Makkah Road', '4093 Makkah-Jeddah Hwy, Alajaweed, Jeddah 22441', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Rahili%20Makkah%20Road%204093%20Makkah-Jeddah%20Hwy%2C%20Alajaweed%2C%20Jeddah%2022441', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الجامعة', 'jamiaa', '٢٠٧٤ المرتضى الشيزري، السليمانية، جدة ٢٢٢٥٣', '+966539998999', 'Al-Jamiaa', '2074 Al Murtadi Ash Shayzari, Al-Sulaimaniyah, Jeddah 22253', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Jamiaa%202074%20Al%20Murtadi%20Ash%20Shayzari%2C%20Al-Sulaimaniyah%2C%20Jeddah%2022253', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الربوة', 'rabwah', 'شارع حراء، الربوة، جدة ٢٣٥٣٦', '+966539998999', 'Al-Rabwah', 'Hira St, Ar Rabwah, Jeddah 23536', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Rabwah%20Hira%20St%2C%20Ar%20Rabwah%2C%20Jeddah%2023536', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('قريش', 'quraish', 'السلامة، جدة ٢٣٤٣٧', '+966539998999', 'Quraish', 'As Salamah, Jeddah 23437', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Quraish%20As%20Salamah%2C%20Jeddah%2023437', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الحمدانية', 'hamdaniyah', '٢٨٧٧ أبو فراس الحمداني، الفلاح، جدة ٢٣٧٦٢', '+966539998999', 'Al-Hamdaniyah', '2877 Abu Firas Al-Hamdani, Al-Felah, Jeddah 23762', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Hamdaniyah%202877%20Abu%20Firas%20Al-Hamdani%2C%20Al-Felah%2C%20Jeddah%2023762', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الحلقة', 'halqa', 'أم القرى، الصفا، جدة ٢٣٤٥٥', '+966539998999', 'Al-Halqa', 'Um Al-Qura, As-Safa, Jeddah 23455', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Halqa%20Um%20Al-Qura%2C%20As-Safa%2C%20Jeddah%2023455', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('ذهبان', 'dhahban', 'ذهبان، جدة ٢٣٨٧٢', '+966539998999', 'Dhahban', 'V4XF+4J, Jeddah 23872', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Dhahban%20V4XF%2B4J%2C%20Jeddah%2023872', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('كبري المربع', 'kabri-al-muraba', '٧٠٧١ سعود الفيصل، الفيصلية، جدة ٢٣٤٤١', '+966539998999', 'Kabri Al-Muraba', '7071 Saud Al-Faisal, Al-Faysaliyah, Jeddah 23441', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Kabri%20Al-Muraba%207071%20Saud%20Al-Faisal%2C%20Al-Faysaliyah%2C%20Jeddah%2023441', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('التحلية مول', 'tahlia-mall', 'التحلية مول، الروضة، جدة ٢٣٤٣١', '+966539998999', 'Al-Tahlia Mall', 'Al-Tahlia Mall, Al-Rawdah, Jeddah 23431', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Tahlia%20Mall%20Al-Tahlia%20Mall%2C%20Al-Rawdah%2C%20Jeddah%2023431', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الكورنيش - الواجهة البحرية', 'corniche', 'طريق الكورنيش الفرعي، الشاطئ، جدة ٢٣٥١٠', '+966539998999', 'Corniche Waterfront', 'Corniche Secondary Road, Beach, Jeddah 23510', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Corniche%20Waterfront%20Corniche%20Secondary%20Road%2C%20Beach%2C%20Jeddah%2023510', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('أبحر', 'abhor', 'شارع الأمير عبد المجيد الفرعي، الصواري، جدة ٢٣٨٢٦', '+966539998999', 'Abhor', 'Prince Abdul Majeed Secondary St, As-Sawari, Jeddah 23826', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Abhor%20Prince%20Abdul%20Majeed%20Secondary%20St%2C%20As-Sawari%2C%20Jeddah%2023826', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الريان', 'rayan', 'شارع الوليد بن هشام بن معاوية، الريان، جدة ٢٣٦٤٣', '+966539998999', 'Al-Rayan', 'Walid bin Hisham bin Muawiyah St, Al-Rayan, Jeddah 23643', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Rayan%20Walid%20bin%20Hisham%20bin%20Muawiyah%20St%2C%20Al-Rayan%2C%20Jeddah%2023643', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('التيسير', 'taysir', '٣٣٥٩ شارع فلسطين، المريخ، جدة ٢٣٢٥٢', '+966539998999', 'Al-Taysir', '3359 Palestine St, Marikh, Jeddah 23252', 'Jeddah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Taysir%203359%20Palestine%20St%2C%20Marikh%2C%20Jeddah%2023252', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الزايدي', 'zaidi', 'الحمراء وأم الجود، مكة المكرمة ٢٤٣٣١', '+966539998999', 'Al-Zaidi', 'Al-Hamra and Um Al-Jood, Mecca 24331', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Zaidi%20Al-Hamra%20and%20Um%20Al-Jood%2C%20Mecca%2024331', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الكعكية', 'kokayyah', 'الشوقية، مكة المكرمة ٢٤٣٥١', '+966539998999', 'Al-Kokayyah', 'Al Shoqiyah, Mecca 24351', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Kokayyah%20Al%20Shoqiyah%2C%20Mecca%2024351', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الشوقية', 'shawqiyyah', 'الشوقية، مكة المكرمة ٢٤٣٥١', '+966539998999', 'Al-Shawqiyyah', '9QMQ+X2J, Mecca 24351', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Shawqiyyah%209QMQ%2BX2J%2C%20Mecca%2024351', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الجعرانة', 'juranah', 'الشرائع الشمالية، مكة المكرمة', '+966539998999', 'Al-Ju''ranah', 'Al Sharai'' Ash Shamaliyyah, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Ju''ranah%20Al%20Sharai''%20Ash%20Shamaliyyah%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الجموم', 'jumum', 'الخالدية، الجموم ٢٥٣٤١', '+966539998999', 'Al-Jumum', 'Alkhaldiyah, Al Jumum 25341', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Jumum%20Alkhaldiyah%2C%20Al%20Jumum%2025341', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('بحرة ١', 'bahrah-1', 'بحرة، مكة المكرمة', '+966539998999', 'Bahrah 1', '9CXQ+J5C Bahrah', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Bahrah%201%209CXQ%2BJ5C%20Bahrah', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الشرائع', 'sharai', '٨٧٣٨ نهاوند، الرشيدية، مكة المكرمة ٢٤٢٦٩', '+966539998999', 'Al-Sharai', '8738-8720 Nahavand, Ar Rashidiyyah, Mecca 24269', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Sharai%208738-8720%20Nahavand%2C%20Ar%20Rashidiyyah%2C%20Mecca%2024269', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الخضراء', 'khadra', 'محمد صالح إبراهيم خوزامي، الخضراء، مكة المكرمة ٢٤٢٦٧', '+966539998999', 'Al-Khadra', 'Muhammad Saleh Ibrahim Khouzami, Al Khadra, Mecca 24267', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Khadra%20Muhammad%20Saleh%20Ibrahim%20Khouzami%2C%20Al%20Khadra%2C%20Mecca%2024267', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('النوارية', 'nawaria', 'طريق مكة المدينة، مكة المكرمة ٢٤٤١٩', '+966539998999', 'Al-Nawaria', 'Mecca-Medina Road, Mecca 24419', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Nawaria%20Mecca-Medina%20Road%2C%20Mecca%2024419', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('العريشي', 'areeshi', 'العوالي، مكة المكرمة ٢٤٣٨٨', '+966539998999', 'Al-Areeshi', 'Al-Awali, Mecca 24388', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Areeshi%20Al-Awali%2C%20Mecca%2024388', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('النزهة', 'nuzha', '٧٠٦١ الزهراء، مكة المكرمة ٢٤٢٢١', '+966539998999', 'Al-Nuzha', '7061 13, 2918, Az-Zahra, Mecca 24221', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Nuzha%207061%2013%2C%202918%2C%20Az-Zahra%2C%20Mecca%2024221', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('البحيرات', 'bohairat', 'البحيرات، مكة المكرمة ٢٤٢٢٧', '+966539998999', 'Al-Bohairat', 'Al-Bohairat, Mecca 24227', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Bohairat%20Al-Bohairat%2C%20Mecca%2024227', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('العمرة', 'umrah', 'العمرة الجديدة، مكة المكرمة ٢٤٤١٤', '+966539998999', 'Al-Umrah', 'Al Umrah Al Jadidah, Mecca 24414', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Umrah%20Al%20Umrah%20Al%20Jadidah%2C%20Mecca%2024414', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('بحرة ٢', 'bahrah-2', 'بحرة ٢٢٨٤٣', '+966539998999', 'Bahrah 2', 'Bahrah 22843', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Bahrah%202%20Bahrah%2022843', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الحسينية', 'husainiyyah', 'طريق الحسينية، مكة المكرمة ٢٤٣٧٥', '+966539998999', 'Al-Husainiyyah', 'Husainiyyah Road, Mecca 24375', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Husainiyyah%20Husainiyyah%20Road%2C%20Mecca%2024375', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الشرائع - الرشيدية', 'sharai-rashidiyyah', 'عمرو بن الطفيل بن عمرو، حي الكوثر، مكة المكرمة', '+966539998999', 'Al-Sharai Al-Rashidiyyah', 'Amr bin At-Tufail bin Amr, Al-Kawthar District, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Sharai%20Al-Rashidiyyah%20Amr%20bin%20At-Tufail%20bin%20Amr%2C%20Al-Kawthar%20District%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('حراء', 'hara', 'المدينة الصناعية، البحيرات، مكة المكرمة', '+966539998999', 'Hara', 'Al-Bohairat Industrial City, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Hara%20Al-Bohairat%20Industrial%20City%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الهدا', 'hada', 'طريق مكة جدة القديم، مكة المكرمة', '+966539998999', 'Hada', 'Old Mecca-Jeddah Road, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Hada%20Old%20Mecca-Jeddah%20Road%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('أم الجود', 'um-al-jood', 'الحمراء وأم الجود، مكة المكرمة', '+966539998999', 'Um Al-Jood', 'Al-Hamra and Um Al-Jood, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Um%20Al-Jood%20Al-Hamra%20and%20Um%20Al-Jood%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('مزدلفة', 'muzdalifah', 'طريق المشاة، المشاعر المقدسة، مكة المكرمة', '+966539998999', 'Muzdalifah', 'Pedestrian Road, Sacred Sites, Mecca', 'Makkah', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Muzdalifah%20Pedestrian%20Road%2C%20Sacred%20Sites%2C%20Mecca', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الوسام ١', 'wessam-1', 'شارع عمر بن الخطاب، حي الأخباب، الطائف', '+966539998999', 'Al-Wessam 1', 'Omar bin Al-Khattab St, Al-Akhabab District, Taif', 'Taif', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Wessam%201%20Omar%20bin%20Al-Khattab%20St%2C%20Al-Akhabab%20District%2C%20Taif', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('الجادية', 'jadiyyah', 'طريق الباحة الجنوبي، الطائف', '+966539998999', 'Al-Jadiyyah', 'J40, South Bahah Road, Taif', 'Taif', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Jadiyyah%20J40%2C%20South%20Bahah%20Road%2C%20Taif', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;
INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)
VALUES ('السيل', 'sil', 'محطة ساسكو، طريق السيل، الطائف', '+966539998999', 'Al-Sil', 'Sasco Station, Al-Sil Road, Taif', 'Taif', 'https://www.google.com/maps/search/?api=1&query=Princes%20Coffee%20Al-Sil%20Sasco%20Station%2C%20Al-Sil%20Road%2C%20Taif', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,
  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;

-- ---------------- Categories (4) ----------------
INSERT INTO menu_categories (slug, name_ar, name_en, image_url, sort)
VALUES ('coffee', 'القهوة', 'Coffee', '/brand/category/saudi-coffee.jpg', 0)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en,
  image_url = EXCLUDED.image_url, sort = EXCLUDED.sort;
INSERT INTO menu_categories (slug, name_ar, name_en, image_url, sort)
VALUES ('cold', 'المشروبات الباردة', 'Cold Drinks', '/brand/category/beverages.jpg', 1)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en,
  image_url = EXCLUDED.image_url, sort = EXCLUDED.sort;
INSERT INTO menu_categories (slug, name_ar, name_en, image_url, sort)
VALUES ('tea', 'الشاي والمشروبات الساخنة', 'Tea & Hot Drinks', '/brand/menu/karak-tea.jpg', 2)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en,
  image_url = EXCLUDED.image_url, sort = EXCLUDED.sort;
INSERT INTO menu_categories (slug, name_ar, name_en, image_url, sort)
VALUES ('food', 'المخبوزات والساندويتشات', 'Bakery & Sandwiches', '/brand/category/pastries.jpg', 3)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en,
  image_url = EXCLUDED.image_url, sort = EXCLUDED.sort;

-- ---------------- Menu items (48) ----------------
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'saudi-coffee', 'قهوة سعودية', 'Saudi Coffee', 6, NULL, '/brand/menu/saudi-coffee.jpg', 0
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'princes-signature', 'سقنتشر الأمراء', 'Princes Signature', 12, NULL, '/brand/menu/princes-signature.jpg', 1
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'espresso', 'إسبريسو', 'Espresso', 10, NULL, '/brand/menu/espresso.jpg', 2
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'macchiato', 'مكياتو', 'Macchiato', 10, NULL, '/brand/menu/macchiato.jpg', 3
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'turkish-coffee', 'قهوة تركية', 'Turkish Coffee', 10, NULL, '/brand/menu/turkish-coffee.jpg', 4
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'french-coffee', 'قهوة فرنسية', 'French Coffee', 12, NULL, '/brand/menu/french-coffee.jpg', 5
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'cortado', 'كورتادو', 'Cortado', 14, NULL, '/brand/menu/cortado.jpg', 6
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'flat-white', 'فلات وايت', 'Flat White', 14, NULL, '/brand/menu/flat-white.jpg', 7
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'americano', 'قهوة أمريكية', 'American Coffee', 8, 11, '/brand/menu/americano.jpg', 8
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'cappuccino', 'كابتشينو', 'Cappuccino', 11, 14, '/brand/menu/cappuccino.jpg', 9
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'mochaccino', 'موكاتشينو', 'Mochaccino', 13, 16, '/brand/menu/mochaccino.jpg', 10
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'nescafe', 'نسكافيه', 'Nescafé', 9, 12, '/brand/menu/nescafe.jpg', 11
  FROM menu_categories WHERE slug = 'coffee'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-saudi-coffee', 'قهوة سعودية باردة', 'Iced Saudi Coffee', 15, 18, '/brand/menu/iced-saudi-coffee.png', 12
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-americano', 'آيس أمريكانو', 'Iced Americano', 12, 15, '/brand/menu/iced-americano.jpg', 13
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-latte', 'آيس لاتيه', 'Iced Latte', 12, 15, '/brand/menu/iced-latte.jpg', 14
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-spanish-latte', 'آيس سبانيش لاتيه', 'Iced Spanish Latte', 15, 18, '/brand/menu/iced-spanish-latte.jpg', 15
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-pistachio-latte', 'آيس بستاشيو لاتيه', 'Iced Pistachio Latte', 15, 18, '/brand/menu/iced-pistachio-latte.jpg', 16
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-mocha', 'آيس موكا', 'Iced Mocha', 15, 18, '/brand/menu/iced-mocha.jpg', 17
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-white-mocha', 'آيس وايت موكا', 'Iced White Mocha', 15, 18, '/brand/menu/iced-white-mocha.jpg', 18
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-shaken', 'آيس شيكن', 'Iced Shaken', 15, 18, '/brand/menu/iced-shaken.jpg', 19
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-mocha-slush', 'آيس موكا سلاش', 'Iced Mocha Slush', 14, 17, '/brand/menu/iced-mocha-slush.jpg', 20
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-chocolate-slush', 'آيس شوكليت سلاش', 'Iced Chocolate Slush', 14, 17, '/brand/menu/iced-chocolate-slush.jpg', 21
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'iced-peach-tea', 'آيس تي خوخ', 'Iced Peach Tea', 15, 18, '/brand/menu/iced-peach-tea.jpg', 22
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'lotus-frappe', 'لوتس فرابيه', 'Lotus Frappé', 19, NULL, '/brand/menu/lotus-frappe.jpg', 23
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'mango-frappe', 'مانجو فرابيه', 'Mango Frappé', 17, NULL, '/brand/menu/mango-frappe.jpg', 24
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'mixed-berry-frappe', 'مكس بيري فرابيه', 'Mixed Berry Frappé', 17, NULL, '/brand/menu/mixed-berry-frappe.jpg', 25
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'classic-mojito', 'كلاسيك موهيتو', 'Classic Mojito', 14, 17, '/brand/menu/classic-mojito.jpg', 26
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'passion-fruit-mojito', 'باشن فروت موهيتو', 'Passion Fruit Mojito', 16, 19, '/brand/menu/passion-fruit-mojito.jpg', 27
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'blue-mojito', 'بلو موهيتو', 'Blue Mojito', 16, 19, '/brand/menu/blue-mojito.jpg', 28
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'watermelon-mojito', 'حبحب موهيتو', 'Watermelon Mojito', 16, 19, '/brand/menu/watermelon-mojito.jpg', 29
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'cloud-lemonade', 'كلاود ليمونيد', 'Cloud Lemonade', 15, 18, '/brand/menu/cloud-lemonade.jpg', 30
  FROM menu_categories WHERE slug = 'cold'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'red-tea', 'شاي أحمر', 'Red Tea', 5, NULL, '/brand/menu/red-tea.jpg', 31
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'green-tea', 'شاي أخضر', 'Green Tea', 7, NULL, '/brand/menu/green-tea.jpg', 32
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'adeni-tea', 'شاي عدني', 'Adeni Tea', 7, NULL, '/brand/menu/adeni-tea.jpg', 33
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'karak-tea', 'شاي كرك', 'Karak Tea', 7, NULL, '/brand/menu/karak-tea.jpg', 34
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'moroccan-tea', 'شاي مغربي', 'Moroccan Tea', 7, NULL, '/brand/menu/moroccan-tea.jpg', 35
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'sahlab', 'سحلب', 'Sahlab', 9, NULL, '/brand/menu/sahlab.jpg', 36
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'hot-chocolate', 'شوكولاتة ساخنة', 'Hot Chocolate', 12, 15, '/brand/menu/hot-chocolate.jpg', 37
  FROM menu_categories WHERE slug = 'tea'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'cheese-croissant', 'كرواسون جبنة', 'Cheese Croissant', 7, NULL, '/brand/menu/cheese-croissant.jpeg', 38
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'donut', 'دونات', 'Donut', 7, NULL, '/brand/menu/donut.jpg', 39
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'chocolate-cookies', 'كوكيز شوكولاتة', 'Chocolate Cookies', 9, NULL, '/brand/menu/chocolate-cookies.jpeg', 40
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'vanilla-cookies', 'كوكيز فانيلا', 'Vanilla Cookies', 9, NULL, '/brand/menu/vanilla-cookies.jpeg', 41
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'english-cake', 'كيك إنجليزي', 'English Cake', 9, NULL, '/brand/menu/english-cake.jpeg', 42
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'chocolate-muffin', 'مافن شوكولاتة', 'Chocolate Muffin', 9, NULL, '/brand/menu/chocolate-muffin.jpg', 43
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'vanilla-muffin', 'مافن فانيلا', 'Vanilla Muffin', 9, NULL, '/brand/menu/vanilla-muffin.jpg', 44
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'tuna-sandwich', 'ساندويتش تونة', 'Tuna Sandwich', 13, NULL, '/brand/menu/tuna-sandwich.jpg', 45
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'halloumi-sandwich', 'ساندويتش جبنة حلومي', 'Halloumi Sandwich', 13, NULL, '/brand/menu/halloumi-sandwich.jpg', 46
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;
INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)
SELECT id, 'chicken-sandwich', 'ساندويتش دجاج', 'Chicken Sandwich', 13, NULL, '/brand/menu/chicken-sandwich.jpg', 47
  FROM menu_categories WHERE slug = 'food'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,
  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;

COMMIT;
