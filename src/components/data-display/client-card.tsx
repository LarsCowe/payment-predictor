"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "./risk-badge";
import { formatCurrency, getInitials } from "@/lib/utils";
import { industryLabels, type Industry } from "@/lib/validations/client";
import { cn } from "@/lib/utils";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  FileText,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ClientCardProps {
  id: string;
  companyName: string;
  contactName?: string | null;
  contactEmail?: string | null;
  phone?: string | null;
  website?: string | null;
  industry: Industry;
  riskScore: number;
  totalInvoices: number;
  totalOutstanding?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Client card component for displaying client information
 */
export function ClientCard({
  id,
  companyName,
  contactName,
  contactEmail,
  phone,
  website,
  industry,
  riskScore,
  totalInvoices,
  totalOutstanding = 0,
  onEdit,
  onDelete,
  className,
}: ClientCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {getInitials(companyName)}
            </div>
            <div>
              <CardTitle className="text-base">
                <Link
                  href={`/clients/${id}`}
                  className="hover:underline"
                >
                  {companyName}
                </Link>
              </CardTitle>
              {contactName && (
                <CardDescription>{contactName}</CardDescription>
              )}
            </div>
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
                <Link href={`/clients/${id}`}>View Details</Link>
              </DropdownMenuItem>
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            <Building2 className="h-3 w-3 mr-1" />
            {industryLabels[industry]}
          </Badge>
          <RiskBadge score={riskScore} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Invoices:</span>{" "}
            <span className="font-medium">{totalInvoices}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Outstanding:</span>{" "}
            <span className="font-medium">
              {formatCurrency(totalOutstanding)}
            </span>
          </div>
        </div>

        {(contactEmail || phone || website) && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Mail className="h-3 w-3" />
                {contactEmail}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Phone className="h-3 w-3" />
                {phone}
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Globe className="h-3 w-3" />
                Website
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Client card skeleton for loading state
 */
export function ClientCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
