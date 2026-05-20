# Invitation Design Platform

Create unique, interactive invitations with the ease of a guided tool and the power of a design platform.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Email:** Resend Node.js SDK
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database
- A verified Resend sending domain and `RESEND_API_KEY`

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Configure your database connection:

Copy `.env.example` to `.env` and update the `DATABASE_URL` with your Neon PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/neondb?sslmode=require"
RESEND_API_KEY="re_********************************"
RESEND_FROM_EMAIL="Name <verified@your-domain.com>"
```

Resend email helpers live in `src/lib/resend.ts` and `src/lib/email.ts`. The send endpoint is `src/app/api/send-email/route.ts`. Keep the `from` address on a verified domain in production.

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Apply database migrations |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx prisma dev` | Run local PostgreSQL in terminal |

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── generated/prisma/  # Auto-generated Prisma client
│   └── lib/
│       └── prisma.ts      # PrismaClient singleton
├── public/                # Static assets
├── .env                   # Environment variables
└── vercel.json            # Vercel deployment config
```

## Database

- Schema is defined in `prisma/schema.prisma`
- Migrations are stored in `prisma/migrations/`
- Prisma client is generated to `src/generated/prisma`
- Always run `npx prisma generate` after schema changes

## Deployment

Deploy to Vercel using the CLI:

```bash
npx vercel
```

Set `DATABASE_URL` in your Vercel project environment variables. The build command (`prisma generate && next build`) is configured in `vercel.json`.
