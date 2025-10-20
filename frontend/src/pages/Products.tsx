import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const products = [
  {
    id: 1,
    name: "Web Development",
    sku: "WEB-DEV-001",
    description: "Custom web development services",
    price: 150.0,
    taxRate: 10,
    category: "Services",
  },
  {
    id: 2,
    name: "Mobile App Development",
    sku: "MOB-DEV-001",
    description: "iOS and Android app development",
    price: 200.0,
    taxRate: 10,
    category: "Services",
  },
  {
    id: 3,
    name: "UI/UX Design",
    sku: "DES-UX-001",
    description: "User interface and experience design",
    price: 100.0,
    taxRate: 10,
    category: "Services",
  },
  {
    id: 4,
    name: "SEO Optimization",
    sku: "SEO-OPT-001",
    description: "Search engine optimization services",
    price: 75.0,
    taxRate: 10,
    category: "Services",
  },
  {
    id: 5,
    name: "Content Writing",
    sku: "CON-WRT-001",
    description: "Professional content writing",
    price: 50.0,
    taxRate: 10,
    category: "Services",
  },
  {
    id: 6,
    name: "Cloud Hosting",
    sku: "CLO-HOS-001",
    description: "Monthly cloud hosting package",
    price: 99.0,
    taxRate: 18,
    category: "Subscription",
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Products & Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product/Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product/Service Name</Label>
                <Input id="product-name" placeholder="Web Development" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="WEB-DEV-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Services" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the product or service..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    placeholder="10"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Product</Button>
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.sku}
                  </p>
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax Rate</span>
                  <span className="font-medium">{product.taxRate}%</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                Edit Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
