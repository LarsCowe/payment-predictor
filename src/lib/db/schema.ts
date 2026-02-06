import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  decimal,
  varchar,
  boolean,
  jsonb,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==========================================
// ENUMS
// ==========================================

export const planEnum = pgEnum("plan", ["free", "pro", "business"]);

export const industryEnum = pgEnum("industry", [
  "technology",
  "marketing",
  "finance",
  "healthcare",
  "education",
  "retail",
  "manufacturing",
  "media",
  "legal",
  "consulting",
  "nonprofit",
  "government",
  "hospitality",
  "construction",
  "realestate",
  "other",
]);

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "pending",
  "overdue",
  "paid",
]);

export const followUpStatusEnum = pgEnum("follow_up_status", [
  "scheduled",
  "sent",
  "failed",
  "cancelled",
]);

export const templateTypeEnum = pgEnum("template_type", [
  "reminder_before",
  "reminder_due",
  "reminder_after_1",
  "reminder_after_2",
  "final_notice",
]);

// ==========================================
// TABLES
// ==========================================

/**
 * Users table - stores user account information
 */
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash"),
    name: varchar("name", { length: 255 }).notNull(),
    profilePicture: text("profile_picture"),

    // OAuth
    googleId: varchar("google_id", { length: 255 }).unique(),

    // Subscription
    plan: planEnum("plan").notNull().default("free"),
    planExpiresAt: timestamp("plan_expires_at"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    lastLoginAt: timestamp("last_login_at"),
    emailVerifiedAt: timestamp("email_verified_at"),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
);

/**
 * Clients table - stores client/customer information
 */
export const clients = pgTable(
  "clients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Basic Info
    companyName: varchar("company_name", { length: 200 }).notNull(),
    contactName: varchar("contact_name", { length: 100 }),
    contactEmail: varchar("contact_email", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    website: text("website"),

    // Classification
    industry: industryEnum("industry").notNull().default("other"),

    // Notes
    notes: text("notes"),

    // Computed (cached for performance)
    riskScore: integer("risk_score").notNull().default(5),
    totalInvoices: integer("total_invoices").notNull().default(0),
    paidOnTime: integer("paid_on_time").notNull().default(0),
    averageDaysToPayment: integer("avg_days_to_payment"),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    userIdIdx: index("clients_user_id_idx").on(table.userId),
    riskScoreIdx: index("clients_risk_score_idx").on(
      table.userId,
      table.riskScore
    ),
  })
);

/**
 * Invoices table - stores invoice information
 */
export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clientId: uuid("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),

    // Invoice Details
    invoiceNumber: varchar("invoice_number", { length: 50 }).notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    description: text("description"),

    // Dates
    issueDate: timestamp("issue_date").notNull().defaultNow(),
    dueDate: timestamp("due_date").notNull(),
    paidDate: timestamp("paid_date"),

    // Status
    status: invoiceStatusEnum("status").notNull().default("pending"),

    // Computed
    daysLate: integer("days_late"),

    // Follow-up Control
    followUpsEnabled: boolean("follow_ups_enabled").notNull().default(true),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    userIdIdx: index("invoices_user_id_idx").on(table.userId),
    clientIdIdx: index("invoices_client_id_idx").on(table.clientId),
    statusIdx: index("invoices_status_idx").on(table.userId, table.status),
    dueDateIdx: index("invoices_due_date_idx").on(table.userId, table.dueDate),
  })
);

/**
 * Follow-ups table - stores scheduled/sent reminder emails
 */
export const followUps = pgTable(
  "follow_ups",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),

    // Email Details
    recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 255 }).notNull(),
    body: text("body").notNull(),

    // Scheduling
    scheduledAt: timestamp("scheduled_at").notNull(),
    sentAt: timestamp("sent_at"),

    // Status
    status: followUpStatusEnum("status").notNull().default("scheduled"),
    errorMessage: text("error_message"),

    // Template Reference
    templateType: templateTypeEnum("template_type").notNull(),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    invoiceIdIdx: index("follow_ups_invoice_id_idx").on(table.invoiceId),
    scheduledIdx: index("follow_ups_scheduled_idx").on(
      table.scheduledAt,
      table.status
    ),
  })
);

/**
 * User settings table - stores user preferences
 */
export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  // Notifications
  emailNotifications: boolean("email_notifications").notNull().default(true),
  weeklyDigest: boolean("weekly_digest").notNull().default(true),
  paymentReceivedNotify: boolean("payment_received_notify")
    .notNull()
    .default(true),
  invoiceOverdueNotify: boolean("invoice_overdue_notify")
    .notNull()
    .default(true),

  // Follow-up Defaults
  followUpsEnabled: boolean("follow_ups_enabled").notNull().default(true),
  followUpSchedule: jsonb("follow_up_schedule")
    .notNull()
    .default("[-3, 0, 3, 7, 14]"),

  // Templates (JSON)
  emailTemplates: jsonb("email_templates"),

  // Preferences
  timezone: varchar("timezone", { length: 50 })
    .notNull()
    .default("America/New_York"),
  dateFormat: varchar("date_format", { length: 20 })
    .notNull()
    .default("MM/dd/yyyy"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Industry risks table - reference data for risk scoring
 */
export const industryRisks = pgTable("industry_risks", {
  id: uuid("id").primaryKey().defaultRandom(),
  industry: industryEnum("industry").notNull().unique(),

  averageRiskScore: integer("average_risk_score").notNull(),
  averageDaysToPayment: integer("average_days_to_payment").notNull(),
  latePaymentRate: decimal("late_payment_rate", {
    precision: 4,
    scale: 3,
  }).notNull(),
  sampleSize: integer("sample_size").notNull(),

  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  source: text("source"),
});

/**
 * Audit logs table - tracks user actions
 */
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    action: varchar("action", { length: 50 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }).notNull(),
    entityId: uuid("entity_id"),

    changes: jsonb("changes"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("audit_logs_user_id_idx").on(table.userId),
    entityIdx: index("audit_logs_entity_idx").on(
      table.entityType,
      table.entityId
    ),
  })
);

// ==========================================
// RELATIONS
// ==========================================

export const usersRelations = relations(users, ({ many, one }) => ({
  clients: many(clients),
  invoices: many(invoices),
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.userId],
  }),
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

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));
