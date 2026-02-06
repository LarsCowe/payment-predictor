/**
 * Risk prediction factors
 *
 * Each factor contributes to the overall risk score calculation.
 * Factors have weights that determine their influence on the final score.
 */

import type { Industry } from "@/lib/validations/client";

/**
 * Factor definition
 */
export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  weight: number;
  minScore: number;
  maxScore: number;
}

/**
 * All risk factors used in the calculation
 */
export const riskFactors: RiskFactor[] = [
  {
    id: "payment_history",
    name: "Payment History",
    description: "Historical on-time payment rate",
    weight: 0.35,
    minScore: 1,
    maxScore: 10,
  },
  {
    id: "average_days_late",
    name: "Average Days Late",
    description: "Average number of days payments are late",
    weight: 0.25,
    minScore: 1,
    maxScore: 10,
  },
  {
    id: "industry_risk",
    name: "Industry Risk",
    description: "Industry-based payment risk",
    weight: 0.20,
    minScore: 1,
    maxScore: 10,
  },
  {
    id: "invoice_amount",
    name: "Invoice Amount",
    description: "Higher amounts may have more risk",
    weight: 0.10,
    minScore: 1,
    maxScore: 10,
  },
  {
    id: "relationship_length",
    name: "Relationship Length",
    description: "Longer relationships tend to be more reliable",
    weight: 0.10,
    minScore: 1,
    maxScore: 10,
  },
];

/**
 * Industry risk scores (based on research and benchmarks)
 */
export const industryRiskScores: Record<Industry, number> = {
  technology: 4,
  marketing: 6,
  finance: 3,
  healthcare: 4,
  education: 5,
  retail: 6,
  manufacturing: 5,
  media: 7,
  legal: 3,
  consulting: 5,
  nonprofit: 7,
  government: 2,
  hospitality: 7,
  construction: 8,
  realestate: 6,
  other: 5,
};

/**
 * Industry average days to payment
 */
export const industryAverageDays: Record<Industry, number> = {
  technology: 28,
  marketing: 35,
  finance: 22,
  healthcare: 30,
  education: 32,
  retail: 38,
  manufacturing: 35,
  media: 42,
  legal: 25,
  consulting: 32,
  nonprofit: 45,
  government: 18,
  hospitality: 40,
  construction: 48,
  realestate: 38,
  other: 32,
};

/**
 * Industry late payment rates (percentage)
 */
export const industryLatePaymentRates: Record<Industry, number> = {
  technology: 0.15,
  marketing: 0.25,
  finance: 0.10,
  healthcare: 0.18,
  education: 0.20,
  retail: 0.28,
  manufacturing: 0.22,
  media: 0.32,
  legal: 0.12,
  consulting: 0.20,
  nonprofit: 0.35,
  government: 0.05,
  hospitality: 0.30,
  construction: 0.40,
  realestate: 0.25,
  other: 0.22,
};

/**
 * Calculate payment history score
 * @param onTimeCount - Number of on-time payments
 * @param totalCount - Total number of payments
 */
export function calculatePaymentHistoryScore(
  onTimeCount: number,
  totalCount: number
): number {
  if (totalCount === 0) return 5; // Neutral for new clients

  const onTimeRate = onTimeCount / totalCount;

  // Map rate to score (1-10)
  // 100% on-time = 1 (lowest risk)
  // 0% on-time = 10 (highest risk)
  return Math.round(10 - onTimeRate * 9);
}

/**
 * Calculate average days late score
 * @param avgDaysLate - Average days late (negative means early)
 */
export function calculateDaysLateScore(avgDaysLate: number | null): number {
  if (avgDaysLate === null) return 5; // Neutral for new clients

  if (avgDaysLate <= 0) return 1; // Early or on-time
  if (avgDaysLate <= 3) return 2;
  if (avgDaysLate <= 7) return 4;
  if (avgDaysLate <= 14) return 6;
  if (avgDaysLate <= 30) return 8;
  return 10; // Very late
}

/**
 * Calculate invoice amount score
 * Higher amounts = slightly higher risk
 * @param amount - Invoice amount in USD
 */
export function calculateAmountScore(amount: number): number {
  if (amount <= 500) return 2;
  if (amount <= 1000) return 3;
  if (amount <= 2500) return 4;
  if (amount <= 5000) return 5;
  if (amount <= 10000) return 6;
  if (amount <= 25000) return 7;
  if (amount <= 50000) return 8;
  return 9;
}

/**
 * Calculate relationship length score
 * Longer relationships = lower risk
 * @param monthsAsClient - Number of months as a client
 */
export function calculateRelationshipScore(monthsAsClient: number): number {
  if (monthsAsClient <= 0) return 7; // New client
  if (monthsAsClient <= 1) return 6;
  if (monthsAsClient <= 3) return 5;
  if (monthsAsClient <= 6) return 4;
  if (monthsAsClient <= 12) return 3;
  if (monthsAsClient <= 24) return 2;
  return 1; // Long-term client (2+ years)
}

/**
 * Factor score result
 */
export interface FactorScore {
  factor: RiskFactor;
  score: number;
  weightedScore: number;
  explanation: string;
}

/**
 * Risk calculation result
 */
export interface RiskCalculation {
  overallScore: number;
  factors: FactorScore[];
  confidence: number;
  recommendation: string;
}

/**
 * Get recommendation based on risk score
 */
export function getRiskRecommendation(score: number): string {
  if (score <= 3) {
    return "This client has an excellent payment track record. Standard payment terms are appropriate.";
  }
  if (score <= 5) {
    return "This client has a good payment history. Consider standard terms with regular follow-ups.";
  }
  if (score <= 7) {
    return "This client has moderate risk. Consider requesting partial upfront payment or shorter terms.";
  }
  return "This client has high risk. Consider requiring full upfront payment or payment milestones.";
}

/**
 * Get confidence level based on data availability
 */
export function calculateConfidence(
  totalInvoices: number,
  hasIndustryData: boolean
): number {
  let confidence = 0.5; // Base confidence

  // More invoices = higher confidence
  if (totalInvoices >= 1) confidence += 0.1;
  if (totalInvoices >= 3) confidence += 0.1;
  if (totalInvoices >= 5) confidence += 0.1;
  if (totalInvoices >= 10) confidence += 0.1;

  // Industry data adds confidence
  if (hasIndustryData) confidence += 0.1;

  return Math.min(confidence, 1);
}
