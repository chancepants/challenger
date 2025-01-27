import { TournamentStatus } from '@/src/lib/tournament/tournaments';
import { createTRPCRouter, publicProcedure } from '@/src/server/api/trpc';
import { z } from 'zod';
import { tournaments } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const tournamentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        size: z.number(),
        startTime: z.date(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tournaments).values({
        id: Math.floor(Math.random() * 10_000),
        status: TournamentStatus.NOT_STARTED,
        owner: 'Chance',
        logo: 'TODO',
        ...input,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tournaments.findFirst({
        where: eq(tournaments.id, input.id),
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(tournaments);
  }),
});
