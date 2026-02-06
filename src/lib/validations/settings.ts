import { z } from "zod";

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  profilePicture: z.string().url().optional().nullable(),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Email change schema
 */
export const emailChangeSchema = z.object({
  newEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required to change email"),
});

export type EmailChangeFormData = z.infer<typeof emailChangeSchema>;

/**
 * Notification settings schema
 */
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  paymentReceivedNotify: z.boolean(),
  invoiceOverdueNotify: z.boolean(),
});

export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;

/**
 * Follow-up settings schema
 */
export const followUpSettingsSchema = z.object({
  followUpsEnabled: z.boolean(),
  followUpSchedule: z
    .array(z.number().int().min(-30).max(60))
    .min(1, "At least one follow-up day is required")
    .max(10, "Maximum 10 follow-up days"),
});

export type FollowUpSettingsFormData = z.infer<typeof followUpSettingsSchema>;

/**
 * Timezone options (common)
 */
export const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Amsterdam",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

export type Timezone = (typeof timezones)[number];

/**
 * Date format options
 */
export const dateFormats = [
  "MM/dd/yyyy",
  "dd/MM/yyyy",
  "yyyy-MM-dd",
  "MMMM d, yyyy",
] as const;

export type DateFormat = (typeof dateFormats)[number];

/**
 * Preferences schema
 */
export const preferencesSchema = z.object({
  timezone: z.enum(timezones),
  dateFormat: z.enum(dateFormats),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>;

/**
 * Account deletion schema
 */
export const deleteAccountSchema = z.object({
  confirmation: z
    .string()
    .refine((val) => val === "DELETE", 'Please type "DELETE" to confirm'),
  password: z.string().min(1, "Password is required"),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

/**
 * Email template schema
 */
export const emailTemplateSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(255, "Subject must be less than 255 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(10000, "Body must be less than 10000 characters"),
});

export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;

/**
 * All email templates schema
 */
export const emailTemplatesSchema = z.object({
  reminder_before: emailTemplateSchema.optional(),
  reminder_due: emailTemplateSchema.optional(),
  reminder_after_1: emailTemplateSchema.optional(),
  reminder_after_2: emailTemplateSchema.optional(),
  final_notice: emailTemplateSchema.optional(),
});

export type EmailTemplatesFormData = z.infer<typeof emailTemplatesSchema>;
