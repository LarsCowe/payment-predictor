# PaymentPredictor

**Predict and prevent late payments for freelancers**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 Problem

85% of freelancers experience late payments. 63% wait more than 30 days past due dates. This creates:
- Cash flow instability
- Time wasted chasing payments
- Stress and anxiety
- Strained client relationships

## 💡 Solution

PaymentPredictor helps freelancers:
1. **Predict** which clients are likely to pay late before accepting work
2. **Automate** professional follow-up sequences
3. **Track** all invoices and payment behavior
4. **Forecast** cash flow based on actual client patterns

## 🚀 Features (MVP)

- **Client Risk Scoring** — Know before you invoice
- **Invoice Tracking** — Monitor all outstanding payments
- **Automated Follow-ups** — Professional reminder sequences
- **Smart Dashboard** — At-a-glance payment status
- **Cash Flow Insights** — Understand your actual income timeline

## 🛠 Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Next.js API Routes, Server Actions
- **Database:** Neon Postgres, Drizzle ORM
- **Auth:** NextAuth.js v5
- **Email:** Resend
- **Hosting:** Vercel

## 📁 Project Structure

```
payment-predictor/
├── docs/                   # Planning documents
│   ├── product-brief.md    # Product vision & strategy
│   ├── prd.md              # Product requirements
│   ├── ux-design.md        # User experience design
│   ├── architecture.md     # Technical architecture
│   └── epics.md            # Development epics & roadmap
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Business logic
└── public/                 # Static assets
```

## 🏃 Getting Started

```bash
# Clone repository
git clone https://github.com/LarsCowe/payment-predictor.git

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

## 📊 Status

**Phase:** Planning Complete ✅

- [x] Market Research
- [x] Product Brief
- [x] PRD
- [x] UX Design
- [x] Architecture
- [x] Epics & Roadmap
- [ ] Development (Coming Soon)

## 📝 License

MIT © 2026 PaymentPredictor

---

Built with ❤️ for freelancers everywhere.
