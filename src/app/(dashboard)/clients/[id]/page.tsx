import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskBadge, RiskMeter } from "@/components/data-display/risk-badge";
import { InvoiceCard } from "@/components/data-display/invoice-card";
import { industryLabels, type Industry } from "@/lib/validations/client";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import {
  ArrowLeft,
  Edit,
  Trash,
  Mail,
  Phone,
  Globe,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Client Details",
  description: "View client details and risk assessment",
};

// Mock data - would be fetched from database
const getClient = (id: string) => {
  const clients: Record<string, {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    phone: string;
    website: string;
    industry: Industry;
    riskScore: number;
    totalInvoices: number;
    paidOnTime: number;
    averageDaysToPayment: number;
    totalOutstanding: number;
    notes: string;
    createdAt: Date;
  }> = {
    c1: {
      id: "c1",
      companyName: "TechCorp Inc.",
      contactName: "John Smith",
      contactEmail: "john@techcorp.com",
      phone: "+1 555-0123",
      website: "https://techcorp.com",
      industry: "technology",
      riskScore: 3,
      totalInvoices: 15,
      paidOnTime: 14,
      averageDaysToPayment: 2,
      totalOutstanding: 5000,
      notes: "Great client, always pays on time. Preferred payment method is bank transfer.",
      createdAt: new Date("2024-06-15"),
    },
  };
  return clients[id];
};

const getClientInvoices = (clientId: string) => [
  {
    id: "i1",
    invoiceNumber: "INV-2026-001",
    clientName: "TechCorp Inc.",
    clientId,
    amount: 5000,
    dueDate: new Date("2026-02-10"),
    status: "pending" as const,
    riskScore: 3,
  },
  {
    id: "i2",
    invoiceNumber: "INV-2025-015",
    clientName: "TechCorp Inc.",
    clientId,
    amount: 3500,
    dueDate: new Date("2025-12-15"),
    paidDate: new Date("2025-12-14"),
    status: "paid" as const,
    riskScore: 3,
  },
  {
    id: "i3",
    invoiceNumber: "INV-2025-010",
    clientName: "TechCorp Inc.",
    clientId,
    amount: 2800,
    dueDate: new Date("2025-10-01"),
    paidDate: new Date("2025-10-03"),
    status: "paid" as const,
    riskScore: 3,
    daysLate: 2,
  },
];

/**
 * Client detail page
 */
export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClient(id);

  if (!client) {
    notFound();
  }

  const invoices = getClientInvoices(id);
  const onTimeRate = Math.round((client.paidOnTime / client.totalInvoices) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
              {getInitials(client.companyName)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{client.companyName}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline">
                  <Building2 className="h-3 w-3 mr-1" />
                  {industryLabels[client.industry]}
                </Badge>
                <RiskBadge score={client.riskScore} size="sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Invoices</span>
            </div>
            <p className="text-2xl font-bold mt-1">{client.totalInvoices}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Outstanding</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(client.totalOutstanding)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">On-Time Rate</span>
            </div>
            <p className="text-2xl font-bold mt-1">{onTimeRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Avg Days to Pay</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {client.averageDaysToPayment > 0 ? "+" : ""}
              {client.averageDaysToPayment} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{client.contactName}</p>
                    <a
                      href={`mailto:${client.contactEmail}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {client.contactEmail}
                    </a>
                  </div>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${client.phone}`}
                        className="font-medium hover:underline"
                      >
                        {client.phone}
                      </a>
                    </div>
                  </div>
                )}
                {client.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {client.website}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {client.notes || "No notes added yet."}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Client since {formatDate(client.createdAt)}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Invoices ({invoices.length})
            </h3>
            <Button asChild>
              <Link href={`/invoices/new?clientId=${id}`}>Create Invoice</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} {...invoice} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RiskMeter score={client.riskScore} />
              
              <div className="space-y-4">
                <h4 className="font-medium">Risk Factors</h4>
                <div className="space-y-3">
                  <RiskFactorItem
                    name="Payment History"
                    score={2}
                    description={`${client.paidOnTime} of ${client.totalInvoices} invoices paid on time`}
                  />
                  <RiskFactorItem
                    name="Average Days Late"
                    score={3}
                    description={`Typically pays ${client.averageDaysToPayment} days after due date`}
                  />
                  <RiskFactorItem
                    name="Industry Risk"
                    score={4}
                    description="Technology industry has moderate payment risk"
                  />
                  <RiskFactorItem
                    name="Relationship Length"
                    score={2}
                    description="Long-term client (20+ months)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Risk factor item component
 */
function RiskFactorItem({
  name,
  score,
  description,
}: {
  name: string;
  score: number;
  description: string;
}) {
  const getScoreColor = (s: number) => {
    if (s <= 3) return "text-green-600";
    if (s <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className={`font-bold ${getScoreColor(score)}`}>{score}/10</span>
    </div>
  );
}
