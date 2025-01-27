import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '@/src/server/api/root';
import { createTRPCContext } from '@/src/server/api/trpc';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
