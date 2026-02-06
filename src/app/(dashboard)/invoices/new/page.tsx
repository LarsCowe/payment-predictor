"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/forms/invoice-form";
import { ArrowLeft } from "lucide-react";
import type { CreateInvoiceFormData } from "@/lib/validations/invoice";

// Mock clients - would come from database
const clients = [
  { id: "c1", companyName: "TechCorp Inc." },
  { id: "c2", companyName: "Media Solutions" },
  { id: "c3", companyName: "StartupXYZ" },
  { id: "c4", companyName: "Legal Partners LLP" },
  { id: "c5", companyName: "BuildIt Construction" },
  { id: "c6", companyName: "Healthcare Plus" },
];

/**
 * New invoice page
 */
export default function NewInvoicePage() {
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get("clientId") || "";

  const handleSubmit = async (data: CreateInvoiceFormData) => {
    // TODO: Implement invoice creation
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/invoices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <p className="text-muted-foreground">
            Track a new invoice for payment monitoring
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm
            clients={clients}
            defaultValues={
              preselectedClientId ? { clientId: preselectedClientId } : undefined
            }
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
