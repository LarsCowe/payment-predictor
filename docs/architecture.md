# PaymentPredictor — Architecture Document

**Version:** 1.0  
**Last Updated:** 2026-02-06  
**Author:** Engineering Team  
**Status:** Draft

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [API Design](#api-design)
6. [File Structure](#file-structure)
7. [Authentication & Security](#authentication--security)
8. [Background Jobs](#background-jobs)
9. [Deployment & Infrastructure](#deployment--infrastructure)
10. [Monitoring & Observability](#monitoring--observability)
11. [Performance Considerations](#performance-considerations)

---

## Overview

### Architecture Philosophy

PaymentPredictor is designed with the following principles:

1. **Simplicity First** — Avoid over-engineering. Start simple, add complexity only when needed.
2. **Serverless by Default** — Leverage serverless infrastructure for scalability and cost efficiency.
3. **Type Safety** — TypeScript everywhere for reliability and developer experience.
4. **Edge-Ready** — Design for edge deployment where possible.
5. **Data Integrity** — Prioritize data consistency and durability.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENTS                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐            │
│  │  Web App     │   │  Mobile App  │   │   API        │            │
│  │  (Next.js)   │   │  (PWA/React) │   │  Clients     │            │
│  └──────────────┘   └──────────────┘   └──────────────┘            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EDGE / CDN                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Vercel Edge Network                         │  │
│  │                 (Static assets, Edge Functions)                │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                    Next.js 16 Application                        ││
│  │                                                                   ││
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ ││
│  │  │ Server Components │  │ Server Actions  │  │ API Routes     │ ││
│  │  └──────────────────┘  └──────────────────┘  └────────────────┘ ││
│  │                                                                   ││
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ ││
│  │  │ Client Components│  │ Middleware      │  │ Edge Functions │ ││
│  │  └──────────────────┘  └──────────────────┘  └────────────────┘ ││
│  │                                                                   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐            │
│  │  Neon        │   │  Redis       │   │  Blob        │            │
│  │  Postgres    │   │  (Upstash)   │   │  (Vercel)    │            │
│  │  (Primary)   │   │  (Caching)   │   │  (Files)     │            │
│  └──────────────┘   └──────────────┘   └──────────────┘            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐            │
│  │  Resend      │   │  Stripe      │   │  Sentry      │            │
│  │  (Email)     │   │  (Billing)   │   │  (Errors)    │            │
│  └──────────────┘   └──────────────┘   └──────────────┘            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | Full-stack React framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS |
| shadcn/ui | Latest | UI component library |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |
| TanStack Query | 5.x | Data fetching/caching |
| Recharts | 2.x | Charts and visualizations |
| Lucide React | Latest | Icon library |
| date-fns | 3.x | Date manipulation |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 16.x | API endpoints |
| Drizzle ORM | 0.30.x | Database ORM |
| NextAuth.js | 5.x | Authentication |
| Resend | Latest | Transactional email |
| Upstash Redis | Latest | Rate limiting, caching |
| Inngest | Latest | Background jobs |

### Database

| Technology | Version | Purpose |
|------------|---------|---------|
| Neon Postgres | 16.x | Primary database |
| Drizzle Kit | Latest | Migrations |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| Vercel | Hosting, CI/CD |
| Neon | Serverless Postgres |
| Upstash | Serverless Redis |
| Resend | Email delivery |
| Sentry | Error tracking |
| Vercel Analytics | Product analytics |

### Development Tools

| Tool | Purpose |
|------|---------|
| pnpm | Package manager |
| ESLint | Linting |
| Prettier | Code formatting |
| Vitest | Unit testing |
| Playwright | E2E testing |
| Husky | Git hooks |
| Commitlint | Commit message linting |

---

## System Architecture

### Request Flow

```
User Request
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ Vercel Edge Network                                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ • CDN cache check                                           │ │
│ │ • Edge middleware (auth check, geolocation)                 │ │
│ │ • Static asset serving                                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ Next.js Application                                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Middleware                                                   │ │
│ │ • Session validation                                        │ │
│ │ • Rate limiting check                                       │ │
│ │ • Request logging                                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│            ┌─────────────────┼─────────────────┐                │
│            ▼                 ▼                 ▼                │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐       │
│ │ Server         │ │ API Routes     │ │ Server         │       │
│ │ Components     │ │ /api/*         │ │ Actions        │       │
│ │ (RSC)          │ │                │ │                │       │
│ └────────────────┘ └────────────────┘ └────────────────┘       │
│            │                 │                 │                │
│            └─────────────────┴─────────────────┘                │
│                              │                                   │
│                              ▼                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Data Access Layer (Drizzle ORM)                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ Data Layer                                                       │
│ ┌──────────────────────┐ ┌──────────────────────┐               │
│ │ Neon Postgres        │ │ Upstash Redis        │               │
│ │ • User data          │ │ • Session cache      │               │
│ │ • Invoices/Clients   │ │ • Rate limit state   │               │
│ │ • Settings           │ │ • Computed caches    │               │
│ └──────────────────────┘ └──────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PAGES (App Router)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  app/                                                            │
│  ├── (auth)/                  # Auth group (login, register)    │
│  │   ├── login/                                                 │
│  │   └── register/                                              │
│  ├── (dashboard)/             # Protected group                 │
│  │   ├── layout.tsx           # Shared dashboard layout         │
│  │   ├── page.tsx             # Dashboard home                  │
│  │   ├── invoices/                                              │
│  │   ├── clients/                                               │
│  │   ├── reports/                                               │
│  │   └── settings/                                              │
│  ├── api/                     # API routes                      │
│  │   ├── auth/                                                  │
│  │   ├── clients/                                               │
│  │   ├── invoices/                                              │
│  │   └── webhooks/                                              │
│  ├── layout.tsx               # Root layout                     │
│  └── page.tsx                 # Landing page                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENTS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  components/                                                     │
│  ├── ui/                      # shadcn/ui components            │
│  │   ├── button.tsx                                             │
│  │   ├── input.tsx                                              │
│  │   ├── card.tsx                                               │
│  │   └── ...                                                    │
│  ├── forms/                   # Form components                 │
│  │   ├── client-form.tsx                                        │
│  │   ├── invoice-form.tsx                                       │
│  │   └── ...                                                    │
│  ├── data-display/            # Data display components         │
│  │   ├── client-card.tsx                                        │
│  │   ├── invoice-table.tsx                                      │
│  │   ├── risk-badge.tsx                                         │
│  │   └── ...                                                    │
│  └── layout/                  # Layout components               │
│      ├── sidebar.tsx                                            │
│      ├── header.tsx                                             │
│      └── ...                                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                          LIB / UTILS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  lib/                                                            │
│  ├── db/                      # Database                        │
│  │   ├── index.ts             # Drizzle client                  │
│  │   ├── schema.ts            # Schema definitions              │
│  │   └── migrations/          # SQL migrations                  │
│  ├── auth/                    # Authentication                  │
│  │   ├── config.ts            # NextAuth config                 │
│  │   └── utils.ts                                               │
│  ├── email/                   # Email service                   │
│  │   ├── client.ts            # Resend client                   │
│  │   └── templates/           # Email templates                 │
│  ├── prediction/              # Risk prediction                 │
│  │   ├── algorithm.ts                                           │
│  │   └── factors.ts                                             │
│  ├── validations/             # Zod schemas                     │
│  │   ├── client.ts                                              │
│  │   ├── invoice.ts                                             │
│  │   └── ...                                                    │
│  └── utils/                   # Utility functions               │
│      ├── date.ts                                                │
│      ├── format.ts                                              │
│      └── ...                                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Entity Relationship Diagram

```
                              ┌─────────────────────┐
                              │       users         │
                              ├─────────────────────┤
                              │ id              PK  │
                              │ email               │
                              │ password_hash       │
                              │ name                │
                              │ google_id           │
                              │ plan                │
                              │ stripe_customer_id  │
                              │ created_at          │
                              │ updated_at          │
                              └─────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
          ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
          │    clients      │ │  user_settings  │ │   audit_logs    │
          ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
          │ id          PK  │ │ id          PK  │ │ id          PK  │
          │ user_id     FK  │ │ user_id     FK  │ │ user_id     FK  │
          │ company_name    │ │ email_enabled   │ │ action          │
          │ contact_name    │ │ weekly_digest   │ │ entity_type     │
          │ contact_email   │ │ templates       │ │ entity_id       │
          │ industry        │ │ timezone        │ │ changes         │
          │ risk_score      │ │ created_at      │ │ created_at      │
          │ created_at      │ └─────────────────┘ └─────────────────┘
          │ updated_at      │
          └─────────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │    invoices     │
          ├─────────────────┤
          │ id          PK  │
          │ user_id     FK  │
          │ client_id   FK  │
          │ invoice_number  │
          │ amount          │
          │ currency        │
          │ due_date        │
          │ paid_date       │
          │ status          │
          │ description     │
          │ created_at      │
          │ updated_at      │
          └─────────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │   follow_ups    │
          ├─────────────────┤
          │ id          PK  │
          │ invoice_id  FK  │
          │ recipient_email │
          │ subject         │
          │ body            │
          │ scheduled_at    │
          │ sent_at         │
          │ status          │
          │ template_type   │
          │ created_at      │
          └─────────────────┘
```

### Drizzle Schema

```typescript
// lib/db/schema.ts

import { pgTable, uuid, text, timestamp, integer, 
         decimal, varchar, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const planEnum = pgEnum('plan', ['free', 'pro', 'business']);
export const industryEnum = pgEnum('industry', [
  'technology', 'marketing', 'finance', 'healthcare', 'education',
  'retail', 'manufacturing', 'media', 'legal', 'consulting',
  'nonprofit', 'government', 'hospitality', 'construction', 
  'realestate', 'other'
]);
export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft', 'pending', 'overdue', 'paid'
]);
export const followUpStatusEnum = pgEnum('follow_up_status', [
  'scheduled', 'sent', 'failed', 'cancelled'
]);
export const templateTypeEnum = pgEnum('template_type', [
  'reminder_before', 'reminder_due', 'reminder_after_1',
  'reminder_after_2', 'final_notice'
]);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  name: varchar('name', { length: 255 }).notNull(),
  profilePicture: text('profile_picture'),
  
  // OAuth
  googleId: varchar('google_id', { length: 255 }).unique(),
  
  // Subscription
  plan: planEnum('plan').notNull().default('free'),
  planExpiresAt: timestamp('plan_expires_at'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
  emailVerifiedAt: timestamp('email_verified_at'),
  deletedAt: timestamp('deleted_at'),
});

// Clients Table
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  
  // Basic Info
  companyName: varchar('company_name', { length: 200 }).notNull(),
  contactName: varchar('contact_name', { length: 100 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  website: text('website'),
  
  // Classification
  industry: industryEnum('industry').notNull().default('other'),
  
  // Notes
  notes: text('notes'),
  
  // Computed (cached for performance)
  riskScore: integer('risk_score').notNull().default(5),
  totalInvoices: integer('total_invoices').notNull().default(0),
  paidOnTime: integer('paid_on_time').notNull().default(0),
  averageDaysToPayment: integer('avg_days_to_payment'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Invoices Table
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  clientId: uuid('client_id').notNull().references(() => clients.id),
  
  // Invoice Details
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  description: text('description'),
  
  // Dates
  issueDate: timestamp('issue_date').notNull().defaultNow(),
  dueDate: timestamp('due_date').notNull(),
  paidDate: timestamp('paid_date'),
  
  // Status
  status: invoiceStatusEnum('status').notNull().default('pending'),
  
  // Computed
  daysLate: integer('days_late'),
  
  // Follow-up Control
  followUpsEnabled: boolean('follow_ups_enabled').notNull().default(true),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Follow-ups Table
export const followUps = pgTable('follow_ups', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id),
  
  // Email Details
  recipientEmail: varchar('recipient_email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  body: text('body').notNull(),
  
  // Scheduling
  scheduledAt: timestamp('scheduled_at').notNull(),
  sentAt: timestamp('sent_at'),
  
  // Status
  status: followUpStatusEnum('status').notNull().default('scheduled'),
  errorMessage: text('error_message'),
  
  // Template Reference
  templateType: templateTypeEnum('template_type').notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// User Settings Table
export const userSettings = pgTable('user_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id).unique(),
  
  // Notifications
  emailNotifications: boolean('email_notifications').notNull().default(true),
  weeklyDigest: boolean('weekly_digest').notNull().default(true),
  paymentReceivedNotify: boolean('payment_received_notify').notNull().default(true),
  invoiceOverdueNotify: boolean('invoice_overdue_notify').notNull().default(true),
  
  // Follow-up Defaults
  followUpsEnabled: boolean('follow_ups_enabled').notNull().default(true),
  followUpSchedule: jsonb('follow_up_schedule').notNull().default('[-3, 0, 3, 7, 14]'),
  
  // Templates (JSON)
  emailTemplates: jsonb('email_templates'),
  
  // Preferences
  timezone: varchar('timezone', { length: 50 }).notNull().default('America/New_York'),
  dateFormat: varchar('date_format', { length: 20 }).notNull().default('MM/dd/yyyy'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Industry Risk Table (reference data)
export const industryRisks = pgTable('industry_risks', {
  id: uuid('id').primaryKey().defaultRandom(),
  industry: industryEnum('industry').notNull().unique(),
  
  averageRiskScore: integer('average_risk_score').notNull(),
  averageDaysToPayment: integer('average_days_to_payment').notNull(),
  latePaymentRate: decimal('late_payment_rate', { precision: 4, scale: 3 }).notNull(),
  sampleSize: integer('sample_size').notNull(),
  
  lastUpdated: timestamp('last_updated').notNull().defaultNow(),
  source: text('source'),
});

// Audit Log Table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  
  action: varchar('action', { length: 50 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id'),
  
  changes: jsonb('changes'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  clients: many(clients),
  invoices: many(invoices),
  settings: one(userSettings),
  auditLogs: many(auditLogs),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  user: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  followUps: many(followUps),
}));

export const followUpsRelations = relations(followUps, ({ one }) => ({
  invoice: one(invoices, {
    fields: [followUps.invoiceId],
    references: [invoices.id],
  }),
}));
```

### Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_clients_user_id ON clients(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_clients_risk_score ON clients(user_id, risk_score);

CREATE INDEX idx_invoices_user_id ON invoices(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(user_id, status);
CREATE INDEX idx_invoices_due_date ON invoices(user_id, due_date);

CREATE INDEX idx_follow_ups_invoice_id ON follow_ups(invoice_id);
CREATE INDEX idx_follow_ups_scheduled ON follow_ups(scheduled_at, status) 
  WHERE status = 'scheduled';

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

---

## API Design

### RESTful Conventions

| Method | Path | Action |
|--------|------|--------|
| GET | /api/clients | List clients |
| POST | /api/clients | Create client |
| GET | /api/clients/:id | Get client |
| PATCH | /api/clients/:id | Update client |
| DELETE | /api/clients/:id | Delete client |

### Response Format

**Success Response:**
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

**Error Response:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid input data |
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | Not authorized |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict (e.g., duplicate) |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

### Rate Limiting

| Tier | Limit | Window |
|------|-------|--------|
| Free | 60 requests | 1 minute |
| Pro | 120 requests | 1 minute |
| Business | 300 requests | 1 minute |

Headers returned:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1707220800
```

---

## File Structure

```
payment-predictor/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # CI pipeline
│       └── deploy.yml              # Deployment
│
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/                # Protected routes
│   │   ├── page.tsx                # Dashboard
│   │   ├── invoices/
│   │   │   ├── page.tsx            # List
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx        # Detail
│   │   │   └── new/
│   │   │       └── page.tsx        # Create
│   │   ├── clients/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   ├── notifications/
│   │   │   ├── templates/
│   │   │   └── billing/
│   │   └── layout.tsx              # Dashboard layout
│   │
│   ├── api/                        # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── clients/
│   │   │   ├── route.ts            # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts        # GET, PATCH, DELETE
│   │   ├── invoices/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── mark-paid/
│   │   │           └── route.ts    # POST
│   │   ├── follow-ups/
│   │   │   └── [id]/
│   │   │       └── send/
│   │   │           └── route.ts    # POST
│   │   ├── dashboard/
│   │   │   └── route.ts            # GET
│   │   └── webhooks/
│   │       ├── stripe/
│   │       │   └── route.ts
│   │       └── resend/
│   │           └── route.ts
│   │
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── forms/                      # Form components
│   │   ├── client-form.tsx
│   │   ├── invoice-form.tsx
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   │
│   ├── data-display/               # Data components
│   │   ├── client-card.tsx
│   │   ├── invoice-card.tsx
│   │   ├── invoice-table.tsx
│   │   ├── client-table.tsx
│   │   ├── risk-badge.tsx
│   │   ├── status-badge.tsx
│   │   ├── metric-card.tsx
│   │   └── activity-feed.tsx
│   │
│   ├── charts/                     # Chart components
│   │   ├── payment-chart.tsx
│   │   └── risk-distribution.tsx
│   │
│   ├── layout/                     # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   └── page-header.tsx
│   │
│   └── providers/                  # Context providers
│       ├── query-provider.tsx
│       ├── theme-provider.tsx
│       └── toast-provider.tsx
│
├── lib/
│   ├── db/
│   │   ├── index.ts                # Drizzle client
│   │   ├── schema.ts               # Schema definitions
│   │   └── migrations/             # SQL migrations
│   │
│   ├── auth/
│   │   ├── config.ts               # NextAuth config
│   │   └── utils.ts                # Auth utilities
│   │
│   ├── email/
│   │   ├── client.ts               # Resend client
│   │   └── templates/
│   │       ├── reminder-before.tsx
│   │       ├── reminder-due.tsx
│   │       └── ...
│   │
│   ├── prediction/
│   │   ├── algorithm.ts            # Risk calculation
│   │   ├── factors.ts              # Factor definitions
│   │   └── industry-data.ts        # Industry defaults
│   │
│   ├── validations/                # Zod schemas
│   │   ├── client.ts
│   │   ├── invoice.ts
│   │   ├── auth.ts
│   │   └── settings.ts
│   │
│   ├── actions/                    # Server Actions
│   │   ├── clients.ts
│   │   ├── invoices.ts
│   │   └── settings.ts
│   │
│   ├── queries/                    # Data fetching
│   │   ├── clients.ts
│   │   ├── invoices.ts
│   │   └── dashboard.ts
│   │
│   └── utils/
│       ├── date.ts
│       ├── format.ts
│       ├── cn.ts                   # Class name utility
│       └── error.ts
│
├── hooks/                          # Custom React hooks
│   ├── use-clients.ts
│   ├── use-invoices.ts
│   ├── use-dashboard.ts
│   └── use-debounce.ts
│
├── types/
│   ├── index.ts                    # Type exports
│   ├── api.ts                      # API types
│   └── database.ts                 # DB types (from Drizzle)
│
├── config/
│   ├── site.ts                     # Site config
│   ├── navigation.ts               # Nav config
│   └── constants.ts                # App constants
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .env.local                      # Local env (gitignored)
├── .eslintrc.json
├── .prettierrc
├── drizzle.config.ts
├── middleware.ts                   # Next.js middleware
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Authentication & Security

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Email/Password:                                                 │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐          │
│  │ Login  │───▶│Validate│───▶│Compare │───▶│Create  │          │
│  │ Form   │    │ Input  │    │ Hash   │    │Session │          │
│  └────────┘    └────────┘    └────────┘    └────────┘          │
│                                                                  │
│  Google OAuth:                                                   │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐          │
│  │ Click  │───▶│ Google │───▶│Callback│───▶│ Create │          │
│  │ Button │    │ Consent│    │ Handle │    │ Session│          │
│  └────────┘    └────────┘    └────────┘    └────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Session Management

```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // ... credentials config
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.plan = token.plan;
      return session;
    },
  },
});
```

### Middleware Protection

```typescript
// middleware.ts
import { auth } from '@/lib/auth/config';

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/(auth)');
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  const isPublicApi = req.nextUrl.pathname.startsWith('/api/auth');
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }
  
  // Protect dashboard routes
  if (!isAuthenticated && !isAuthPage && !isPublicApi) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Background Jobs

### Job Architecture

Using Inngest for background job processing:

```typescript
// lib/jobs/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({ id: 'payment-predictor' });
```

```typescript
// lib/jobs/functions/send-follow-ups.ts
import { inngest } from '../client';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export const sendScheduledFollowUps = inngest.createFunction(
  { id: 'send-scheduled-follow-ups' },
  { cron: '*/15 * * * *' }, // Every 15 minutes
  async ({ step }) => {
    // Get pending follow-ups
    const followUps = await step.run('fetch-pending', async () => {
      return db.query.followUps.findMany({
        where: and(
          eq(followUps.status, 'scheduled'),
          lte(followUps.scheduledAt, new Date())
        ),
        limit: 50,
      });
    });
    
    // Send each follow-up
    for (const followUp of followUps) {
      await step.run(`send-${followUp.id}`, async () => {
        try {
          await sendEmail({
            to: followUp.recipientEmail,
            subject: followUp.subject,
            html: followUp.body,
          });
          
          await db.update(followUps)
            .set({ status: 'sent', sentAt: new Date() })
            .where(eq(followUps.id, followUp.id));
        } catch (error) {
          await db.update(followUps)
            .set({ status: 'failed', errorMessage: error.message })
            .where(eq(followUps.id, followUp.id));
        }
      });
    }
    
    return { processed: followUps.length };
  }
);
```

### Scheduled Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| send-follow-ups | Every 15 min | Send scheduled follow-up emails |
| update-overdue | Daily 00:00 | Update invoice statuses to overdue |
| weekly-digest | Monday 09:00 | Send weekly digest emails |
| recalculate-risk | Daily 02:00 | Recalculate client risk scores |
| cleanup-old-logs | Weekly | Clean up old audit logs |

---

## Deployment & Infrastructure

### Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐          │
│  │  Push  │───▶│  CI    │───▶│ Preview│───▶│ Prod   │          │
│  │  Code  │    │ Tests  │    │ Deploy │    │ Deploy │          │
│  └────────┘    └────────┘    └────────┘    └────────┘          │
│                     │                           │               │
│                     ▼                           ▼               │
│              ┌────────────┐             ┌────────────┐          │
│              │ Lint       │             │ Migrate DB │          │
│              │ Type Check │             │ Clear Cache│          │
│              │ Unit Tests │             │ Notify     │          │
│              │ E2E Tests  │             └────────────┘          │
│              └────────────┘                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://paymentpredictor.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email
RESEND_API_KEY="..."

# Payments
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."

# Redis
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."

# Background Jobs
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# Monitoring
SENTRY_DSN="..."
```

### Infrastructure Costs (Estimated)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Pro | $20 |
| Neon | Launch | $19 |
| Upstash Redis | Free | $0 |
| Resend | Pro | $20 |
| Inngest | Free | $0 |
| Sentry | Team | $0 (free tier) |
| Domain | - | $1.50 |
| **Total** | | **~$60** |

---

## Monitoring & Observability

### Logging Strategy

```typescript
// lib/utils/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

// Usage
logger.info({ userId, invoiceId }, 'Invoice created');
logger.error({ error, context }, 'Failed to send email');
```

### Error Tracking (Sentry)

```typescript
// lib/utils/error.ts
import * as Sentry from '@sentry/nextjs';

export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}
```

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    email: await checkEmail(),
  };
  
  const healthy = Object.values(checks).every(Boolean);
  
  return Response.json(
    { status: healthy ? 'healthy' : 'unhealthy', checks },
    { status: healthy ? 200 : 503 }
  );
}
```

---

## Performance Considerations

### Caching Strategy

| Data | Cache Location | TTL | Invalidation |
|------|----------------|-----|--------------|
| User session | Redis | 30 days | On logout |
| Dashboard stats | Redis | 5 min | On invoice change |
| Client list | RSC cache | 60 sec | Revalidate on-demand |
| Industry data | Static | Build time | On deploy |

### Database Optimization

1. **Connection Pooling:** Use Neon's serverless driver with connection pooling
2. **Query Optimization:** Use Drizzle's query builder for type-safe, optimized queries
3. **Indexes:** Created on frequently queried columns
4. **Soft Deletes:** Use `deleted_at` for data recovery

### Frontend Optimization

1. **React Server Components:** Default to RSC, use client only when needed
2. **Code Splitting:** Automatic with App Router
3. **Image Optimization:** Use Next.js Image component
4. **Font Optimization:** Use next/font for Google Fonts

---

*End of Architecture Document*

