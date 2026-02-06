import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientForm } from "@/components/forms/client-form";
import { ArrowLeft } from "lucide-react";
import type { CreateClientFormData } from "@/lib/validations/client";

export const metadata: Metadata = {
  title: "Add Client",
  description: "Add a new client to track",
};

/**
 * New client page
 */
export default function NewClientPage() {
  const handleSubmit = async (data: CreateClientFormData) => {
    "use server";
    // TODO: Implement client creation
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Client</h1>
          <p className="text-muted-foreground">
            Add a new client to track their payment risk
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientFormWrapper />
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Client-side form wrapper
 */
function ClientFormWrapper() {
  "use client";

  const handleSubmit = async (data: CreateClientFormData) => {
    // TODO: Implement API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return <ClientForm onSubmit={handleSubmit} />;
}
