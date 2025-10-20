import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, TrendingUp, DollarSign, FileText, Users } from "lucide-react";

const summaryData = [
  {
    title: "Total Revenue",
    value: "$124,589.00",
    change: "+18.2%",
    period: "vs last month",
    icon: DollarSign,
  },
  {
    title: "Paid Invoices",
    value: "287",
    change: "+12.5%",
    period: "vs last month",
    icon: FileText,
  },
  {
    title: "Active Clients",
    value: "48",
    change: "+4",
    period: "vs last month",
    icon: Users,
  },
  {
    title: "Average Invoice",
    value: "$2,341.00",
    change: "+8.1%",
    period: "vs last month",
    icon: TrendingUp,
  },
];

const monthlyData = [
  { month: "Jan", revenue: 12500, invoices: 45 },
  { month: "Feb", revenue: 18200, invoices: 52 },
  { month: "Mar", revenue: 15800, invoices: 48 },
  { month: "Apr", revenue: 21400, invoices: 61 },
  { month: "May", revenue: 19600, invoices: 57 },
  { month: "Jun", revenue: 23100, invoices: 64 },
];

const topClients = [
  { name: "Wayne Enterprises", revenue: 52100, invoices: 18 },
  { name: "Initech Solutions", revenue: 42300, invoices: 15 },
  { name: "Stark Industries", revenue: 31200, invoices: 10 },
  { name: "Acme Corporation", revenue: 28500, invoices: 12 },
  { name: "Globex Industries", revenue: 15600, invoices: 8 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-success mt-1">
                {item.change} {item.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${(data.revenue / 25000) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Clients by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div
                  key={client.name}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {client.invoices} invoices
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">
                      ${client.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">$124,589.00</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Tax Collected</p>
              <p className="text-2xl font-bold">$12,458.90</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Net Revenue</p>
              <p className="text-2xl font-bold">$112,130.10</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Paid</p>
                <p className="text-xs text-muted-foreground">287 invoices</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  $105,900
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Pending</p>
                <p className="text-xs text-muted-foreground">32 invoices</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: "10%" }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  $12,455
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Overdue</p>
                <p className="text-xs text-muted-foreground">8 invoices</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive rounded-full"
                    style={{ width: "5%" }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  $6,234
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
