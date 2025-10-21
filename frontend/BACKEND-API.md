# Backend API Documentation - Invoice Management System
## Complete TypeScript + MongoDB Implementation

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Database Schema (MongoDB)](#database-schema-mongodb)
3. [Authentication & Authorization](#authentication--authorization)
4. [API Endpoints - Complete Reference](#api-endpoints---complete-reference)
5. [Payment Gateway Integration](#payment-gateway-integration)
6. [Tax Calculation System](#tax-calculation-system)
7. [Analytics & Dynamic Reports](#analytics--dynamic-reports)
8. [Multi-Language & Currency System](#multi-language--currency-system)
9. [Environment Variables](#environment-variables)
10. [Error Handling](#error-handling)
11. [Data Points & Calculations](#data-points--calculations)

---

## Technology Stack

### Backend Framework
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.x
- **Framework**: Express.js 4.x
- **Database**: MongoDB 6.x
- **ODM**: Mongoose 8.x

### Essential Packages
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "express-validator": "^7.0.0",
    "helmet": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "stripe": "^14.0.0",
    "razorpay": "^2.9.0",
    "winston": "^3.11.0",
    "rate-limiter-flexible": "^5.0.0",
    "zod": "^3.22.0",
    "dayjs": "^1.11.0",
    "nodemailer": "^6.9.0"
  }
}
```

---

## Database Schema (MongoDB)

### 1. Users Collection
```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // hashed with bcrypt
  organizationId: ObjectId;
  status: 'active' | 'suspended' | 'inactive';
  emailVerified: boolean;
  phone?: string;
  avatar?: string;
  locale: 'en' | 'ar' | 'hi'; // Language preference
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ organizationId: 1 });
db.users.createIndex({ status: 1 });
```

### 2. User Roles Collection
```typescript
interface IUserRole {
  _id: ObjectId;
  userId: ObjectId;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  organizationId?: ObjectId; // null for SUPER_ADMIN
  createdAt: Date;
}

// Indexes
db.userRoles.createIndex({ userId: 1, organizationId: 1 }, { unique: true });
db.userRoles.createIndex({ role: 1 });
```

### 3. Organizations Collection
```typescript
interface IOrganization {
  _id: ObjectId;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country: string; // 'US', 'IN', 'SA'
  taxId?: string; // GST for India, VAT for Saudi
  logo?: string;
  status: 'active' | 'suspended' | 'trial';
  subscriptionId?: ObjectId;
  settings: {
    currency: 'USD' | 'INR' | 'SAR';
    locale: 'en' | 'ar' | 'hi';
    timezone: string;
    dateFormat: string;
    taxRate: number;
    taxType: 'GST' | 'VAT' | 'SALES_TAX';
  };
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.organizations.createIndex({ email: 1 }, { unique: true });
db.organizations.createIndex({ status: 1 });
db.organizations.createIndex({ country: 1 });
```

### 4. Subscription Plans Collection
```typescript
interface ISubscriptionPlan {
  _id: ObjectId;
  name: string;
  description: string;
  price: number; // Base price in USD
  currency: 'USD' | 'INR' | 'SAR';
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    maxUsers: number;
    maxInvoices: number;
    maxClients: number;
    maxStorage: number; // in MB
  };
  isActive: boolean;
  stripePriceId?: string;
  razorpayPlanId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.subscriptionPlans.createIndex({ isActive: 1 });
db.subscriptionPlans.createIndex({ currency: 1 });
```

### 5. Subscriptions Collection
```typescript
interface ISubscription {
  _id: ObjectId;
  organizationId: ObjectId;
  planId: ObjectId;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentGateway: 'stripe' | 'razorpay';
  gatewaySubscriptionId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.subscriptions.createIndex({ organizationId: 1 });
db.subscriptions.createIndex({ status: 1 });
db.subscriptions.createIndex({ endDate: 1 });
```

### 6. Clients Collection
```typescript
interface IClient {
  _id: ObjectId;
  organizationId: ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string; // GST/VAT number
  paymentTerms?: string;
  status: 'active' | 'inactive';
  totalInvoiced: number;
  totalPaid: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.clients.createIndex({ organizationId: 1 });
db.clients.createIndex({ email: 1, organizationId: 1 });
db.clients.createIndex({ status: 1 });
```

### 7. Products Collection
```typescript
interface IProduct {
  _id: ObjectId;
  organizationId: ObjectId;
  name: string;
  description?: string;
  sku?: string;
  price: number;
  currency: 'USD' | 'INR' | 'SAR';
  taxable: boolean;
  taxRate?: number;
  category?: string;
  isActive: boolean;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.products.createIndex({ organizationId: 1 });
db.products.createIndex({ sku: 1, organizationId: 1 }, { unique: true, sparse: true });
db.products.createIndex({ isActive: 1 });
```

### 8. Invoices Collection
```typescript
interface IInvoice {
  _id: ObjectId;
  organizationId: ObjectId;
  invoiceNumber: string; // Auto-generated: INV-2024-0001
  clientId: ObjectId;
  issueDate: Date;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: Array<{
    productId?: ObjectId;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
    taxable: boolean;
  }>;
  subtotal: number;
  taxDetails: {
    type: 'GST' | 'VAT' | 'SALES_TAX';
    rate: number;
    amount: number;
    breakdown?: {
      cgst?: number;
      sgst?: number;
      igst?: number;
    };
  };
  total: number;
  currency: 'USD' | 'INR' | 'SAR';
  notes?: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paidAmount: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.invoices.createIndex({ organizationId: 1 });
db.invoices.createIndex({ invoiceNumber: 1 }, { unique: true });
db.invoices.createIndex({ clientId: 1 });
db.invoices.createIndex({ status: 1 });
db.invoices.createIndex({ dueDate: 1 });
db.invoices.createIndex({ issueDate: -1 });
```

### 9. Payments Collection
```typescript
interface IPayment {
  _id: ObjectId;
  organizationId: ObjectId;
  invoiceId?: ObjectId;
  subscriptionId?: ObjectId;
  amount: number;
  currency: 'USD' | 'INR' | 'SAR';
  paymentGateway: 'stripe' | 'razorpay' | 'manual';
  gatewayTransactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet' | 'bank_transfer';
  metadata?: Record<string, any>;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
db.payments.createIndex({ organizationId: 1 });
db.payments.createIndex({ invoiceId: 1 });
db.payments.createIndex({ subscriptionId: 1 });
db.payments.createIndex({ status: 1 });
db.payments.createIndex({ gatewayTransactionId: 1 });
```

### 10. System Logs Collection
```typescript
interface ISystemLog {
  _id: ObjectId;
  userId?: ObjectId;
  organizationId?: ObjectId;
  action: string; // 'user.login', 'invoice.create', 'payment.success'
  resource: string; // 'user', 'invoice', 'payment'
  resourceId?: ObjectId;
  method: string; // 'GET', 'POST', 'PUT', 'DELETE'
  endpoint: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'error';
  errorMessage?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Indexes
db.systemLogs.createIndex({ organizationId: 1, createdAt: -1 });
db.systemLogs.createIndex({ userId: 1, createdAt: -1 });
db.systemLogs.createIndex({ action: 1 });
db.systemLogs.createIndex({ createdAt: -1 });
db.systemLogs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL
```

### 11. System Settings Collection
```typescript
interface ISystemSettings {
  _id: ObjectId;
  key: string; // unique identifier
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  updatedBy?: ObjectId;
  updatedAt: Date;
}

// Indexes
db.systemSettings.createIndex({ key: 1 }, { unique: true });
```

---

## Authentication & Authorization

### JWT Token Structure
```typescript
interface JWTPayload {
  userId: string;
  organizationId?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  email: string;
  iat: number;
  exp: number;
}
```

### Authentication Endpoints

#### POST /api/auth/register
Register new user and organization (self-signup)

**Request:**
```typescript
{
  name: string;
  email: string;
  password: string;
  company?: string;
  country: 'US' | 'IN' | 'SA';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      organizationId: string;
    };
    organization: {
      id: string;
      name: string;
      status: 'trial';
    };
    token: string;
  };
}
```

#### POST /api/auth/login
User login

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      organizationId: string;
    };
    token: string;
    expiresIn: number;
  };
}
```

#### POST /api/auth/logout
Logout user (blacklist token)

**Headers:** `Authorization: Bearer <token>`

**Response:**
```typescript
{
  success: true;
  message: 'Logged out successfully';
}
```

#### GET /api/auth/me
Get current user profile

**Headers:** `Authorization: Bearer <token>`

**Response:**
```typescript
{
  success: true;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    organizationId: string;
    organization: {
      name: string;
      currency: string;
      locale: string;
    };
  };
}
```

---

## API Endpoints - Complete Reference

### User Management

#### GET /api/users
Get users (with filters)

**Headers:** `Authorization: Bearer <token>`

**Query Params:**
```typescript
{
  page?: number; // default: 1
  limit?: number; // default: 20
  search?: string;
  role?: 'ADMIN' | 'USER';
  status?: 'active' | 'suspended' | 'inactive';
  organizationId?: string; // SUPER_ADMIN only
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      organizationId: string;
      createdAt: Date;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

#### POST /api/users
Create new user (ADMIN only)

**Request:**
```typescript
{
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  phone?: string;
}
```

#### PUT /api/users/:id
Update user

#### DELETE /api/users/:id
Delete user (soft delete)

#### POST /api/users/:id/reset-password
Reset user password (ADMIN only)

---

### Organization Management

#### GET /api/organizations
Get all organizations (SUPER_ADMIN only)

**Query Params:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'suspended' | 'trial';
  country?: 'US' | 'IN' | 'SA';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    organizations: Array<{
      id: string;
      name: string;
      email: string;
      country: string;
      status: string;
      subscriptionPlan?: string;
      userCount: number;
      invoiceCount: number;
      totalRevenue: number;
      createdAt: Date;
    }>;
    pagination: { ... };
  };
}
```

#### GET /api/organizations/:id
Get organization details

#### PUT /api/organizations/:id
Update organization

#### POST /api/organizations/:id/suspend
Suspend organization (SUPER_ADMIN only)

#### POST /api/organizations/:id/activate
Activate organization (SUPER_ADMIN only)

---

### Subscription Plans

#### GET /api/plans
Get all subscription plans

**Query Params:**
```typescript
{
  currency?: 'USD' | 'INR' | 'SAR';
  billingCycle?: 'monthly' | 'yearly';
  isActive?: boolean;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    plans: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      currency: string;
      billingCycle: string;
      features: string[];
      limits: {
        maxUsers: number;
        maxInvoices: number;
        maxClients: number;
        maxStorage: number;
      };
    }>;
  };
}
```

#### POST /api/plans
Create subscription plan (SUPER_ADMIN only)

#### PUT /api/plans/:id
Update plan (SUPER_ADMIN only)

#### DELETE /api/plans/:id
Delete plan (SUPER_ADMIN only)

#### POST /api/plans/:id/toggle-status
Activate/deactivate plan

---

### Client Management

#### GET /api/clients
Get all clients

**Query Params:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  sortBy?: 'name' | 'createdAt' | 'totalInvoiced';
  sortOrder?: 'asc' | 'desc';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    clients: Array<{
      id: string;
      name: string;
      email: string;
      company?: string;
      totalInvoiced: number;
      totalPaid: number;
      outstandingBalance: number;
      invoiceCount: number;
      status: string;
      createdAt: Date;
    }>;
    pagination: { ... };
  };
}
```

#### POST /api/clients
Create new client

#### PUT /api/clients/:id
Update client

#### DELETE /api/clients/:id
Delete client

#### GET /api/clients/:id/invoices
Get client's invoices

---

### Invoice Management

#### GET /api/invoices
Get all invoices

**Query Params:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
  clientId?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentStatus?: 'unpaid' | 'partial' | 'paid';
  fromDate?: string; // ISO date
  toDate?: string; // ISO date
  sortBy?: 'invoiceNumber' | 'issueDate' | 'dueDate' | 'total';
  sortOrder?: 'asc' | 'desc';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    invoices: Array<{
      id: string;
      invoiceNumber: string;
      client: {
        id: string;
        name: string;
        email: string;
      };
      issueDate: Date;
      dueDate: Date;
      status: string;
      paymentStatus: string;
      subtotal: number;
      taxAmount: number;
      total: number;
      paidAmount: number;
      balance: number;
      currency: string;
    }>;
    summary: {
      totalInvoiced: number;
      totalPaid: number;
      totalOutstanding: number;
      count: number;
    };
    pagination: { ... };
  };
}
```

#### POST /api/invoices
Create invoice (with automatic calculations)

**Request:**
```typescript
{
  clientId: string;
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  items: Array<{
    productId?: string;
    description: string;
    quantity: number;
    rate: number;
    taxable: boolean;
  }>;
  notes?: string;
  status?: 'draft' | 'sent';
}
```

**Auto-calculations performed:**
- Invoice number auto-generated
- Subtotal = sum of all item amounts
- Tax calculated based on organization's country and tax settings
- Total = subtotal + tax

#### PUT /api/invoices/:id
Update invoice (only if status is 'draft')

#### DELETE /api/invoices/:id
Delete invoice (only if status is 'draft')

#### POST /api/invoices/:id/send
Send invoice to client (email notification)

#### POST /api/invoices/:id/mark-paid
Mark invoice as paid

#### GET /api/invoices/:id/pdf
Generate and download invoice PDF

---

### Payment Management

#### GET /api/payments
Get payment history

#### POST /api/payments/create-intent
Create payment intent (for Stripe/Razorpay)

#### POST /api/payments/confirm
Confirm payment (webhook from gateway)

#### POST /api/payments/webhook/stripe
Stripe webhook endpoint

#### POST /api/payments/webhook/razorpay
Razorpay webhook endpoint

---

### Analytics & Dynamic Reports

#### GET /api/analytics/dashboard
Get dashboard analytics

**Query Params:**
```typescript
{
  period?: '7d' | '30d' | '90d' | '1y';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    overview: {
      totalRevenue: number;
      totalInvoices: number;
      paidInvoices: number;
      pendingInvoices: number;
      totalClients: number;
      activeClients: number;
    };
    revenueByMonth: Array<{
      month: string;
      revenue: number;
      invoiceCount: number;
    }>;
    topClients: Array<{
      clientId: string;
      clientName: string;
      totalInvoiced: number;
      invoiceCount: number;
    }>;
    paymentStatusDistribution: {
      paid: number;
      partial: number;
      unpaid: number;
    };
    overdueInvoices: {
      count: number;
      totalAmount: number;
    };
  };
}
```

#### GET /api/analytics/revenue
Revenue analytics with dynamic calculations

#### GET /api/analytics/tax-report
Tax report for accounting

#### GET /api/analytics/client-report
Client-wise revenue report

---

### Super Admin Endpoints

#### GET /api/super-admin/stats
System-wide statistics

#### GET /api/super-admin/logs
System logs

#### GET /api/super-admin/revenue-chart
Revenue chart data

#### GET /api/super-admin/settings
Get system settings

#### PUT /api/super-admin/settings
Update system settings

---

## Payment Gateway Integration

### Stripe Integration

#### Configuration
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
```

#### Create Payment Intent
```typescript
async function createStripePayment(amount: number, currency: string) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: true },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}
```

### Razorpay Integration (for India)

#### Configuration
```typescript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
```

#### Create Order
```typescript
async function createRazorpayOrder(amount: number, currency: string) {
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: currency,
    receipt: `receipt_${Date.now()}`,
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
}
```

---

## Tax Calculation System

### India GST Calculation
```typescript
interface GSTBreakdown {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

function calculateIndiaGST(
  subtotal: number,
  gstRate: number,
  isInterState: boolean
): GSTBreakdown {
  const gstAmount = (subtotal * gstRate) / 100;

  if (isInterState) {
    // Interstate: IGST
    return {
      subtotal,
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      total: subtotal + gstAmount,
    };
  } else {
    // Intrastate: CGST + SGST (split equally)
    return {
      subtotal,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      igst: 0,
      total: subtotal + gstAmount,
    };
  }
}
```

### Saudi Arabia VAT Calculation
```typescript
interface VATBreakdown {
  subtotal: number;
  vat: number;
  total: number;
}

function calculateSaudiVAT(subtotal: number, vatRate: number = 15): VATBreakdown {
  const vatAmount = (subtotal * vatRate) / 100;

  return {
    subtotal,
    vat: vatAmount,
    total: subtotal + vatAmount,
  };
}
```

---

## Data Points & Calculations

### Dynamic Calculations Performed by Backend

1. **Invoice Calculations**
   - Subtotal = Sum of all item amounts
   - Tax calculation based on organization country
   - Total = Subtotal + Tax
   - Balance = Total - Paid Amount

2. **Client Metrics**
   - Total Invoiced (aggregate from all invoices)
   - Total Paid (aggregate from all payments)
   - Outstanding Balance (Total Invoiced - Total Paid)
   - Average Invoice Value
   - Payment Rate (Total Paid / Total Invoiced * 100)

3. **Revenue Analytics**
   - Monthly Revenue Trends
   - Year-over-Year Growth
   - Revenue by Payment Method
   - Revenue by Client
   - Revenue by Product/Service

4. **Super Admin Metrics**
   - Total Organizations Count
   - Active vs Suspended Organizations
   - Total System Revenue
   - Plan Distribution
   - User Activity Metrics
   - Invoice Volume Trends

5. **Tax Calculations**
   - GST (India): CGST + SGST or IGST
   - VAT (Saudi Arabia): 15%
   - Sales Tax (US): Configurable by state
   - Tax Reports for Accounting

---

## Environment Variables

```bash
# Server
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000

# Database
MONGODB_URI=mongodb://localhost:27017/invoice-system
MONGODB_DB_NAME=invoice_system

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Payment Gateways - Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Payment Gateways - Razorpay (India)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxx

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourapp.com

# Currency API
EXCHANGE_RATE_API_KEY=xxxxxxxxxxxxx

# CORS
CORS_ORIGIN=http://localhost:5173,https://yourapp.com
```

---

## Error Handling

### Standard Error Response Format
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string;
  };
}
```

### Error Codes
- `UNAUTHORIZED` - Authentication failed
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `PAYMENT_FAILED` - Payment processing failed
- `INTERNAL_ERROR` - Server error

---

**End of Documentation**

This backend is designed to work seamlessly with your React + TypeScript frontend, providing all necessary data points for dynamic rendering, calculations, and multi-region support.
