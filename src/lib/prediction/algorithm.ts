/**
 * Risk prediction algorithm
 *
 * Calculates a risk score (1-10) for a client based on multiple factors.
 */

import type { Industry } from "@/lib/validations/client";
import {
  riskFactors,
  industryRiskScores,
  calculatePaymentHistoryScore,
  calculateDaysLateScore,
  calculateAmountScore,
  calculateRelationshipScore,
  calculateConfidence,
  getRiskRecommendation,
  type RiskCalculation,
  type FactorScore,
} from "./factors";

/**
 * Client data for risk calculation
 */
export interface ClientRiskData {
  industry: Industry;
  totalInvoices: number;
  paidOnTime: number;
  averageDaysToPayment: number | null;
  createdAt: Date;
  pendingInvoiceAmount?: number;
}

/**
 * Calculate risk score for a client
 */
export function calculateRiskScore(data: ClientRiskData): RiskCalculation {
  const factorScores: FactorScore[] = [];

  // 1. Payment History Factor
  const paymentHistoryScore = calculatePaymentHistoryScore(
    data.paidOnTime,
    data.totalInvoices
  );
  const paymentHistoryFactor = riskFactors.find(
    (f) => f.id === "payment_history"
  )!;
  factorScores.push({
    factor: paymentHistoryFactor,
    score: paymentHistoryScore,
    weightedScore: paymentHistoryScore * paymentHistoryFactor.weight,
    explanation: getPaymentHistoryExplanation(data.paidOnTime, data.totalInvoices),
  });

  // 2. Average Days Late Factor
  const daysLateScore = calculateDaysLateScore(data.averageDaysToPayment);
  const daysLateFactor = riskFactors.find((f) => f.id === "average_days_late")!;
  factorScores.push({
    factor: daysLateFactor,
    score: daysLateScore,
    weightedScore: daysLateScore * daysLateFactor.weight,
    explanation: getDaysLateExplanation(data.averageDaysToPayment),
  });

  // 3. Industry Risk Factor
  const industryScore = industryRiskScores[data.industry];
  const industryFactor = riskFactors.find((f) => f.id === "industry_risk")!;
  factorScores.push({
    factor: industryFactor,
    score: industryScore,
    weightedScore: industryScore * industryFactor.weight,
    explanation: getIndustryExplanation(data.industry, industryScore),
  });

  // 4. Invoice Amount Factor (if pending invoice exists)
  const amountScore = data.pendingInvoiceAmount
    ? calculateAmountScore(data.pendingInvoiceAmount)
    : 5;
  const amountFactor = riskFactors.find((f) => f.id === "invoice_amount")!;
  factorScores.push({
    factor: amountFactor,
    score: amountScore,
    weightedScore: amountScore * amountFactor.weight,
    explanation: getAmountExplanation(data.pendingInvoiceAmount),
  });

  // 5. Relationship Length Factor
  const monthsAsClient = getMonthsDifference(data.createdAt, new Date());
  const relationshipScore = calculateRelationshipScore(monthsAsClient);
  const relationshipFactor = riskFactors.find(
    (f) => f.id === "relationship_length"
  )!;
  factorScores.push({
    factor: relationshipFactor,
    score: relationshipScore,
    weightedScore: relationshipScore * relationshipFactor.weight,
    explanation: getRelationshipExplanation(monthsAsClient),
  });

  // Calculate overall score (weighted average)
  const totalWeightedScore = factorScores.reduce(
    (sum, f) => sum + f.weightedScore,
    0
  );
  const overallScore = Math.round(Math.max(1, Math.min(10, totalWeightedScore)));

  // Calculate confidence
  const confidence = calculateConfidence(data.totalInvoices, true);

  // Get recommendation
  const recommendation = getRiskRecommendation(overallScore);

  return {
    overallScore,
    factors: factorScores,
    confidence,
    recommendation,
  };
}

/**
 * Calculate months between two dates
 */
function getMonthsDifference(startDate: Date, endDate: Date): number {
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return Math.max(0, months);
}

/**
 * Payment history explanation
 */
function getPaymentHistoryExplanation(
  onTime: number,
  total: number
): string {
  if (total === 0) {
    return "No payment history yet. Using neutral score.";
  }
  const rate = Math.round((onTime / total) * 100);
  return `${onTime} of ${total} invoices (${rate}%) paid on time.`;
}

/**
 * Days late explanation
 */
function getDaysLateExplanation(avgDays: number | null): string {
  if (avgDays === null) {
    return "No payment data yet. Using neutral score.";
  }
  if (avgDays <= 0) {
    return `Payments are typically on time or ${Math.abs(avgDays)} days early.`;
  }
  return `Payments are typically ${avgDays} days late.`;
}

/**
 * Industry explanation
 */
function getIndustryExplanation(industry: Industry, score: number): string {
  const riskLevel =
    score <= 3 ? "low" : score <= 6 ? "moderate" : "higher";
  const industryName = industry.charAt(0).toUpperCase() + industry.slice(1);
  return `${industryName} industry has ${riskLevel} average payment risk.`;
}

/**
 * Amount explanation
 */
function getAmountExplanation(amount: number | undefined): string {
  if (!amount) {
    return "No pending invoice amount. Using neutral score.";
  }
  if (amount <= 1000) {
    return `Lower invoice amount ($${amount.toLocaleString()}) typically has lower risk.`;
  }
  if (amount <= 10000) {
    return `Moderate invoice amount ($${amount.toLocaleString()}) has average risk.`;
  }
  return `Higher invoice amount ($${amount.toLocaleString()}) may have elevated risk.`;
}

/**
 * Relationship explanation
 */
function getRelationshipExplanation(months: number): string {
  if (months <= 0) {
    return "New client. Risk assessment based on other factors.";
  }
  if (months < 6) {
    return `Relatively new client (${months} months). Building track record.`;
  }
  if (months < 24) {
    return `Established client (${months} months). Good relationship history.`;
  }
  return `Long-term client (${Math.floor(months / 12)}+ years). Strong relationship.`;
}

/**
 * Get risk color based on score
 */
export function getRiskColor(score: number): string {
  if (score <= 3) return "green";
  if (score <= 6) return "yellow";
  return "red";
}

/**
 * Get risk text color class
 */
export function getRiskTextColor(score: number): string {
  if (score <= 3) return "text-green-600 dark:text-green-400";
  if (score <= 6) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

/**
 * Get risk background color class
 */
export function getRiskBgColor(score: number): string {
  if (score <= 3) return "bg-green-100 dark:bg-green-900/30";
  if (score <= 6) return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-red-100 dark:bg-red-900/30";
}
