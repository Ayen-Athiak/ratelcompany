-- ═══════════════════════════════════════════════════════
-- RATEL GENERAL TRADING — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

create table if not exists quotes (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  company      text,
  email        text not null,
  phone        text,
  inquiry_type text not null,
  message      text not null,
  status       text not null default 'new' check (status in ('new','read','replied')),
  created_at   timestamptz not null default now()
);

create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null,
  description text not null,
  tags        text[] not null default '{}',
  image_url   text,
  large       boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  excerpt     text not null,
  content     text not null,
  cover_image text,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists team (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  department  text not null,
  bio         text not null,
  photo_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- Row Level Security
alter table quotes   enable row level security;
alter table products enable row level security;
alter table posts    enable row level security;
alter table team     enable row level security;

create policy "Public can submit quotes"    on quotes   for insert to anon with check (true);
create policy "Auth can read quotes"        on quotes   for select to authenticated using (true);
create policy "Auth can update quotes"      on quotes   for update to authenticated using (true);
create policy "Public can read products"    on products for select to anon using (true);
create policy "Auth can manage products"    on products for all    to authenticated using (true);
create policy "Public can read published"   on posts    for select to anon using (published = true);
create policy "Auth can manage posts"       on posts    for all    to authenticated using (true);
create policy "Public can read team"        on team     for select to anon using (true);
create policy "Auth can manage team"        on team     for all    to authenticated using (true);

-- Seed products
insert into products (name, category, description, tags, large, sort_order) values
  ('Food & Commodities',       'food',        'Bulk agricultural products — rice, sugar, flour, cooking oil, and staple food commodities.',                        array['Rice','Sugar','Flour','Cooking Oil','Grains'],         true,  1),
  ('Building Materials',       'building',    'Steel, cement, roofing sheets, pipes, and hardware for construction and residential projects.',                      array['Steel','Cement','Roofing','Pipes','Hardware'],         false, 2),
  ('Electronics & Appliances', 'electronics', 'Consumer electronics and home appliances sourced from trusted global manufacturers.',                               array['Appliances','Gadgets','Lighting','Power','Tech'],      false, 3),
  ('Industrial Supplies',      'industrial',  'Equipment, tools, safety gear, and machinery components for manufacturing and construction.',                        array['Tools','Machinery','Safety Gear','Equipment','Parts'], true,  4),
  ('Household Goods',          'household',   'Cleaning products, kitchenware, furniture, and personal care items for retail and wholesale.',                       array['Kitchenware','Cleaning','Furniture','Personal Care'],  false, 5),
  ('Textiles & Clothing',      'textiles',    'Fabrics, garments, and apparel from leading manufacturers across Asia and Africa.',                                  array['Fabrics','Garments','Uniforms','Apparel'],             false, 6),
  ('Healthcare & Pharma',      'healthcare',  'Medical supplies, equipment, and pharmacy stock sourced to international standards.',                                array['Medical Supplies','Equipment','Pharma'],               false, 7),
  ('Automotive Parts',         'automotive',  'Spare parts, accessories, and automotive supplies from verified manufacturers.',                                     array['Spare Parts','Accessories','Lubricants'],              false, 8);
