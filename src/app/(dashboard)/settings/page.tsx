"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Bell,
  Mail,
  Shield,
  CreditCard,
  ChevronRight,
} from "lucide-react";


/**
 * Settings page
 */
export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      {/* Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <SettingsCard
          icon={User}
          title="Profile"
          description="Update your personal information"
          href="/settings/profile"
        />
        <SettingsCard
          icon={Bell}
          title="Notifications"
          description="Configure notification preferences"
          href="/settings/notifications"
        />
        <SettingsCard
          icon={Mail}
          title="Email Templates"
          description="Customize follow-up email content"
          href="/settings/templates"
        />
        <SettingsCard
          icon={CreditCard}
          title="Billing"
          description="Manage your subscription and billing"
          href="/settings/billing"
        />
      </div>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Settings</CardTitle>
          <CardDescription>
            Common settings you can adjust without leaving this page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important events
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-digest">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                Get a weekly summary of your invoices and payments
              </p>
            </div>
            <Switch id="weekly-digest" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="follow-ups">Automated Follow-ups</Label>
              <p className="text-sm text-muted-foreground">
                Enable automated payment reminder emails
              </p>
            </div>
            <Switch id="follow-ups" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="overdue-alerts">Overdue Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when invoices become overdue
              </p>
            </div>
            <Switch id="overdue-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Plan</p>
              <p className="text-sm text-muted-foreground">Free Plan</p>
            </div>
            <Button variant="outline">Upgrade</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">
                Download all your data as CSV
              </p>
            </div>
            <Button variant="outline">Export</Button>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Settings navigation card
 */
function SettingsCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
