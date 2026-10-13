create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  item_key text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, item_key)
);
grant select, insert, delete on public.learning_progress to authenticated;
grant all on public.learning_progress to service_role;
alter table public.learning_progress enable row level security;
create policy "own progress read" on public.learning_progress for select to authenticated using (auth.uid() = user_id);
create policy "own progress insert" on public.learning_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "own progress delete" on public.learning_progress for delete to authenticated using (auth.uid() = user_id);

create table public.practice_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  target text not null,
  heard text not null default '',
  score int not null default 0,
  main_issue text,
  created_at timestamptz not null default now()
);
create index on public.practice_records(user_id, created_at desc);
grant select, insert on public.practice_records to authenticated;
grant all on public.practice_records to service_role;
alter table public.practice_records enable row level security;
create policy "own records read" on public.practice_records for select to authenticated using (auth.uid() = user_id);
create policy "own records insert" on public.practice_records for insert to authenticated with check (auth.uid() = user_id);

create table public.aid_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  aid_type text not null check (aid_type in ('poor','normal')),
  full_name text not null,
  school text not null,
  region text not null,
  proof_path text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  review_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
grant select, insert on public.aid_applications to authenticated;
grant all on public.aid_applications to service_role;
alter table public.aid_applications enable row level security;
create policy "own aid read" on public.aid_applications for select to authenticated using (auth.uid() = user_id);
create policy "own aid insert" on public.aid_applications for insert to authenticated with check (auth.uid() = user_id and status = 'pending');

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  paddle_subscription_id text not null unique,
  paddle_customer_id text not null,
  product_id text not null,
  price_id text not null,
  status text not null default 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  environment text not null default 'sandbox',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index on public.subscriptions(user_id);
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "own subscription read" on public.subscriptions for select to authenticated using (auth.uid() = user_id);

create policy "own proof upload" on storage.objects for insert to authenticated with check (bucket_id = 'aid-proofs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own proof read" on storage.objects for select to authenticated using (bucket_id = 'aid-proofs' and (storage.foldername(name))[1] = auth.uid()::text);