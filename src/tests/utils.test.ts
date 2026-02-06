import { describe, it, expect } from "vitest";
import {
  cn,
  formatCurrency,
  formatDate,
  daysBetween,
  generateInvoiceNumber,
  truncate,
  safeJsonParse,
  isDefined,
  getInitials,
} from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("should handle undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });
});

describe("formatCurrency", () => {
  it("should format USD correctly", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
  });

  it("should format with different currency", () => {
    expect(formatCurrency(1000, "EUR")).toBe("€1,000.00");
  });

  it("should handle decimals", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("should handle zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should handle large numbers", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2026-02-06");
    const result = formatDate(date);
    expect(result).toContain("Feb");
    expect(result).toContain("2026");
  });

  it("should handle string dates", () => {
    const result = formatDate("2026-02-06");
    expect(result).toContain("Feb");
  });
});

describe("daysBetween", () => {
  it("should calculate days between dates", () => {
    const date1 = new Date("2026-02-01");
    const date2 = new Date("2026-02-06");
    expect(daysBetween(date1, date2)).toBe(5);
  });

  it("should handle negative difference", () => {
    const date1 = new Date("2026-02-06");
    const date2 = new Date("2026-02-01");
    expect(daysBetween(date1, date2)).toBe(-5);
  });

  it("should return 0 for same date", () => {
    const date = new Date("2026-02-06");
    expect(daysBetween(date, date)).toBe(0);
  });
});

describe("generateInvoiceNumber", () => {
  it("should start with INV-", () => {
    const invoiceNumber = generateInvoiceNumber();
    expect(invoiceNumber.startsWith("INV-")).toBe(true);
  });

  it("should generate unique numbers", () => {
    const set = new Set<string>();
    for (let i = 0; i < 100; i++) {
      set.add(generateInvoiceNumber());
    }
    expect(set.size).toBe(100);
  });
});

describe("truncate", () => {
  it("should truncate long text", () => {
    const text = "This is a very long text that should be truncated";
    expect(truncate(text, 20)).toBe("This is a very lo...");
  });

  it("should not truncate short text", () => {
    const text = "Short text";
    expect(truncate(text, 20)).toBe("Short text");
  });

  it("should handle exact length", () => {
    const text = "Exact length";
    expect(truncate(text, 12)).toBe("Exact length");
  });
});

describe("safeJsonParse", () => {
  it("should parse valid JSON", () => {
    const result = safeJsonParse('{"name":"test"}', {});
    expect(result).toEqual({ name: "test" });
  });

  it("should return fallback for invalid JSON", () => {
    const result = safeJsonParse("invalid", { default: true });
    expect(result).toEqual({ default: true });
  });

  it("should handle arrays", () => {
    const result = safeJsonParse("[1,2,3]", []);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("isDefined", () => {
  it("should return true for defined values", () => {
    expect(isDefined("test")).toBe(true);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined({})).toBe(true);
  });

  it("should return false for null", () => {
    expect(isDefined(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isDefined(undefined)).toBe(false);
  });
});

describe("getInitials", () => {
  it("should get initials from full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should handle single name", () => {
    expect(getInitials("John")).toBe("J");
  });

  it("should handle multiple names", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
  });

  it("should handle company names", () => {
    expect(getInitials("TechCorp Inc.")).toBe("TI");
  });
});
