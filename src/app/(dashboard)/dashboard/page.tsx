"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/header";
import { MetricCard } from "@/components/data-display/metric-card";
import { InvoiceCard } from "@/components/data-display/invoice-card";
import { ClientCard } from "@/components/data-display/client-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  FileText,
  ArrowRight,
  Plus,
} from "lucide-react";


// Mock data - would come from database in production
const dashboardStats = {
  totalOutstanding: 24500,
  totalOverdue: 8750,
  atRiskCount: 3,
  paidThisMonth: 15200,
  clientCount: 12,
  invoiceCount: 28,
};

const upcomingInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-2026-001",
    clientName: "TechCorp Inc.",
    clientId: "c1",
    amount: 5000,
    dueDate: new Date("2026-02-10"),
    status: "pending" as const,
    riskScore: 3,
  },
  {
    id: "2",
    invoiceNumber: "INV-2026-002",
    clientName: "Media Solutions",
    clientId: "c2",
    amount: 3500,
    dueDate: new Date("2026-02-12"),
    status: "pending" as const,
    riskScore: 7,
  },
  {
    id: "3",
    invoiceNumber: "INV-2026-003",
    clientName: "StartupXYZ",
    clientId: "c3",
    amount: 2250,
    dueDate: new Date("2026-02-15"),
    status: "pending" as const,
    riskScore: 5,
  },
];

const recentClients = [
  {
    id: "c1",
    companyName: "TechCorp Inc.",
    contactName: "John Smith",
    contactEmail: "john@techcorp.com",
    industry: "technology" as const,
    riskScore: 3,
    totalInvoices: 8,
    totalOutstanding: 5000,
  },
  {
    id: "c2",
    companyName: "Media Solutions",
    contactName: "Jane Doe",
    contactEmail: "jane@mediasolutions.com",
    industry: "media" as const,
    riskScore: 7,
    totalInvoices: 5,
    totalOutstanding: 8750,
  },
];

/**
 * Main dashboard page
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your clients and invoices"
      >
        <Button asChild>
          <Link href="/invoices/new">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Outstanding"
          value={`$${dashboardStats.totalOutstanding.toLocaleString()}`}
          description="Across all pending invoices"
          icon={DollarSign}
        />
        <MetricCard
          title="Overdue Amount"
          value={`$${dashboardStats.totalOverdue.toLocaleString()}`}
          description="Requires immediate attention"
          icon={AlertTriangle}
          variant="danger"
        />
        <MetricCard
          title="At-Risk Invoices"
          value={dashboardStats.atRiskCount}
          description="High-risk clients"
          icon={Clock}
          variant="warning"
        />
        <MetricCard
          title="Paid This Month"
          value={`$${dashboardStats.paidThisMonth.toLocaleString()}`}
          description="Successfully collected"
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard
          title="Total Clients"
          value={dashboardStats.clientCount}
          icon={Users}
          onClick={() => {}}
        />
        <MetricCard
          title="Active Invoices"
          value={dashboardStats.invoiceCount}
          icon={FileText}
          onClick={() => {}}
        />
      </div>

      {/* Content Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Due Dates</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/invoices">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInvoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                {...invoice}
              />
            ))}
          </CardContent>
        </Card>

        {/* High Risk Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Clients Needing Attention</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/clients">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClients.map((client) => (
              <ClientCard
                key={client.id}
                {...client}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              icon={CheckCircle}
              iconColor="text-green-500"
              title="Payment received"
              description="TechCorp Inc. paid $2,500 for INV-2026-015"
              time="2 hours ago"
            />
            <ActivityItem
              icon={FileText}
              iconColor="text-blue-500"
              title="Invoice created"
              description="Created INV-2026-021 for StartupXYZ"
              time="4 hours ago"
            />
            <ActivityItem
              icon={AlertTriangle}
              iconColor="text-yellow-500"
              title="Invoice overdue"
              description="INV-2026-008 from Media Solutions is now overdue"
              time="1 day ago"
            />
            <ActivityItem
              icon={Users}
              iconColor="text-purple-500"
              title="Client added"
              description="Added new client: Design Studio Pro"
              time="2 days ago"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Activity feed item component
 */
function ActivityItem({
  icon: Icon,
  iconColor,
  title,
  description,
  time,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}
