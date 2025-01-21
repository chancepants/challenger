This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local Development

1. install docker
2. pull down the postgres docker image: `docker pull postgres`
3. run postgres: `docker run --name chance -e POSTGRES_PASSWORD=chance -d -p 5434:5432 postgres`
4. setup .env: `DATABASE_URL=postgres://postgres:chance@localhost:5434/postgres`
5. run drizzle migrations: `npx drizzle-kit migrate`
6. run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
