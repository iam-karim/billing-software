import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    name: "Invoices Sent",
    value: "124",
    change: "+12 from last month",
    icon: FileText,
    trend: "up",
  },
  {
    name: "Active Clients",
    value: "48",
    change: "+4 from last month",
    icon: Users,
    trend: "up",
  },
  {
    name: "Pending Payments",
    value: "$12,234.00",
    change: "5 invoices overdue",
    icon: Clock,
    trend: "neutral",
  },
];

const recentInvoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: "$2,500.00",
    status: "paid",
    date: "2025-01-15",
  },
  {
    id: "INV-002",
    client: "Globex Industries",
    amount: "$1,800.00",
    status: "pending",
    date: "2025-01-14",
  },
  {
    id: "INV-003",
    client: "Initech Solutions",
    amount: "$3,200.00",
    status: "paid",
    date: "2025-01-13",
  },
  {
    id: "INV-004",
    client: "Umbrella Corp",
    amount: "$950.00",
    status: "overdue",
    date: "2025-01-10",
  },
  {
    id: "INV-005",
    client: "Wayne Enterprises",
    amount: "$4,100.00",
    status: "paid",
    date: "2025-01-09",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name || 'User'}!{user?.company && ` · ${user.company}`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{invoice.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.id} • {invoice.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {invoice.amount}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-success/10 text-success"
                          : invoice.status === "pending"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Create New Invoice</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <Users className="h-5 w-5" />
              <span className="font-medium">Add New Client</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">View Reports</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Mark Payments Received</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
