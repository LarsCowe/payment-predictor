import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/data-display/metric-card";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Reports",
  description: "View payment analytics and insights",
};

// Mock data
const reportData = {
  totalRevenue: 125000,
  revenueGrowth: 12.5,
  averageDaysToPayment: 18,
  onTimePaymentRate: 78,
  clientRetention: 85,
  overdueAmount: 8750,
  topClients: [
    { name: "TechCorp Inc.", total: 45000, onTime: 95 },
    { name: "Legal Partners LLP", total: 32000, onTime: 100 },
    { name: "Healthcare Plus", total: 28000, onTime: 82 },
    { name: "StartupXYZ", total: 12000, onTime: 75 },
    { name: "Media Solutions", total: 8000, onTime: 60 },
  ],
  industryBreakdown: [
    { industry: "Technology", total: 57000, percentage: 45.6 },
    { industry: "Legal", total: 32000, percentage: 25.6 },
    { industry: "Healthcare", total: 28000, percentage: 22.4 },
    { industry: "Media", total: 8000, percentage: 6.4 },
  ],
  monthlyData: [
    { month: "Sep", revenue: 18000, collected: 16500 },
    { month: "Oct", revenue: 22000, collected: 21000 },
    { month: "Nov", revenue: 25000, collected: 23500 },
    { month: "Dec", revenue: 28000, collected: 25000 },
    { month: "Jan", revenue: 32000, collected: 28000 },
  ],
};

/**
 * Reports page
 */
export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Payment analytics and performance insights"
      />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue (YTD)"
          value={formatCurrency(reportData.totalRevenue)}
          icon={DollarSign}
          trend={{
            value: reportData.revenueGrowth,
            isPositive: reportData.revenueGrowth > 0,
          }}
        />
        <MetricCard
          title="Avg. Days to Payment"
          value={`${reportData.averageDaysToPayment} days`}
          icon={Clock}
          description="From invoice date"
        />
        <MetricCard
          title="On-Time Payment Rate"
          value={`${reportData.onTimePaymentRate}%`}
          icon={CheckCircle}
          variant={reportData.onTimePaymentRate >= 80 ? "success" : "warning"}
        />
        <MetricCard
          title="Client Retention"
          value={`${reportData.clientRetention}%`}
          icon={Users}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-lg">
              <div className="text-center">
                <p className="font-medium">Revenue Chart</p>
                <p className="text-sm">Monthly revenue and collection data</p>
              </div>
            </div>
            {/* Summary below chart */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Invoiced</p>
                <p className="text-lg font-bold">{formatCurrency(125000)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Collected</p>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(114000)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.industryBreakdown.map((item) => (
                <div key={item.industry} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.industry}</span>
                    <span className="font-medium">
                      {formatCurrency(item.total)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clients by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.topClients.map((client, index) => (
              <div
                key={client.name}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.onTime}% on-time payment rate
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(client.total)}</p>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      client.onTime >= 80
                        ? "text-green-600"
                        : client.onTime >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {client.onTime >= 80 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {client.onTime}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Performance */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Early (before due)</span>
                <span className="font-medium text-green-600">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>On time</span>
                <span className="font-medium">43%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>1-7 days late</span>
                <span className="font-medium text-yellow-600">15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>8+ days late</span>
                <span className="font-medium text-red-600">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoice Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paid</span>
                <span className="font-medium text-green-600">68</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Overdue</span>
                <span className="font-medium text-red-600">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Draft</span>
                <span className="font-medium text-muted-foreground">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Low Risk (1-3)</span>
                <span className="font-medium text-green-600">8 clients</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medium Risk (4-6)</span>
                <span className="font-medium text-yellow-600">3 clients</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>High Risk (7-10)</span>
                <span className="font-medium text-red-600">1 client</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
