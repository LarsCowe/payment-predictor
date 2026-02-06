/**
 * Application types
 */

// Plan types
export type Plan = "free" | "pro" | "business";

// Industry types
export type Industry =
  | "technology"
  | "marketing"
  | "finance"
  | "healthcare"
  | "education"
  | "retail"
  | "manufacturing"
  | "media"
  | "legal"
  | "consulting"
  | "nonprofit"
  | "government"
  | "hospitality"
  | "construction"
  | "realestate"
  | "other";

// Invoice status types
export type InvoiceStatus = "draft" | "pending" | "overdue" | "paid";

// Follow-up status types
export type FollowUpStatus = "scheduled" | "sent" | "failed" | "cancelled";

// Template types
export type TemplateType =
  | "reminder_before"
  | "reminder_due"
  | "reminder_after_1"
  | "reminder_after_2"
  | "final_notice";

// Risk level types
export type RiskLevel = "low" | "medium" | "high";

/**
 * Get risk level from score
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score <= 3) return "low";
  if (score <= 6) return "medium";
  return "high";
}

/**
 * Get risk label from score
 */
export function getRiskLabel(score: number): string {
  const level = getRiskLevel(score);
  switch (level) {
    case "low":
      return "Low Risk";
    case "medium":
      return "Medium Risk";
    case "high":
      return "High Risk";
  }
}

/**
 * Get status label
 */
export function getStatusLabel(status: InvoiceStatus): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "pending":
      return "Pending";
    case "overdue":
      return "Overdue";
    case "paid":
      return "Paid";
  }
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Dashboard stats
export interface DashboardStats {
  totalOutstanding: number;
  totalOverdue: number;
  atRiskCount: number;
  paidThisMonth: number;
  clientCount: number;
  invoiceCount: number;
}

// Client summary
export interface ClientSummary {
  id: string;
  companyName: string;
  contactName: string | null;
  riskScore: number;
  totalInvoices: number;
  totalOutstanding: number;
}

// Invoice summary
export interface InvoiceSummary {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  currency: string;
  dueDate: Date;
  status: InvoiceStatus;
  riskScore: number;
}

// Recent payment
export interface RecentPayment {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  currency: string;
  paidDate: Date;
  daysLate: number | null;
}

// Activity item
export interface ActivityItem {
  id: string;
  type: "invoice_created" | "payment_received" | "reminder_sent" | "client_added";
  description: string;
  timestamp: Date;
  entityId?: string;
}
