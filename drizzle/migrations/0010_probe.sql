create table public.zz_probe (id int primary key);
grant all on public.zz_probe to service_role;
alter table public.zz_probe enable row level security;