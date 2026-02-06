import { describe, it, expect } from "vitest";
import {
  calculatePaymentHistoryScore,
  calculateDaysLateScore,
  calculateAmountScore,
  calculateRelationshipScore,
  calculateConfidence,
  getRiskRecommendation,
  industryRiskScores,
  industryAverageDays,
} from "@/lib/prediction/factors";
import {
  calculateRiskScore,
  getRiskColor,
  getRiskTextColor,
  getRiskBgColor,
} from "@/lib/prediction/algorithm";

describe("Risk Factor Calculations", () => {
  describe("calculatePaymentHistoryScore", () => {
    it("should return 1 for 100% on-time", () => {
      expect(calculatePaymentHistoryScore(10, 10)).toBe(1);
    });

    it("should return 10 for 0% on-time", () => {
      expect(calculatePaymentHistoryScore(0, 10)).toBe(10);
    });

    it("should return 5 for new clients with no history", () => {
      expect(calculatePaymentHistoryScore(0, 0)).toBe(5);
    });

    it("should calculate correctly for mixed history", () => {
      expect(calculatePaymentHistoryScore(8, 10)).toBe(3);
      expect(calculatePaymentHistoryScore(5, 10)).toBe(6);
    });
  });

  describe("calculateDaysLateScore", () => {
    it("should return 1 for early payments", () => {
      expect(calculateDaysLateScore(-5)).toBe(1);
    });

    it("should return 1 for on-time payments", () => {
      expect(calculateDaysLateScore(0)).toBe(1);
    });

    it("should return 5 for no data", () => {
      expect(calculateDaysLateScore(null)).toBe(5);
    });

    it("should increase score for late payments", () => {
      expect(calculateDaysLateScore(1)).toBe(2);
      expect(calculateDaysLateScore(5)).toBe(4);
      expect(calculateDaysLateScore(10)).toBe(6);
      expect(calculateDaysLateScore(20)).toBe(8);
      expect(calculateDaysLateScore(60)).toBe(10);
    });
  });

  describe("calculateAmountScore", () => {
    it("should return low score for small amounts", () => {
      expect(calculateAmountScore(100)).toBe(2);
      expect(calculateAmountScore(500)).toBe(2);
    });

    it("should return higher scores for larger amounts", () => {
      expect(calculateAmountScore(1000)).toBe(3);
      expect(calculateAmountScore(5000)).toBe(5);
      expect(calculateAmountScore(25000)).toBe(7);
      expect(calculateAmountScore(100000)).toBe(9);
    });
  });

  describe("calculateRelationshipScore", () => {
    it("should return 7 for brand new clients", () => {
      expect(calculateRelationshipScore(0)).toBe(7);
    });

    it("should decrease score with longer relationships", () => {
      expect(calculateRelationshipScore(1)).toBe(6);
      expect(calculateRelationshipScore(3)).toBe(5);
      expect(calculateRelationshipScore(6)).toBe(4);
      expect(calculateRelationshipScore(12)).toBe(3);
      expect(calculateRelationshipScore(24)).toBe(2);
      expect(calculateRelationshipScore(36)).toBe(1);
    });
  });

  describe("calculateConfidence", () => {
    it("should return base confidence for no invoices", () => {
      expect(calculateConfidence(0, false)).toBe(0.5);
    });

    it("should increase with more invoices", () => {
      expect(calculateConfidence(1, false)).toBeCloseTo(0.6, 5);
      expect(calculateConfidence(5, false)).toBeCloseTo(0.8, 5);
      expect(calculateConfidence(10, false)).toBeCloseTo(0.9, 5);
    });

    it("should add confidence for industry data", () => {
      expect(calculateConfidence(0, true)).toBeCloseTo(0.6, 5);
      expect(calculateConfidence(10, true)).toBeCloseTo(1.0, 5);
    });

    it("should cap at 1.0", () => {
      expect(calculateConfidence(100, true)).toBeCloseTo(1.0, 5);
    });
  });

  describe("getRiskRecommendation", () => {
    it("should return appropriate recommendations", () => {
      expect(getRiskRecommendation(1)).toContain("excellent");
      expect(getRiskRecommendation(4)).toContain("good");
      expect(getRiskRecommendation(6)).toContain("moderate");
      expect(getRiskRecommendation(9)).toContain("high");
    });
  });
});

describe("Industry Risk Data", () => {
  it("should have risk scores for all industries", () => {
    const industries = [
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

    industries.forEach((industry) => {
      expect(industryRiskScores[industry]).toBeDefined();
      expect(industryRiskScores[industry]).toBeGreaterThanOrEqual(1);
      expect(industryRiskScores[industry]).toBeLessThanOrEqual(10);
    });
  });

  it("should have average days for all industries", () => {
    expect(industryAverageDays.technology).toBe(28);
    expect(industryAverageDays.construction).toBe(48);
    expect(industryAverageDays.government).toBe(18);
  });
});

describe("Risk Score Calculation", () => {
  describe("calculateRiskScore", () => {
    it("should calculate risk for a good client", () => {
      const result = calculateRiskScore({
        industry: "technology",
        totalInvoices: 10,
        paidOnTime: 9,
        averageDaysToPayment: 2,
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      });

      expect(result.overallScore).toBeGreaterThanOrEqual(1);
      expect(result.overallScore).toBeLessThanOrEqual(10);
      expect(result.overallScore).toBeLessThanOrEqual(4); // Should be low risk
      expect(result.factors).toHaveLength(5);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it("should calculate risk for a bad client", () => {
      const result = calculateRiskScore({
        industry: "construction",
        totalInvoices: 5,
        paidOnTime: 1,
        averageDaysToPayment: 30,
        createdAt: new Date(), // New client
        pendingInvoiceAmount: 50000,
      });

      expect(result.overallScore).toBeGreaterThanOrEqual(7); // Should be high risk
    });

    it("should handle new client with no history", () => {
      const result = calculateRiskScore({
        industry: "other",
        totalInvoices: 0,
        paidOnTime: 0,
        averageDaysToPayment: null,
        createdAt: new Date(),
      });

      expect(result.overallScore).toBeGreaterThanOrEqual(1);
      expect(result.overallScore).toBeLessThanOrEqual(10);
      expect(result.confidence).toBe(0.6); // Base + industry data
    });
  });
});

describe("Risk UI Helpers", () => {
  describe("getRiskColor", () => {
    it("should return green for low risk", () => {
      expect(getRiskColor(1)).toBe("green");
      expect(getRiskColor(3)).toBe("green");
    });

    it("should return yellow for medium risk", () => {
      expect(getRiskColor(4)).toBe("yellow");
      expect(getRiskColor(6)).toBe("yellow");
    });

    it("should return red for high risk", () => {
      expect(getRiskColor(7)).toBe("red");
      expect(getRiskColor(10)).toBe("red");
    });
  });

  describe("getRiskTextColor", () => {
    it("should return correct text color classes", () => {
      expect(getRiskTextColor(2)).toContain("green");
      expect(getRiskTextColor(5)).toContain("yellow");
      expect(getRiskTextColor(8)).toContain("red");
    });
  });

  describe("getRiskBgColor", () => {
    it("should return correct background color classes", () => {
      expect(getRiskBgColor(2)).toContain("green");
      expect(getRiskBgColor(5)).toContain("yellow");
      expect(getRiskBgColor(8)).toContain("red");
    });
  });
});
