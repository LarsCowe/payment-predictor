"use client";

import { Badge } from "@/components/ui/badge";
import { getRiskLevel, getRiskLabel } from "@/types";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  score: number;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Risk badge component
 * Displays a colored badge indicating risk level
 */
export function RiskBadge({
  score,
  showScore = true,
  size = "md",
  className,
}: RiskBadgeProps) {
  const level = getRiskLevel(score);
  const label = getRiskLabel(score);

  const variant = {
    low: "success" as const,
    medium: "warning" as const,
    high: "danger" as const,
  }[level];

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge
      variant={variant}
      className={cn(sizeClasses[size], className)}
    >
      {showScore ? `${score}/10 - ${label}` : label}
    </Badge>
  );
}

/**
 * Risk score indicator
 * Displays just the numeric score with color
 */
export function RiskScoreIndicator({
  score,
  size = "md",
  className,
}: Omit<RiskBadgeProps, "showScore">) {
  const level = getRiskLevel(score);

  const colorClasses = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400",
  }[level];

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base font-medium",
    lg: "text-lg font-semibold",
  };

  return (
    <span className={cn(colorClasses, sizeClasses[size], className)}>
      {score}
    </span>
  );
}

/**
 * Risk meter component
 * Visual representation of risk level
 */
export function RiskMeter({
  score,
  showLabel = true,
  className,
}: {
  score: number;
  showLabel?: boolean;
  className?: string;
}) {
  const level = getRiskLevel(score);
  const percentage = (score / 10) * 100;

  const colorClasses = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  }[level];

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">Risk Score</span>
        {showLabel && (
          <RiskBadge score={score} showScore={false} size="sm" />
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", colorClasses)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}
