-- MyPartner — Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query → Run

-- ─── Businesses ──────────────────────────────────────────────────────────────
create table if not exists businesses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users not null unique,
  name       text not null default 'העסק שלי',
  profession text,
  phone      text,
  email      text,
  vat        text,
  created_at timestamptz default now()
);
alter table businesses enable row level security;
create policy "own_business" on businesses for all
  using (auth.uid() = user_id);

-- ─── Customers ───────────────────────────────────────────────────────────────
create table if not exists customers (
  id          bigserial primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name        text not null,
  phone       text,
  email       text,
  address     text,
  status      text default 'active',
  visits      int default 0,
  revenue     text default '₪0',
  rating      numeric default 5.0,
  last_visit  text default 'היום',
  initials    text,
  created_at  timestamptz default now()
);
alter table customers enable row level security;
create policy "own_customers" on customers for all
  using (business_id in (select id from businesses where user_id = auth.uid()));

-- ─── Leads ───────────────────────────────────────────────────────────────────
create table if not exists leads (
  id          bigserial primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name        text not null,
  job_type    text,
  phone       text,
  date        text default 'היום',
  status      text default 'חדש',
  hot         boolean default false,
  created_at  timestamptz default now()
);
alter table leads enable row level security;
create policy "own_leads" on leads for all
  using (business_id in (select id from businesses where user_id = auth.uid()));

-- ─── Quotes ──────────────────────────────────────────────────────────────────
create table if not exists quotes (
  id           text primary key,
  business_id  uuid references businesses(id) on delete cascade not null,
  client       text not null,
  client_phone text,
  job          text,
  amount       text default '₪0',
  amount_num   numeric default 0,
  status       text default 'open',
  status_label text default 'פתוח',
  date         text default 'היום',
  viewed       boolean default false,
  hot          boolean default false,
  items        jsonb default '[]',
  created_at   timestamptz default now()
);
alter table quotes enable row level security;
create policy "own_quotes" on quotes for all
  using (business_id in (select id from businesses where user_id = auth.uid()));

-- ─── Invoices ────────────────────────────────────────────────────────────────
create table if not exists invoices (
  id             text primary key,
  business_id    uuid references businesses(id) on delete cascade not null,
  type           text not null,
  client         text,
  client_phone   text,
  client_vat     text default '',
  job            text,
  items          jsonb default '[]',
  subtotal       numeric default 0,
  vat            numeric default 0,
  total          numeric default 0,
  status         text default 'sent',
  date           text,
  quote_ref      text default '',
  payment_method text,
  created_at     timestamptz default now()
);
alter table invoices enable row level security;
create policy "own_invoices" on invoices for all
  using (business_id in (select id from businesses where user_id = auth.uid()));

-- ─── Suppliers ───────────────────────────────────────────────────────────────
create table if not exists suppliers (
  id          bigserial primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name        text not null,
  contact     text,
  phone       text,
  specialty   text,
  rating      numeric default 5.0,
  last_order  text,
  terms       text,
  category    text,
  created_at  timestamptz default now()
);
alter table suppliers enable row level security;
create policy "own_suppliers" on suppliers for all
  using (business_id in (select id from businesses where user_id = auth.uid()));

-- ─── Inventory ───────────────────────────────────────────────────────────────
create table if not exists inventory (
  id          bigserial primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name        text not null,
  sku         text,
  qty         int default 0,
  min_qty     int default 0,
  unit        text default 'יח''',
  price       numeric default 0,
  supplier    text,
  category    text,
  created_at  timestamptz default now()
);
alter table inventory enable row level security;
create policy "own_inventory" on inventory for all
  using (business_id in (select id from businesses where user_id = auth.uid()));
