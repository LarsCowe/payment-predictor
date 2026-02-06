import { describe, it, expect } from "vitest";
import {
  getRiskLevel,
  getRiskLabel,
  getStatusLabel,
  type RiskLevel,
  type InvoiceStatus,
} from "@/types";

describe("Type Helpers", () => {
  describe("getRiskLevel", () => {
    it("should return low for scores 1-3", () => {
      expect(getRiskLevel(1)).toBe("low");
      expect(getRiskLevel(2)).toBe("low");
      expect(getRiskLevel(3)).toBe("low");
    });

    it("should return medium for scores 4-6", () => {
      expect(getRiskLevel(4)).toBe("medium");
      expect(getRiskLevel(5)).toBe("medium");
      expect(getRiskLevel(6)).toBe("medium");
    });

    it("should return high for scores 7-10", () => {
      expect(getRiskLevel(7)).toBe("high");
      expect(getRiskLevel(8)).toBe("high");
      expect(getRiskLevel(9)).toBe("high");
      expect(getRiskLevel(10)).toBe("high");
    });
  });

  describe("getRiskLabel", () => {
    it("should return correct labels", () => {
      expect(getRiskLabel(1)).toBe("Low Risk");
      expect(getRiskLabel(5)).toBe("Medium Risk");
      expect(getRiskLabel(9)).toBe("High Risk");
    });
  });

  describe("getStatusLabel", () => {
    it("should return correct labels for all statuses", () => {
      expect(getStatusLabel("draft")).toBe("Draft");
      expect(getStatusLabel("pending")).toBe("Pending");
      expect(getStatusLabel("overdue")).toBe("Overdue");
      expect(getStatusLabel("paid")).toBe("Paid");
    });
  });
});

describe("Type Definitions", () => {
  it("should have correct risk level type", () => {
    const levels: RiskLevel[] = ["low", "medium", "high"];
    expect(levels).toHaveLength(3);
  });

  it("should have correct invoice status type", () => {
    const statuses: InvoiceStatus[] = ["draft", "pending", "overdue", "paid"];
    expect(statuses).toHaveLength(4);
  });
});
