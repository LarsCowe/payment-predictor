/**
 * Database types - inferred from Drizzle schema
 */

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type {
  users,
  clients,
  invoices,
  followUps,
  userSettings,
  industryRisks,
  auditLogs,
} from "@/lib/db/schema";

// User types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Client types
export type Client = InferSelectModel<typeof clients>;
export type NewClient = InferInsertModel<typeof clients>;

// Invoice types
export type Invoice = InferSelectModel<typeof invoices>;
export type NewInvoice = InferInsertModel<typeof invoices>;

// Follow-up types
export type FollowUp = InferSelectModel<typeof followUps>;
export type NewFollowUp = InferInsertModel<typeof followUps>;

// User settings types
export type UserSettings = InferSelectModel<typeof userSettings>;
export type NewUserSettings = InferInsertModel<typeof userSettings>;

// Industry risk types
export type IndustryRisk = InferSelectModel<typeof industryRisks>;
export type NewIndustryRisk = InferInsertModel<typeof industryRisks>;

// Audit log types
export type AuditLog = InferSelectModel<typeof auditLogs>;
export type NewAuditLog = InferInsertModel<typeof auditLogs>;

// Extended types with relations
export interface ClientWithInvoices extends Client {
  invoices: Invoice[];
}

export interface InvoiceWithClient extends Invoice {
  client: Client;
}

export interface InvoiceWithFollowUps extends Invoice {
  followUps: FollowUp[];
}

export interface InvoiceWithDetails extends Invoice {
  client: Client;
  followUps: FollowUp[];
}

export interface UserWithSettings extends User {
  settings: UserSettings | null;
}
