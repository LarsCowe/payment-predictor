"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "./status-badge";
import { RiskScoreIndicator } from "./risk-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";
import { cn } from "@/lib/utils";
import {
  Calendar,
  DollarSign,
  Building2,
  MoreVertical,
  CheckCircle,
  Mail,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceCardProps {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientId: string;
  amount: number;
  currency?: string;
  dueDate: Date;
  status: InvoiceStatus;
  riskScore?: number;
  daysLate?: number | null;
  onMarkPaid?: () => void;
  onSendReminder?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Invoice card component for displaying invoice summary
 */
export function InvoiceCard({
  id,
  invoiceNumber,
  clientName,
  clientId,
  amount,
  currency = "USD",
  dueDate,
  status,
  riskScore,
  daysLate,
  onMarkPaid,
  onSendReminder,
  onDelete,
  className,
}: InvoiceCardProps) {
  const isOverdue = status === "overdue";
  const isPaid = status === "paid";

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow",
        isOverdue && "border-red-200 dark:border-red-800",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">
              <Link href={`/invoices/${id}`} className="hover:underline">
                {invoiceNumber}
              </Link>
            </CardTitle>
            <CardDescription>
              <Link
                href={`/clients/${clientId}`}
                className="hover:underline flex items-center gap-1"
              >
                <Building2 className="h-3 w-3" />
                {clientName}
              </Link>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/invoices/${id}`}>View Details</Link>
              </DropdownMenuItem>
              {!isPaid && onMarkPaid && (
                <DropdownMenuItem onClick={onMarkPaid}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Paid
                </DropdownMenuItem>
              )}
              {!isPaid && onSendReminder && (
                <DropdownMenuItem onClick={onSendReminder}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reminder
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-lg font-bold">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            {formatCurrency(amount, currency)}
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due {formatDate(dueDate)}</span>
          </div>
          {riskScore !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Risk:</span>
              <RiskScoreIndicator score={riskScore} size="sm" />
            </div>
          )}
        </div>

        {daysLate !== null && daysLate !== undefined && daysLate > 0 && (
          <p className="text-xs text-red-600 dark:text-red-400">
            {daysLate} {daysLate === 1 ? "day" : "days"} overdue
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Invoice card skeleton for loading state
 */
export function InvoiceCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}
