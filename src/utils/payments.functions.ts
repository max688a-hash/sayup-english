import { createServerFn } from '@tanstack/react-start';
import { gatewayFetch, type PaddleEnv } from '@/lib/paddle.server';

const ALLOWED = new Set(['sayup_month', 'sayup_quarter', 'sayup_year']);

export const resolvePaddlePrice = createServerFn({ method: 'GET' })
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => {
    if (!ALLOWED.has(data.priceId) || !['sandbox', 'live'].includes(data.environment)) throw new Error('Invalid price');
    return data;
  })
  .handler(async ({ data }) => {
    const response = await gatewayFetch(data.environment, `/prices?external_id=${encodeURIComponent(data.priceId)}`);
    const result = await response.json();
    if (!result.data?.length) throw new Error('Price not found');
    return result.data[0].id as string;
  });
