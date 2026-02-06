import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  magicLinkSchema,
  changePasswordSchema,
} from "@/lib/validations/auth";
import {
  createClientSchema,
  updateClientSchema,
  clientFilterSchema,
} from "@/lib/validations/client";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  markPaidSchema,
} from "@/lib/validations/invoice";
import { addDays } from "date-fns";

describe("Auth Validations", () => {
  describe("loginSchema", () => {
    it("should accept valid login data", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = loginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty email", () => {
      const result = loginSchema.safeParse({
        email: "",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    it("should accept valid registration data", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        confirmPassword: "Different123",
      });
      expect(result.success).toBe(false);
    });

    it("should reject weak password", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "weak",
        confirmPassword: "weak",
      });
      expect(result.success).toBe(false);
    });

    it("should reject short name", () => {
      const result = registerSchema.safeParse({
        name: "J",
        email: "john@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("magicLinkSchema", () => {
    it("should accept valid email", () => {
      const result = magicLinkSchema.safeParse({
        email: "test@example.com",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = magicLinkSchema.safeParse({
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("Client Validations", () => {
  describe("createClientSchema", () => {
    it("should accept valid client data", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        industry: "technology",
      });
      expect(result.success).toBe(true);
    });

    it("should accept full client data", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        contactName: "John Smith",
        contactEmail: "john@techcorp.com",
        phone: "+1 555-0123",
        website: "https://techcorp.com",
        industry: "technology",
        notes: "Great client",
      });
      expect(result.success).toBe(true);
    });

    it("should reject short company name", () => {
      const result = createClientSchema.safeParse({
        companyName: "X",
        industry: "technology",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid industry", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        industry: "invalid-industry",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid email", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        contactEmail: "not-an-email",
        industry: "technology",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid website URL", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        website: "not-a-url",
        industry: "technology",
      });
      expect(result.success).toBe(false);
    });

    it("should allow empty optional fields", () => {
      const result = createClientSchema.safeParse({
        companyName: "TechCorp Inc.",
        contactEmail: "",
        website: "",
        industry: "technology",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("updateClientSchema", () => {
    it("should accept partial updates", () => {
      const result = updateClientSchema.safeParse({
        companyName: "New Name",
      });
      expect(result.success).toBe(true);
    });

    it("should accept empty object", () => {
      const result = updateClientSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe("clientFilterSchema", () => {
    it("should accept valid filters", () => {
      const result = clientFilterSchema.safeParse({
        search: "tech",
        industry: "technology",
        riskLevel: "low",
        page: 1,
        limit: 20,
      });
      expect(result.success).toBe(true);
    });

    it("should provide defaults", () => {
      const result = clientFilterSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });
  });
});

describe("Invoice Validations", () => {
  describe("createInvoiceSchema", () => {
    it("should accept valid invoice data", () => {
      const result = createInvoiceSchema.safeParse({
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        invoiceNumber: "INV-001",
        amount: 1000,
        dueDate: addDays(new Date(), 30),
      });
      expect(result.success).toBe(true);
    });

    it("should reject zero amount", () => {
      const result = createInvoiceSchema.safeParse({
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        invoiceNumber: "INV-001",
        amount: 0,
        dueDate: addDays(new Date(), 30),
      });
      expect(result.success).toBe(false);
    });

    it("should reject negative amount", () => {
      const result = createInvoiceSchema.safeParse({
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        invoiceNumber: "INV-001",
        amount: -100,
        dueDate: addDays(new Date(), 30),
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid UUID for clientId", () => {
      const result = createInvoiceSchema.safeParse({
        clientId: "not-a-uuid",
        invoiceNumber: "INV-001",
        amount: 1000,
        dueDate: addDays(new Date(), 30),
      });
      expect(result.success).toBe(false);
    });

    it("should accept decimal amounts", () => {
      const result = createInvoiceSchema.safeParse({
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        invoiceNumber: "INV-001",
        amount: 1234.56,
        dueDate: addDays(new Date(), 30),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("markPaidSchema", () => {
    it("should accept payment date", () => {
      const result = markPaidSchema.safeParse({
        paidDate: new Date(),
      });
      expect(result.success).toBe(true);
    });

    it("should provide default date", () => {
      const result = markPaidSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.paidDate).toBeInstanceOf(Date);
      }
    });

    it("should accept optional notes", () => {
      const result = markPaidSchema.safeParse({
        paidDate: new Date(),
        notes: "Paid via bank transfer",
      });
      expect(result.success).toBe(true);
    });
  });
});
