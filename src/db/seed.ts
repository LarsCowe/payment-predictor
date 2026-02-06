/**
 * Database seed script
 *
 * Creates demo users, clients, and payments for testing
 *
 * Run with: pnpm db:seed
 */

import { db } from "@/lib/db";
import {
  users,
  clients,
  invoices,
  followUps,
  userSettings,
  industryRisks,
} from "@/lib/db/schema";
import { addDays, subDays, subMonths } from "date-fns";

// Demo user data
const demoUsers = [
  {
    id: "user-1",
    email: "sarah@example.com",
    name: "Sarah Johnson",
    passwordHash: "$2a$10$...", // Demo hash
    plan: "pro" as const,
  },
  {
    id: "user-2",
    email: "mike@example.com",
    name: "Mike Chen",
    passwordHash: "$2a$10$...",
    plan: "free" as const,
  },
  {
    id: "user-3",
    email: "emma@example.com",
    name: "Emma Williams",
    passwordHash: "$2a$10$...",
    plan: "business" as const,
  },
];

// Demo client data (for user-1)
const demoClients = [
  {
    id: "client-1",
    userId: "user-1",
    companyName: "TechCorp Inc.",
    contactName: "John Smith",
    contactEmail: "john@techcorp.com",
    phone: "+1 555-0123",
    website: "https://techcorp.com",
    industry: "technology" as const,
    riskScore: 3,
    totalInvoices: 15,
    paidOnTime: 14,
    averageDaysToPayment: 2,
    notes: "Great client, always pays on time",
  },
  {
    id: "client-2",
    userId: "user-1",
    companyName: "Media Solutions Ltd",
    contactName: "Jane Doe",
    contactEmail: "jane@mediasolutions.com",
    phone: "+1 555-0124",
    industry: "media" as const,
    riskScore: 7,
    totalInvoices: 8,
    paidOnTime: 4,
    averageDaysToPayment: 12,
    notes: "Often pays late, requires follow-up",
  },
  {
    id: "client-3",
    userId: "user-1",
    companyName: "StartupXYZ",
    contactName: "Alex Rivera",
    contactEmail: "alex@startupxyz.io",
    industry: "technology" as const,
    riskScore: 5,
    totalInvoices: 4,
    paidOnTime: 3,
    averageDaysToPayment: 5,
  },
  {
    id: "client-4",
    userId: "user-1",
    companyName: "Legal Partners LLP",
    contactName: "Sarah Williams",
    contactEmail: "sarah@legalpartners.com",
    phone: "+1 555-0125",
    website: "https://legalpartners.com",
    industry: "legal" as const,
    riskScore: 2,
    totalInvoices: 22,
    paidOnTime: 22,
    averageDaysToPayment: -3,
    notes: "Excellent payer, often pays early",
  },
  {
    id: "client-5",
    userId: "user-1",
    companyName: "BuildIt Construction",
    contactName: "Tom Brown",
    contactEmail: "tom@buildit.co",
    industry: "construction" as const,
    riskScore: 8,
    totalInvoices: 6,
    paidOnTime: 2,
    averageDaysToPayment: 25,
    notes: "High risk - requires upfront payment",
  },
  {
    id: "client-6",
    userId: "user-1",
    companyName: "Healthcare Plus",
    contactName: "Dr. Emily Chen",
    contactEmail: "emily@healthcareplus.med",
    industry: "healthcare" as const,
    riskScore: 4,
    totalInvoices: 12,
    paidOnTime: 10,
    averageDaysToPayment: 3,
  },
  {
    id: "client-7",
    userId: "user-1",
    companyName: "Design Studio Pro",
    contactName: "Chris Taylor",
    contactEmail: "chris@designstudiopro.com",
    website: "https://designstudiopro.com",
    industry: "marketing" as const,
    riskScore: 6,
    totalInvoices: 9,
    paidOnTime: 5,
    averageDaysToPayment: 8,
  },
  {
    id: "client-8",
    userId: "user-1",
    companyName: "Finance First Bank",
    contactName: "Robert Miller",
    contactEmail: "robert@financefirst.bank",
    industry: "finance" as const,
    riskScore: 1,
    totalInvoices: 18,
    paidOnTime: 18,
    averageDaysToPayment: -5,
    notes: "Always pays early",
  },
  {
    id: "client-9",
    userId: "user-1",
    companyName: "EduTech Academy",
    contactName: "Lisa Anderson",
    contactEmail: "lisa@edutech.edu",
    industry: "education" as const,
    riskScore: 5,
    totalInvoices: 7,
    paidOnTime: 5,
    averageDaysToPayment: 4,
  },
  {
    id: "client-10",
    userId: "user-1",
    companyName: "Retail Giants Inc",
    contactName: "David Lee",
    contactEmail: "david@retailgiants.com",
    industry: "retail" as const,
    riskScore: 6,
    totalInvoices: 11,
    paidOnTime: 7,
    averageDaysToPayment: 7,
  },
];

// Demo invoices
const now = new Date();
const demoInvoices = [
  // Pending invoices
  {
    id: "inv-1",
    userId: "user-1",
    clientId: "client-1",
    invoiceNumber: "INV-2026-001",
    amount: "5000.00",
    currency: "USD",
    description: "Website development - Phase 2",
    issueDate: subDays(now, 15),
    dueDate: addDays(now, 5),
    status: "pending" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-2",
    userId: "user-1",
    clientId: "client-2",
    invoiceNumber: "INV-2026-002",
    amount: "3500.00",
    currency: "USD",
    description: "Video production services",
    issueDate: subDays(now, 20),
    dueDate: subDays(now, 2),
    status: "overdue" as const,
    daysLate: 2,
    followUpsEnabled: true,
  },
  {
    id: "inv-3",
    userId: "user-1",
    clientId: "client-3",
    invoiceNumber: "INV-2026-003",
    amount: "2250.00",
    currency: "USD",
    description: "Mobile app consultation",
    issueDate: subDays(now, 10),
    dueDate: addDays(now, 10),
    status: "pending" as const,
    followUpsEnabled: true,
  },
  // Paid invoices
  {
    id: "inv-4",
    userId: "user-1",
    clientId: "client-1",
    invoiceNumber: "INV-2025-015",
    amount: "4200.00",
    currency: "USD",
    description: "Website development - Phase 1",
    issueDate: subMonths(now, 2),
    dueDate: subDays(subMonths(now, 2), -30),
    paidDate: subDays(subMonths(now, 2), -29),
    status: "paid" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-5",
    userId: "user-1",
    clientId: "client-4",
    invoiceNumber: "INV-2025-014",
    amount: "8500.00",
    currency: "USD",
    description: "Legal consultation services",
    issueDate: subMonths(now, 3),
    dueDate: subDays(subMonths(now, 3), -30),
    paidDate: subDays(subMonths(now, 3), -25),
    status: "paid" as const,
    daysLate: null,
    followUpsEnabled: false,
  },
  {
    id: "inv-6",
    userId: "user-1",
    clientId: "client-5",
    invoiceNumber: "INV-2025-013",
    amount: "12000.00",
    currency: "USD",
    description: "Construction project management",
    issueDate: subMonths(now, 4),
    dueDate: subDays(subMonths(now, 4), -45),
    status: "overdue" as const,
    daysLate: 82,
    followUpsEnabled: true,
  },
  {
    id: "inv-7",
    userId: "user-1",
    clientId: "client-6",
    invoiceNumber: "INV-2025-012",
    amount: "3800.00",
    currency: "USD",
    description: "Healthcare system integration",
    issueDate: subMonths(now, 1),
    dueDate: subDays(now, 5),
    paidDate: subDays(now, 6),
    status: "paid" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-8",
    userId: "user-1",
    clientId: "client-7",
    invoiceNumber: "INV-2025-011",
    amount: "2500.00",
    currency: "USD",
    description: "Brand identity design",
    issueDate: subMonths(now, 2),
    dueDate: subDays(subMonths(now, 2), -30),
    paidDate: subDays(subMonths(now, 2), -22),
    status: "paid" as const,
    daysLate: 8,
    followUpsEnabled: true,
  },
  {
    id: "inv-9",
    userId: "user-1",
    clientId: "client-8",
    invoiceNumber: "INV-2025-010",
    amount: "15000.00",
    currency: "USD",
    description: "Financial software development",
    issueDate: subMonths(now, 3),
    dueDate: subDays(subMonths(now, 3), -60),
    paidDate: subDays(subMonths(now, 3), -55),
    status: "paid" as const,
    followUpsEnabled: false,
  },
  {
    id: "inv-10",
    userId: "user-1",
    clientId: "client-9",
    invoiceNumber: "INV-2026-004",
    amount: "1800.00",
    currency: "USD",
    description: "E-learning platform setup",
    issueDate: subDays(now, 5),
    dueDate: addDays(now, 25),
    status: "pending" as const,
    followUpsEnabled: true,
  },
  // More paid invoices for history
  {
    id: "inv-11",
    userId: "user-1",
    clientId: "client-1",
    invoiceNumber: "INV-2025-009",
    amount: "3200.00",
    currency: "USD",
    description: "API development",
    issueDate: subMonths(now, 4),
    dueDate: subDays(subMonths(now, 4), -30),
    paidDate: subDays(subMonths(now, 4), -28),
    status: "paid" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-12",
    userId: "user-1",
    clientId: "client-2",
    invoiceNumber: "INV-2025-008",
    amount: "4500.00",
    currency: "USD",
    description: "Marketing video production",
    issueDate: subMonths(now, 5),
    dueDate: subDays(subMonths(now, 5), -30),
    paidDate: subDays(subMonths(now, 5), -15),
    status: "paid" as const,
    daysLate: 15,
    followUpsEnabled: true,
  },
  {
    id: "inv-13",
    userId: "user-1",
    clientId: "client-4",
    invoiceNumber: "INV-2025-007",
    amount: "6000.00",
    currency: "USD",
    description: "Contract review services",
    issueDate: subMonths(now, 6),
    dueDate: subDays(subMonths(now, 6), -30),
    paidDate: subDays(subMonths(now, 6), -33),
    status: "paid" as const,
    followUpsEnabled: false,
  },
  {
    id: "inv-14",
    userId: "user-1",
    clientId: "client-10",
    invoiceNumber: "INV-2026-005",
    amount: "7500.00",
    currency: "USD",
    description: "POS system implementation",
    issueDate: subDays(now, 8),
    dueDate: addDays(now, 22),
    status: "pending" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-15",
    userId: "user-1",
    clientId: "client-3",
    invoiceNumber: "INV-2025-006",
    amount: "1500.00",
    currency: "USD",
    description: "Technical consultation",
    issueDate: subMonths(now, 2),
    dueDate: subDays(subMonths(now, 2), -15),
    paidDate: subDays(subMonths(now, 2), -12),
    status: "paid" as const,
    daysLate: 3,
    followUpsEnabled: true,
  },
  {
    id: "inv-16",
    userId: "user-1",
    clientId: "client-6",
    invoiceNumber: "INV-2025-005",
    amount: "4000.00",
    currency: "USD",
    description: "Patient portal development",
    issueDate: subMonths(now, 4),
    dueDate: subDays(subMonths(now, 4), -30),
    paidDate: subDays(subMonths(now, 4), -28),
    status: "paid" as const,
    followUpsEnabled: true,
  },
  {
    id: "inv-17",
    userId: "user-1",
    clientId: "client-8",
    invoiceNumber: "INV-2025-004",
    amount: "9000.00",
    currency: "USD",
    description: "Security audit",
    issueDate: subMonths(now, 5),
    dueDate: subDays(subMonths(now, 5), -45),
    paidDate: subDays(subMonths(now, 5), -50),
    status: "paid" as const,
    followUpsEnabled: false,
  },
  {
    id: "inv-18",
    userId: "user-1",
    clientId: "client-7",
    invoiceNumber: "INV-2025-003",
    amount: "3000.00",
    currency: "USD",
    description: "Social media assets",
    issueDate: subMonths(now, 3),
    dueDate: subDays(subMonths(now, 3), -30),
    paidDate: subDays(subMonths(now, 3), -18),
    status: "paid" as const,
    daysLate: 12,
    followUpsEnabled: true,
  },
  {
    id: "inv-19",
    userId: "user-1",
    clientId: "client-5",
    invoiceNumber: "INV-2025-002",
    amount: "8000.00",
    currency: "USD",
    description: "Blueprint digitization",
    issueDate: subMonths(now, 6),
    dueDate: subDays(subMonths(now, 6), -30),
    paidDate: subDays(subMonths(now, 6), -5),
    status: "paid" as const,
    daysLate: 25,
    followUpsEnabled: true,
  },
  {
    id: "inv-20",
    userId: "user-1",
    clientId: "client-9",
    invoiceNumber: "INV-2025-001",
    amount: "2200.00",
    currency: "USD",
    description: "Course content creation",
    issueDate: subMonths(now, 4),
    dueDate: subDays(subMonths(now, 4), -30),
    paidDate: subDays(subMonths(now, 4), -27),
    status: "paid" as const,
    daysLate: 3,
    followUpsEnabled: true,
  },
];

// Industry risk reference data
const industryRiskData = [
  { industry: "technology" as const, averageRiskScore: 4, averageDaysToPayment: 28, latePaymentRate: "0.150", sampleSize: 1500 },
  { industry: "marketing" as const, averageRiskScore: 6, averageDaysToPayment: 35, latePaymentRate: "0.250", sampleSize: 800 },
  { industry: "finance" as const, averageRiskScore: 3, averageDaysToPayment: 22, latePaymentRate: "0.100", sampleSize: 1200 },
  { industry: "healthcare" as const, averageRiskScore: 4, averageDaysToPayment: 30, latePaymentRate: "0.180", sampleSize: 950 },
  { industry: "education" as const, averageRiskScore: 5, averageDaysToPayment: 32, latePaymentRate: "0.200", sampleSize: 600 },
  { industry: "retail" as const, averageRiskScore: 6, averageDaysToPayment: 38, latePaymentRate: "0.280", sampleSize: 1100 },
  { industry: "manufacturing" as const, averageRiskScore: 5, averageDaysToPayment: 35, latePaymentRate: "0.220", sampleSize: 750 },
  { industry: "media" as const, averageRiskScore: 7, averageDaysToPayment: 42, latePaymentRate: "0.320", sampleSize: 450 },
  { industry: "legal" as const, averageRiskScore: 3, averageDaysToPayment: 25, latePaymentRate: "0.120", sampleSize: 900 },
  { industry: "consulting" as const, averageRiskScore: 5, averageDaysToPayment: 32, latePaymentRate: "0.200", sampleSize: 700 },
  { industry: "nonprofit" as const, averageRiskScore: 7, averageDaysToPayment: 45, latePaymentRate: "0.350", sampleSize: 300 },
  { industry: "government" as const, averageRiskScore: 2, averageDaysToPayment: 18, latePaymentRate: "0.050", sampleSize: 400 },
  { industry: "hospitality" as const, averageRiskScore: 7, averageDaysToPayment: 40, latePaymentRate: "0.300", sampleSize: 550 },
  { industry: "construction" as const, averageRiskScore: 8, averageDaysToPayment: 48, latePaymentRate: "0.400", sampleSize: 650 },
  { industry: "realestate" as const, averageRiskScore: 6, averageDaysToPayment: 38, latePaymentRate: "0.250", sampleSize: 500 },
  { industry: "other" as const, averageRiskScore: 5, averageDaysToPayment: 32, latePaymentRate: "0.220", sampleSize: 2000 },
];

/**
 * Main seed function
 */
async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(followUps);
    await db.delete(invoices);
    await db.delete(clients);
    await db.delete(userSettings);
    await db.delete(users);
    await db.delete(industryRisks);

    // Seed industry risks
    console.log("Seeding industry risk data...");
    await db.insert(industryRisks).values(industryRiskData);
    console.log(`  ✓ Created ${industryRiskData.length} industry risk records`);

    // Seed users
    console.log("Seeding users...");
    await db.insert(users).values(demoUsers);
    console.log(`  ✓ Created ${demoUsers.length} demo users`);

    // Seed user settings
    console.log("Seeding user settings...");
    await db.insert(userSettings).values(
      demoUsers.map((user) => ({
        userId: user.id,
        emailNotifications: true,
        weeklyDigest: true,
        paymentReceivedNotify: true,
        invoiceOverdueNotify: true,
        followUpsEnabled: true,
      }))
    );
    console.log(`  ✓ Created ${demoUsers.length} user settings`);

    // Seed clients
    console.log("Seeding clients...");
    await db.insert(clients).values(demoClients);
    console.log(`  ✓ Created ${demoClients.length} demo clients`);

    // Seed invoices
    console.log("Seeding invoices...");
    await db.insert(invoices).values(demoInvoices);
    console.log(`  ✓ Created ${demoInvoices.length} demo invoices`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nDemo accounts:");
    demoUsers.forEach((user) => {
      console.log(`  - ${user.email} (${user.plan} plan)`);
    });
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

// Run seed
seed();
