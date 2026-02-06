import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/data-display/status-badge";
import { RiskBadge } from "@/components/data-display/risk-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { InvoiceStatus, FollowUpStatus, TemplateType } from "@/types";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Edit,
  Trash,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Invoice Details",
  description: "View invoice details and follow-up history",
};

// Mock data
const getInvoice = (id: string) => {
  const invoices: Record<string, {
    id: string;
    invoiceNumber: string;
    clientId: string;
    clientName: string;
    amount: number;
    currency: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    paidDate?: Date;
    status: InvoiceStatus;
    riskScore: number;
    daysLate?: number;
    followUpsEnabled: boolean;
    createdAt: Date;
  }> = {
    i1: {
      id: "i1",
      invoiceNumber: "INV-2026-001",
      clientId: "c1",
      clientName: "TechCorp Inc.",
      amount: 5000,
      currency: "USD",
      description: "Website development project - Phase 2 milestone",
      issueDate: new Date("2026-01-15"),
      dueDate: new Date("2026-02-10"),
      status: "pending",
      riskScore: 3,
      followUpsEnabled: true,
      createdAt: new Date("2026-01-15"),
    },
  };
  return invoices[id];
};

const getFollowUps = (invoiceId: string) => [
  {
    id: "f1",
    templateType: "reminder_before" as TemplateType,
    subject: "Payment Reminder: INV-2026-001",
    scheduledAt: new Date("2026-02-07"),
    status: "scheduled" as FollowUpStatus,
  },
  {
    id: "f2",
    templateType: "reminder_due" as TemplateType,
    subject: "Payment Due Today: INV-2026-001",
    scheduledAt: new Date("2026-02-10"),
    status: "scheduled" as FollowUpStatus,
  },
  {
    id: "f3",
    templateType: "reminder_after_1" as TemplateType,
    subject: "Payment Overdue: INV-2026-001",
    scheduledAt: new Date("2026-02-13"),
    status: "scheduled" as FollowUpStatus,
  },
];

/**
 * Invoice detail page
 */
export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoice(id);

  if (!invoice) {
    notFound();
  }

  const followUps = getFollowUps(id);
  const isPaid = invoice.status === "paid";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/invoices">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
              <StatusBadge status={invoice.status} />
            </div>
            <Link
              href={`/clients/${invoice.clientId}`}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Building2 className="h-4 w-4" />
              {invoice.clientName}
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {!isPaid && (
            <>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Paid
              </Button>
            </>
          )}
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client Risk</p>
                <div className="mt-1">
                  <RiskBadge score={invoice.riskScore} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="font-medium">{formatDate(invoice.issueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className={`font-medium ${invoice.status === "overdue" ? "text-red-600" : ""}`}>
                  {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>

            {invoice.paidDate && (
              <div>
                <p className="text-sm text-muted-foreground">Paid Date</p>
                <p className="font-medium text-green-600">
                  {formatDate(invoice.paidDate)}
                </p>
              </div>
            )}

            {invoice.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm">{invoice.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Follow-up Schedule</CardTitle>
            <Badge variant={invoice.followUpsEnabled ? "success" : "secondary"}>
              {invoice.followUpsEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </CardHeader>
          <CardContent>
            {invoice.followUpsEnabled ? (
              <div className="space-y-4">
                {followUps.map((followUp) => (
                  <FollowUpItem key={followUp.id} {...followUp} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Automated follow-ups are disabled for this invoice.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TimelineItem
              icon={FileText}
              iconColor="text-blue-500"
              title="Invoice created"
              description={`Created for ${invoice.clientName}`}
              date={invoice.createdAt}
            />
            {invoice.status === "overdue" && (
              <TimelineItem
                icon={Clock}
                iconColor="text-red-500"
                title="Invoice became overdue"
                description="Due date has passed"
                date={invoice.dueDate}
              />
            )}
            {invoice.paidDate && (
              <TimelineItem
                icon={CheckCircle}
                iconColor="text-green-500"
                title="Payment received"
                description={`${formatCurrency(invoice.amount)} received`}
                date={invoice.paidDate}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Follow-up item component
 */
function FollowUpItem({
  templateType,
  subject,
  scheduledAt,
  status,
}: {
  templateType: TemplateType;
  subject: string;
  scheduledAt: Date;
  status: FollowUpStatus;
}) {
  const statusColors = {
    scheduled: "bg-yellow-100 text-yellow-800",
    sent: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
  };

  const templateLabels = {
    reminder_before: "Before Due",
    reminder_due: "On Due Date",
    reminder_after_1: "First Reminder",
    reminder_after_2: "Second Reminder",
    final_notice: "Final Notice",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{templateLabels[templateType]}</p>
          <p className="text-xs text-muted-foreground">{formatDate(scheduledAt)}</p>
        </div>
      </div>
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </div>
  );
}

/**
 * Timeline item component
 */
function TimelineItem({
  icon: Icon,
  iconColor,
  title,
  description,
  date,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  date: Date;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{formatDate(date)}</span>
    </div>
  );
}
