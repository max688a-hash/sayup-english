create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- 首位管理员：仅当系统还没有任何管理员时可领取
create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then return false; end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke all on function public.claim_first_admin() from public, anon;
grant execute on function public.claim_first_admin() to authenticated;

create or replace function public.admin_slot_open()
returns boolean language sql stable security definer set search_path = public
as $$ select not exists (select 1 from public.user_roles where role = 'admin') $$;
grant execute on function public.admin_slot_open() to authenticated;

grant select, update on public.aid_applications to authenticated;
create policy "Admins read all aid" on public.aid_applications for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins review aid" on public.aid_applications for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins read aid proofs" on storage.objects for select to authenticated using (bucket_id = 'aid-proofs' and public.has_role(auth.uid(), 'admin'));