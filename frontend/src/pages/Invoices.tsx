import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, Download, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: 2500.0,
    status: "paid",
    date: "2025-01-15",
    dueDate: "2025-02-15",
  },
  {
    id: "INV-002",
    client: "Globex Industries",
    amount: 1800.0,
    status: "pending",
    date: "2025-01-14",
    dueDate: "2025-02-14",
  },
  {
    id: "INV-003",
    client: "Initech Solutions",
    amount: 3200.0,
    status: "paid",
    date: "2025-01-13",
    dueDate: "2025-02-13",
  },
  {
    id: "INV-004",
    client: "Umbrella Corp",
    amount: 950.0,
    status: "overdue",
    date: "2025-01-10",
    dueDate: "2025-01-25",
  },
  {
    id: "INV-005",
    client: "Wayne Enterprises",
    amount: 4100.0,
    status: "paid",
    date: "2025-01-09",
    dueDate: "2025-02-09",
  },
  {
    id: "INV-006",
    client: "Stark Industries",
    amount: 2750.0,
    status: "pending",
    date: "2025-01-08",
    dueDate: "2025-02-08",
  },
];

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your invoices
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corporation</SelectItem>
                      <SelectItem value="globex">Globex Industries</SelectItem>
                      <SelectItem value="initech">Initech Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Invoice Number</Label>
                  <Input
                    id="invoice-number"
                    placeholder="INV-007"
                    defaultValue="INV-007"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Invoice Date</Label>
                  <Input id="date" type="date" defaultValue="2025-01-20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" defaultValue="2025-02-20" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Line Items</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <Input placeholder="Description" />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" placeholder="Qty" defaultValue="1" />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Rate"
                        defaultValue="0.00"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="Tax %" defaultValue="0" />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <Button variant="ghost" size="sm">
                        ×
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    + Add Line Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subtotal">Subtotal</Label>
                  <Input
                    id="subtotal"
                    placeholder="$0.00"
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total">Total</Label>
                  <Input
                    id="total"
                    placeholder="$0.00"
                    readOnly
                    className="bg-muted font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes or payment terms..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Save Invoice</Button>
                <Button variant="outline" className="flex-1">
                  Save & Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
              <div className="col-span-2">Invoice #</div>
              <div className="col-span-3">Client</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1">Status</div>
            </div>

            {/* Rows */}
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors rounded-lg"
              >
                <div className="md:col-span-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary md:hidden" />
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="md:col-span-3 flex items-center text-sm">
                  {invoice.client}
                </div>
                <div className="md:col-span-2 flex items-center text-sm text-muted-foreground">
                  {invoice.date}
                </div>
                <div className="md:col-span-2 flex items-center text-sm text-muted-foreground">
                  {invoice.dueDate}
                </div>
                <div className="md:col-span-2 flex items-center font-medium">
                  ${invoice.amount.toFixed(2)}
                </div>
                <div className="md:col-span-1 flex items-center gap-2">
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
    </div>
  );
}
