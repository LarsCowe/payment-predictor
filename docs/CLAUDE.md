# CLAUDE.md — PaymentPredictor

This file provides AI-agent context for developing PaymentPredictor.

## Project Overview

PaymentPredictor is a SaaS tool helping freelancers predict and prevent late payments. It tracks invoices, scores client risk, and automates follow-up emails.

## Tech Stack Summary

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Neon Postgres + Drizzle ORM
- **Auth:** NextAuth.js v5
- **Email:** Resend
- **Hosting:** Vercel

## Key Directories

| Path | Purpose |
|------|---------|
| `/app` | Next.js pages and API routes |
| `/components/ui` | shadcn/ui base components |
| `/components/forms` | Form components |
| `/components/data-display` | Data display components |
| `/lib/db` | Database client and schema |
| `/lib/auth` | Authentication config |
| `/lib/email` | Email templates and client |
| `/lib/prediction` | Risk scoring algorithm |
| `/lib/validations` | Zod schemas |

## Common Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open Drizzle Studio
pnpm lint         # Run ESLint
pnpm test         # Run tests
```

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` — Neon connection string
- `NEXTAUTH_SECRET` — Auth secret
- `GOOGLE_CLIENT_ID` — OAuth client ID
- `GOOGLE_CLIENT_SECRET` — OAuth secret
- `RESEND_API_KEY` — Email service key

## Code Conventions

- Use Server Components by default
- Use Server Actions for mutations
- Use Zod for all form validation
- Use `cn()` utility for class merging
- Prefer early returns in functions
- Use descriptive variable names

## Database Conventions

- Use UUIDs for primary keys
- Use soft deletes (`deleted_at` column)
- Use `created_at` and `updated_at` on all tables
- Use enums for fixed value sets
- Index frequently queried columns

## Component Patterns

### Server Components (default)
```tsx
export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}
```

### Client Components (interactive)
```tsx
'use client';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Server Actions
```tsx
'use server';
export async function createClient(formData: FormData) {
  const data = clientSchema.parse(Object.fromEntries(formData));
  await db.insert(clients).values(data);
  revalidatePath('/clients');
}
```

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows
- Test files colocated with source

## Performance Guidelines

- Use React Server Components for data fetching
- Implement pagination for large lists
- Cache expensive queries with Redis
- Optimize images with next/image
- Monitor Core Web Vitals

## Security Checklist

- [ ] Validate all user input with Zod
- [ ] Use parameterized queries (Drizzle handles this)
- [ ] Check authorization on every endpoint
- [ ] Rate limit API endpoints
- [ ] Never log sensitive data
- [ ] Use HTTPS everywhere
