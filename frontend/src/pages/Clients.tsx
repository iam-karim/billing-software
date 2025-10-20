import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, New York, NY 10001",
    totalInvoices: 12,
    totalRevenue: 28500.0,
  },
  {
    id: 2,
    name: "Globex Industries",
    email: "info@globex.com",
    phone: "+1 (555) 234-5678",
    address: "456 Corporate Ave, Los Angeles, CA 90001",
    totalInvoices: 8,
    totalRevenue: 15600.0,
  },
  {
    id: 3,
    name: "Initech Solutions",
    email: "hello@initech.com",
    phone: "+1 (555) 345-6789",
    address: "789 Tech Blvd, San Francisco, CA 94102",
    totalInvoices: 15,
    totalRevenue: 42300.0,
  },
  {
    id: 4,
    name: "Umbrella Corp",
    email: "contact@umbrella.com",
    phone: "+1 (555) 456-7890",
    address: "321 Industrial Way, Chicago, IL 60601",
    totalInvoices: 5,
    totalRevenue: 9800.0,
  },
  {
    id: 5,
    name: "Wayne Enterprises",
    email: "info@wayne.com",
    phone: "+1 (555) 567-8901",
    address: "654 Gotham Rd, Gotham City, NY 10002",
    totalInvoices: 18,
    totalRevenue: 52100.0,
  },
  {
    id: 6,
    name: "Stark Industries",
    email: "contact@stark.com",
    phone: "+1 (555) 678-9012",
    address: "987 Innovation Dr, Malibu, CA 90265",
    totalInvoices: 10,
    totalRevenue: 31200.0,
  },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client directory
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Company Name</Label>
                <Input id="client-name" placeholder="Acme Corporation" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Phone</Label>
                  <Input
                    id="client-phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-address">Address</Label>
                <Input
                  id="client-address"
                  placeholder="123 Business St, City, State ZIP"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT</Label>
                  <Input id="tax-id" placeholder="XX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Payment Terms (Days)</Label>
                  <Input
                    id="payment-terms"
                    type="number"
                    placeholder="30"
                    defaultValue="30"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Client</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{client.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="line-clamp-2">{client.address}</span>
              </div>
              <div className="pt-3 border-t space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Invoices</span>
                  <span className="font-medium">{client.totalInvoices}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">
                    ${client.totalRevenue.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
