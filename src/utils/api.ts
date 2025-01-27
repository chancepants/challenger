import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/src/server/api/root';
import superjson from 'superjson';

export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: superjson,
      url: 'https://localhost:3000/api/trpc',
    }),
  ],
});
