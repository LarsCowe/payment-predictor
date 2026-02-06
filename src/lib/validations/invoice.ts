import { z } from "zod";

/**
 * Valid invoice statuses
 */
export const invoiceStatuses = [
  "draft",
  "pending",
  "overdue",
  "paid",
] as const;

export type InvoiceStatus = (typeof invoiceStatuses)[number];

/**
 * Invoice status labels for display
 */
export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  overdue: "Overdue",
  paid: "Paid",
};

/**
 * Invoice status colors for UI
 */
export const invoiceStatusColors: Record<InvoiceStatus, string> = {
  draft: "gray",
  pending: "yellow",
  overdue: "red",
  paid: "green",
};

/**
 * Common currencies
 */
export const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"] as const;

export type Currency = (typeof currencies)[number];

/**
 * Create invoice schema
 */
export const createInvoiceSchema = z.object({
  clientId: z.string().uuid("Please select a client"),
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required")
    .max(50, "Invoice number must be less than 50 characters"),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(999999999.99, "Amount is too large"),
  currency: z.enum(currencies).default("USD"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .nullable(),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date({
    required_error: "Due date is required",
  }),
  followUpsEnabled: z.boolean().default(true),
});

export type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;

/**
 * Update invoice schema
 */
export const updateInvoiceSchema = z.object({
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required")
    .max(50, "Invoice number must be less than 50 characters")
    .optional(),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(999999999.99, "Amount is too large")
    .optional(),
  currency: z.enum(currencies).optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .nullable(),
  dueDate: z.coerce.date().optional(),
  followUpsEnabled: z.boolean().optional(),
});

export type UpdateInvoiceFormData = z.infer<typeof updateInvoiceSchema>;

/**
 * Mark invoice as paid schema
 */
export const markPaidSchema = z.object({
  paidDate: z.coerce.date().optional().default(() => new Date()),
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional(),
});

export type MarkPaidFormData = z.infer<typeof markPaidSchema>;

/**
 * Invoice search/filter schema
 */
export const invoiceFilterSchema = z.object({
  search: z.string().optional(),
  clientId: z.string().uuid().optional(),
  status: z.enum(invoiceStatuses).optional(),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
  dueDateFrom: z.coerce.date().optional(),
  dueDateTo: z.coerce.date().optional(),
  sortBy: z
    .enum(["invoiceNumber", "amount", "dueDate", "status", "createdAt"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
});

export type InvoiceFilterParams = z.infer<typeof invoiceFilterSchema>;

/**
 * Invoice ID param schema
 */
export const invoiceIdSchema = z.object({
  id: z.string().uuid("Invalid invoice ID"),
});

export type InvoiceIdParam = z.infer<typeof invoiceIdSchema>;

/**
 * Bulk invoice action schema
 */
export const bulkInvoiceActionSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, "Select at least one invoice"),
  action: z.enum(["delete", "markPaid", "sendReminder"]),
});

export type BulkInvoiceActionData = z.infer<typeof bulkInvoiceActionSchema>;
