import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

/**
 * Landing page for PaymentPredictor
 */
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              P
            </div>
            <span className="text-xl font-bold">PaymentPredictor</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign in
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Predict Payment Risk.
            <br />
            <span className="text-primary">Get Paid On Time.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop chasing payments. Our AI-powered risk assessment helps
            freelancers identify problem clients before they become problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to get paid faster
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our intelligent platform helps you assess risk, track invoices, and
            automate follow-ups so you can focus on your work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                AI-powered risk scores help you identify clients likely to pay
                late before you start working with them.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Automated Follow-ups</CardTitle>
              <CardDescription>
                Set it and forget it. Automatic payment reminders sent at the
                right time to the right people.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Bell className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Notifications</CardTitle>
              <CardDescription>
                Stay informed with real-time alerts when invoices become
                overdue or risk levels change.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Industry Benchmarks</CardTitle>
              <CardDescription>
                Compare client payment behavior against industry averages to
                make informed decisions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Invoice Tracking</CardTitle>
              <CardDescription>
                Track all your invoices in one place. See status, due dates,
                and payment history at a glance.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Insights & Reports</CardTitle>
              <CardDescription>
                Understand your payment patterns with detailed reports and
                actionable insights.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 border-t">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to get paid on time?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of freelancers who use PaymentPredictor to manage
              their invoices and predict payment risk.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                P
              </div>
              <span className="font-semibold">PaymentPredictor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 PaymentPredictor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
