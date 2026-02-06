"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/header";
import { StatusBadge } from "@/components/data-display/status-badge";
import { RiskScoreIndicator } from "@/components/data-display/risk-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";
import { Plus, Search, MoreHorizontal, CheckCircle, Mail, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Mock data
const invoices = [
  {
    id: "i1",
    invoiceNumber: "INV-2026-001",
    clientName: "TechCorp Inc.",
    clientId: "c1",
    amount: 5000,
    currency: "USD",
    dueDate: new Date("2026-02-10"),
    status: "pending" as InvoiceStatus,
    riskScore: 3,
  },
  {
    id: "i2",
    invoiceNumber: "INV-2026-002",
    clientName: "Media Solutions",
    clientId: "c2",
    amount: 3500,
    currency: "USD",
    dueDate: new Date("2026-02-05"),
    status: "overdue" as InvoiceStatus,
    riskScore: 7,
    daysLate: 1,
  },
  {
    id: "i3",
    invoiceNumber: "INV-2026-003",
    clientName: "StartupXYZ",
    clientId: "c3",
    amount: 2250,
    currency: "USD",
    dueDate: new Date("2026-02-15"),
    status: "pending" as InvoiceStatus,
    riskScore: 5,
  },
  {
    id: "i4",
    invoiceNumber: "INV-2025-015",
    clientName: "TechCorp Inc.",
    clientId: "c1",
    amount: 4200,
    currency: "USD",
    dueDate: new Date("2025-12-15"),
    paidDate: new Date("2025-12-14"),
    status: "paid" as InvoiceStatus,
    riskScore: 3,
  },
  {
    id: "i5",
    invoiceNumber: "INV-2025-014",
    clientName: "Legal Partners LLP",
    clientId: "c4",
    amount: 8500,
    currency: "USD",
    dueDate: new Date("2025-11-30"),
    paidDate: new Date("2025-11-28"),
    status: "paid" as InvoiceStatus,
    riskScore: 2,
  },
  {
    id: "i6",
    invoiceNumber: "INV-2025-013",
    clientName: "BuildIt Construction",
    clientId: "c5",
    amount: 12000,
    currency: "USD",
    dueDate: new Date("2025-11-15"),
    status: "overdue" as InvoiceStatus,
    riskScore: 8,
    daysLate: 82,
  },
];

/**
 * Invoices list page
 */
export default function InvoicesPage() {
  const totalOutstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description={`${invoices.length} total • ${formatCurrency(totalOutstanding)} outstanding`}
      >
        <Button asChild>
          <Link href="/invoices/new">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Link>
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="dueDate">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoice Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="font-medium hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/clients/${invoice.clientId}`}
                    className="hover:underline"
                  >
                    {invoice.clientName}
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </TableCell>
                <TableCell>
                  <span className={invoice.status === "overdue" ? "text-red-600" : ""}>
                    {formatDate(invoice.dueDate)}
                  </span>
                  {invoice.daysLate && invoice.daysLate > 0 && (
                    <span className="text-xs text-red-600 ml-1">
                      ({invoice.daysLate}d late)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={invoice.status} size="sm" />
                </TableCell>
                <TableCell className="text-center">
                  <RiskScoreIndicator score={invoice.riskScore} size="sm" />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/invoices/${invoice.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      {invoice.status !== "paid" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {invoices.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first invoice to start tracking payments
          </p>
          <Button asChild>
            <Link href="/invoices/new">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
