"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createInvoiceSchema,
  type CreateInvoiceFormData,
  currencies,
} from "@/lib/validations/invoice";
import { generateInvoiceNumber } from "@/lib/utils";
import { Loader2, DollarSign, Calendar, FileText, Hash } from "lucide-react";
import { addDays, format } from "date-fns";

interface Client {
  id: string;
  companyName: string;
}

interface InvoiceFormProps {
  clients: Client[];
  defaultValues?: Partial<CreateInvoiceFormData>;
  onSubmit: (data: CreateInvoiceFormData) => Promise<void>;
  submitLabel?: string;
}

/**
 * Invoice form component for creating/editing invoices
 */
export function InvoiceForm({
  clients,
  defaultValues,
  onSubmit,
  submitLabel = "Create Invoice",
}: InvoiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      clientId: "",
      invoiceNumber: generateInvoiceNumber(),
      amount: 0,
      currency: "USD",
      description: "",
      dueDate: addDays(new Date(), 30),
      followUpsEnabled: true,
      ...defaultValues,
    },
  });

  const selectedClientId = watch("clientId");
  const selectedCurrency = watch("currency");
  const followUpsEnabled = watch("followUpsEnabled");

  const handleFormSubmit = async (data: CreateInvoiceFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  const setQuickDueDate = (days: number) => {
    setValue("dueDate", addDays(new Date(), days));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Client */}
      <div className="space-y-2">
        <Label htmlFor="clientId">Client *</Label>
        <Select
          value={selectedClientId}
          onValueChange={(value) => setValue("clientId", value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.companyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.clientId && (
          <p className="text-sm text-destructive">{errors.clientId.message}</p>
        )}
      </div>

      {/* Invoice Number */}
      <div className="space-y-2">
        <Label htmlFor="invoiceNumber">Invoice Number *</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="invoiceNumber"
            placeholder="INV-001"
            className="pl-10"
            disabled={isLoading}
            {...register("invoiceNumber")}
          />
        </div>
        {errors.invoiceNumber && (
          <p className="text-sm text-destructive">
            {errors.invoiceNumber.message}
          </p>
        )}
      </div>

      {/* Amount and Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-10"
              disabled={isLoading}
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={selectedCurrency}
            onValueChange={(value) =>
              setValue("currency", value as CreateInvoiceFormData["currency"])
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date *</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="dueDate"
            type="date"
            className="pl-10"
            disabled={isLoading}
            {...register("dueDate")}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuickDueDate(15)}
          >
            Net 15
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuickDueDate(30)}
          >
            Net 30
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuickDueDate(60)}
          >
            Net 60
          </Button>
        </div>
        {errors.dueDate && (
          <p className="text-sm text-destructive">{errors.dueDate.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Services rendered, project work, etc."
          rows={3}
          disabled={isLoading}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Follow-ups */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="followUpsEnabled">Automated Follow-ups</Label>
          <p className="text-sm text-muted-foreground">
            Send automatic payment reminders for this invoice
          </p>
        </div>
        <Switch
          id="followUpsEnabled"
          checked={followUpsEnabled}
          onCheckedChange={(checked) => setValue("followUpsEnabled", checked)}
          disabled={isLoading}
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
