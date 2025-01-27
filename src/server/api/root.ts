import { tournamentRouter } from './routers/tournament';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  tournament: tournamentRouter,
});

export type AppRouter = typeof appRouter;
