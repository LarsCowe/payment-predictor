"use client";

import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/types";
import { getStatusLabel } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: InvoiceStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Invoice status badge component
 */
export function StatusBadge({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const label = getStatusLabel(status);

  const variant = {
    draft: "secondary" as const,
    pending: "warning" as const,
    overdue: "danger" as const,
    paid: "success" as const,
  }[status];

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge variant={variant} className={cn(sizeClasses[size], className)}>
      {label}
    </Badge>
  );
}

/**
 * Status dot indicator
 */
export function StatusDot({
  status,
  className,
}: {
  status: InvoiceStatus;
  className?: string;
}) {
  const colorClasses = {
    draft: "bg-gray-400",
    pending: "bg-yellow-400",
    overdue: "bg-red-500",
    paid: "bg-green-500",
  }[status];

  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        colorClasses,
        className
      )}
    />
  );
}
