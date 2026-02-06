# PaymentPredictor 💰

**Predict Payment Risk. Get Paid On Time.**

A smart payment management tool for freelancers that predicts which clients are likely to pay late, tracks invoices, and automates follow-ups.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Features

### Core Features

- **📊 Risk Assessment** - AI-powered risk scores for each client based on payment history, industry benchmarks, and relationship data
- **📋 Invoice Tracking** - Track all your invoices in one place with status monitoring and due date alerts
- **👥 Client Management** - Manage client information with detailed payment history and risk analysis
- **📈 Dashboard** - At-a-glance overview of outstanding payments, overdue invoices, and at-risk clients
- **🔔 Smart Notifications** - Get notified when invoices become overdue or risk levels change
- **📧 Automated Follow-ups** - Send automated payment reminders at the right time
- **📑 Reports** - Detailed analytics and insights about your payment patterns

### Risk Prediction Algorithm

The risk score (1-10) is calculated based on 5 key factors:

| Factor | Weight | Description |
|--------|--------|-------------|
| Payment History | 35% | Historical on-time payment rate |
| Average Days Late | 25% | How many days payments are typically late |
| Industry Risk | 20% | Industry-specific payment trends |
| Invoice Amount | 10% | Higher amounts may have more risk |
| Relationship Length | 10% | Longer relationships tend to be more reliable |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Full-stack React framework |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **Drizzle ORM** | Type-safe database ORM |
| **Neon Postgres** | Serverless PostgreSQL |
| **NextAuth** | Authentication |
| **Zod** | Schema validation |
| **Vitest** | Unit testing |
| **Resend** | Email delivery |

## 📦 Installation

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 9+
- Neon Postgres account (free tier available)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/payment-predictor.git
cd payment-predictor

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Configure your .env.local file (see Environment Setup below)

# Push database schema
pnpm db:push

# Seed demo data (optional)
pnpm db:seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Environment Setup

Create a `.env.local` file with the following variables:

```bash
# ===================
# DATABASE
# ===================
# Get your connection string from https://neon.tech
DATABASE_URL=postgres://user:password@host/database

# ===================
# AUTH
# ===================
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ===================
# EMAIL (optional)
# ===================
# For automated follow-up emails
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format with Prettier |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm test` | Run unit tests |
| `pnpm db:generate` | Generate database migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:seed` | Seed demo data |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── data-display/      # Cards, badges, tables
│   └── layout/            # Sidebar, header
├── lib/
│   ├── db/                # Database schema and client
│   ├── validations/       # Zod schemas
│   ├── prediction/        # Risk calculation algorithm
│   └── utils/             # Utility functions
├── types/                 # TypeScript types
└── tests/                 # Unit tests
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test --coverage

# Run specific test file
pnpm test utils.test.ts
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components with custom additions:

- **RiskBadge** - Color-coded risk level indicator
- **StatusBadge** - Invoice status indicator
- **MetricCard** - Dashboard stat cards with optional trends
- **ClientCard** - Client summary cards
- **InvoiceCard** - Invoice summary cards

## 📊 Database Schema

The database includes the following main tables:

- `users` - User accounts and subscription info
- `clients` - Client information and risk scores
- `invoices` - Invoice tracking with status
- `follow_ups` - Scheduled and sent reminders
- `user_settings` - User preferences
- `industry_risks` - Reference data for industry benchmarks

## 🔒 Security

- All inputs validated with Zod schemas
- Authentication required for all dashboard routes
- No hardcoded secrets (use environment variables)
- CSRF protection via NextAuth
- Rate limiting on API routes (planned)

## 🗺️ Roadmap

- [ ] Stripe integration for invoice import
- [ ] QuickBooks integration
- [ ] Mobile app (PWA)
- [ ] Team/organization features
- [ ] Advanced ML-based predictions
- [ ] Zapier integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: support@paymentpredictor.com
- 📖 Documentation: [docs.paymentpredictor.com](https://docs.paymentpredictor.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/payment-predictor/issues)

---

Made with ❤️ for freelancers everywhere
