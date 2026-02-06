"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/header";
import { ClientCard, ClientCardSkeleton } from "@/components/data-display/client-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { industries, industryLabels } from "@/lib/validations/client";


// Mock data
const clients = [
  {
    id: "c1",
    companyName: "TechCorp Inc.",
    contactName: "John Smith",
    contactEmail: "john@techcorp.com",
    phone: "+1 555-0123",
    website: "https://techcorp.com",
    industry: "technology" as const,
    riskScore: 3,
    totalInvoices: 15,
    totalOutstanding: 5000,
  },
  {
    id: "c2",
    companyName: "Media Solutions",
    contactName: "Jane Doe",
    contactEmail: "jane@mediasolutions.com",
    phone: "+1 555-0124",
    industry: "media" as const,
    riskScore: 7,
    totalInvoices: 8,
    totalOutstanding: 12500,
  },
  {
    id: "c3",
    companyName: "StartupXYZ",
    contactName: "Mike Johnson",
    contactEmail: "mike@startupxyz.io",
    industry: "technology" as const,
    riskScore: 5,
    totalInvoices: 4,
    totalOutstanding: 3200,
  },
  {
    id: "c4",
    companyName: "Legal Partners LLP",
    contactName: "Sarah Williams",
    contactEmail: "sarah@legalpartners.com",
    phone: "+1 555-0125",
    website: "https://legalpartners.com",
    industry: "legal" as const,
    riskScore: 2,
    totalInvoices: 22,
    totalOutstanding: 0,
  },
  {
    id: "c5",
    companyName: "BuildIt Construction",
    contactName: "Tom Brown",
    contactEmail: "tom@buildit.co",
    industry: "construction" as const,
    riskScore: 8,
    totalInvoices: 6,
    totalOutstanding: 18750,
  },
  {
    id: "c6",
    companyName: "Healthcare Plus",
    contactName: "Dr. Emily Chen",
    contactEmail: "emily@healthcareplus.med",
    industry: "healthcare" as const,
    riskScore: 4,
    totalInvoices: 12,
    totalOutstanding: 7500,
  },
];

/**
 * Clients list page
 */
export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description={`${clients.length} total clients`}
      >
        <Button asChild>
          <Link href="/clients/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Link>
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industryLabels[industry]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="low">Low Risk (1-3)</SelectItem>
            <SelectItem value="medium">Medium Risk (4-6)</SelectItem>
            <SelectItem value="high">High Risk (7-10)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            {...client}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first client to start tracking payment risk
          </p>
          <Button asChild>
            <Link href="/clients/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
