"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createClientSchema,
  type CreateClientFormData,
  industries,
  industryLabels,
} from "@/lib/validations/client";
import { Loader2, Building2, User, Mail, Phone, Globe } from "lucide-react";

interface ClientFormProps {
  defaultValues?: Partial<CreateClientFormData>;
  onSubmit: (data: CreateClientFormData) => Promise<void>;
  submitLabel?: string;
}

/**
 * Client form component for creating/editing clients
 */
export function ClientForm({
  defaultValues,
  onSubmit,
  submitLabel = "Create Client",
}: ClientFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      contactEmail: "",
      phone: "",
      website: "",
      industry: "other",
      notes: "",
      ...defaultValues,
    },
  });

  const selectedIndustry = watch("industry");

  const handleFormSubmit = async (data: CreateClientFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="companyName"
            placeholder="Acme Inc."
            className="pl-10"
            disabled={isLoading}
            {...register("companyName")}
          />
        </div>
        {errors.companyName && (
          <p className="text-sm text-destructive">{errors.companyName.message}</p>
        )}
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industry *</Label>
        <Select
          value={selectedIndustry}
          onValueChange={(value) =>
            setValue("industry", value as CreateClientFormData["industry"])
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industryLabels[industry]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && (
          <p className="text-sm text-destructive">{errors.industry.message}</p>
        )}
      </div>

      {/* Contact Name */}
      <div className="space-y-2">
        <Label htmlFor="contactName">Contact Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="contactName"
            placeholder="John Smith"
            className="pl-10"
            disabled={isLoading}
            {...register("contactName")}
          />
        </div>
        {errors.contactName && (
          <p className="text-sm text-destructive">{errors.contactName.message}</p>
        )}
      </div>

      {/* Contact Email */}
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="contactEmail"
            type="email"
            placeholder="john@acme.com"
            className="pl-10"
            disabled={isLoading}
            {...register("contactEmail")}
          />
        </div>
        {errors.contactEmail && (
          <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="pl-10"
            disabled={isLoading}
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            type="url"
            placeholder="https://acme.com"
            className="pl-10"
            disabled={isLoading}
            {...register("website")}
          />
        </div>
        {errors.website && (
          <p className="text-sm text-destructive">{errors.website.message}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any notes about this client..."
          rows={4}
          disabled={isLoading}
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-sm text-destructive">{errors.notes.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
