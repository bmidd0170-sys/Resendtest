# AGENTS.md

## Project
Invitation design platform — create unique, interactive invitations with guided tools and design-platform power.

## Stack
- **Framework:** Next.js 16 (App Router, src/)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`
- **ORM:** Prisma (client at `src/generated/prisma`)
- **Database:** PostgreSQL on Neon
- **Deployment:** Vercel

## Commands
```bash
npm run dev        # Start dev server
npm run build      # Build for production (includes Prisma generate)
npm run start      # Start production server
npm run lint       # Run ESLint
npx prisma dev     # Run local Postgres in terminal
npx prisma migrate dev  # Apply migrations
npx prisma studio  # Open Prisma Studio
```

## Key Files
- `src/lib/prisma.ts` — PrismaClient singleton (prevents hot-reload connection leaks)
- `prisma/schema.prisma` — Database schema
- `.env` — DATABASE_URL (Neon PostgreSQL, sslmode=require)

## Vercel Deploy
- `vercel.json` sets build command to `prisma generate && next build`
- Set `DATABASE_URL` env var in Vercel dashboard
- Use `npx vercel` for CLI deploys

## Notes
- Import alias: `@/*` → `./src/*`
- Prisma client output is in `src/generated/prisma` (not node_modules)
- Always run `prisma generate` after schema changes
- Read `node_modules/next/dist/docs/` for Next.js 16 specifics
