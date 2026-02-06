import { z } from "zod";

/**
 * Valid industries
 */
export const industries = [
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
] as const;

export type Industry = (typeof industries)[number];

/**
 * Industry labels for display
 */
export const industryLabels: Record<Industry, string> = {
  technology: "Technology",
  marketing: "Marketing & Advertising",
  finance: "Finance & Banking",
  healthcare: "Healthcare",
  education: "Education",
  retail: "Retail & E-commerce",
  manufacturing: "Manufacturing",
  media: "Media & Entertainment",
  legal: "Legal Services",
  consulting: "Consulting",
  nonprofit: "Nonprofit",
  government: "Government",
  hospitality: "Hospitality & Tourism",
  construction: "Construction",
  realestate: "Real Estate",
  other: "Other",
};

/**
 * Create client schema
 */
export const createClientSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),
  contactName: z
    .string()
    .max(100, "Contact name must be less than 100 characters")
    .optional()
    .nullable(),
  contactEmail: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .nullable()
    .or(z.literal("")),
  phone: z
    .string()
    .max(50, "Phone number must be less than 50 characters")
    .optional()
    .nullable(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  industry: z.enum(industries).default("other"),
  notes: z
    .string()
    .max(5000, "Notes must be less than 5000 characters")
    .optional()
    .nullable(),
});

export type CreateClientFormData = z.infer<typeof createClientSchema>;

/**
 * Update client schema (all fields optional)
 */
export const updateClientSchema = createClientSchema.partial();

export type UpdateClientFormData = z.infer<typeof updateClientSchema>;

/**
 * Client search/filter schema
 */
export const clientFilterSchema = z.object({
  search: z.string().optional(),
  industry: z.enum(industries).optional(),
  riskLevel: z.enum(["low", "medium", "high"]).optional(),
  sortBy: z
    .enum(["companyName", "riskScore", "totalInvoices", "createdAt"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
});

export type ClientFilterParams = z.infer<typeof clientFilterSchema>;

/**
 * Client ID param schema
 */
export const clientIdSchema = z.object({
  id: z.string().uuid("Invalid client ID"),
});

export type ClientIdParam = z.infer<typeof clientIdSchema>;
