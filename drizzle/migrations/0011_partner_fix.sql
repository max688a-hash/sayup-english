comment on table public.zz_probe is 'DEPRECATED: temporary check table, unused';
alter table public.reward_grants drop constraint reward_grants_kind_check;
alter table public.reward_grants add constraint reward_grants_kind_check check (kind in ('newcomer','streak','points','partner'));
alter table public.apple_notification_events enable row level security;