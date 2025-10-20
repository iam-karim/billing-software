# Backend API Documentation

Complete backend implementation guide for the Multi-Tenant Invoice SaaS Application with Super Admin Portal.

## Technology Stack
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Region Support**: India (INR/GST) & Saudi Arabia (SAR/VAT)

---

## Database Schema

### 1. User Management

```prisma
enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  active
  suspended
  deleted
}

model User {
  id                String        @id @default(uuid())
  email             String        @unique
  passwordHash      String
  name              String
  company           String?
  status            UserStatus    @default(active)
  organizationId    String?
  lastLogin         DateTime?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  organization      Organization? @relation(fields: [organizationId], references: [id])
  roles             UserRole[]
  invoices          Invoice[]
  clients           Client[]
  products          Product[]
}

model UserRole {
  id        String   @id @default(uuid())
  userId    String
  role      UserRole
  assignedAt DateTime @default(now())
  assignedBy String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, role])
}
```

### 2. Organization & Plans

```prisma
model Organization {
  id              String            @id @default(uuid())
  name            String
  planId          String
  status          String            @default("active")
  taxRegistration String?           // GST/VAT number
  region          String            @default("IN") // IN, SA, US
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  plan            SubscriptionPlan  @relation(fields: [planId], references: [id])
  users           User[]
  invoices        Invoice[]
}

enum BillingPeriod {
  monthly
  yearly
}

model SubscriptionPlan {
  id                String          @id @default(uuid())
  name              String
  price             Decimal         @db.Decimal(10, 2)
  currency          String          @default("USD")
  billingPeriod     BillingPeriod
  features          String[]
  isActive          Boolean         @default(true)
  maxUsers          Int?
  maxInvoices       Int?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  organizations     Organization[]
}
```

### 3. Invoice System

```prisma
model Invoice {
  id              String          @id @default(uuid())
  invoiceNumber   String          @unique
  clientId        String
  userId          String
  organizationId  String
  issueDate       DateTime
  dueDate         DateTime
  subtotal        Decimal         @db.Decimal(10, 2)
  taxAmount       Decimal         @db.Decimal(10, 2)
  taxRate         Decimal         @db.Decimal(5, 2)
  taxType         String          // GST, VAT, Sales Tax
  total           Decimal         @db.Decimal(10, 2)
  currency        String          @default("USD")
  status          String          @default("unpaid")
  notes           String?
  region          String          // IN, SA, US
  taxBreakdown    Json?           // CGST/SGST/IGST for India
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  client          Client          @relation(fields: [clientId], references: [id])
  user            User            @relation(fields: [userId], references: [id])
  organization    Organization    @relation(fields: [organizationId], references: [id])
  items           InvoiceItem[]
}

model InvoiceItem {
  id          String    @id @default(uuid())
  invoiceId   String
  description String
  quantity    Decimal   @db.Decimal(10, 2)
  rate        Decimal   @db.Decimal(10, 2)
  amount      Decimal   @db.Decimal(10, 2)
  taxable     Boolean   @default(true)
  invoice     Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
}

model Client {
  id              String    @id @default(uuid())
  name            String
  email           String
  phone           String?
  company         String?
  address         String?
  taxNumber       String?   // GST/VAT number
  region          String?
  userId          String
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  user            User      @relation(fields: [userId], references: [id])
  invoices        Invoice[]
}
```

### 4. System Logs

```prisma
model SystemLog {
  id          String    @id @default(uuid())
  action      String
  userId      String?
  userName    String?
  metadata    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime  @default(now())
  
  @@index([action])
  @@index([userId])
  @@index([createdAt])
}
```

### 5. System Settings

```prisma
model SystemSettings {
  id                String   @id @default(uuid())
  systemName        String   @default("InvoicePro")
  supportEmail      String
  defaultCurrency   String   @default("USD")
  defaultTaxRate    Decimal  @db.Decimal(5, 2) @default(0)
  dateFormat        String   @default("MMM dd, yyyy")
  timeZone          String   @default("UTC")
  updatedAt         DateTime @updatedAt
}
```

---

## API Endpoints

### Authentication

#### POST /api/auth/register
Register new user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "company": "ABC Corp"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "SUPER_ADMIN" // or USER, ADMIN
  }
}
```

#### GET /api/auth/me
Get current user (requires auth token)

---

### Super Admin - Analytics

#### GET /api/super-admin/analytics
System-wide statistics
```json
Response:
{
  "totalUsers": 1523,
  "totalOrganizations": 45,
  "totalInvoices": 8932,
  "monthlyRevenue": 125000,
  "activeUsers": 1234,
  "pendingPayments": 15000
}
```

#### GET /api/super-admin/analytics/revenue?period=12m
Revenue chart data
```json
Response:
{
  "data": [
    { "month": "Jan 2024", "revenue": 10000, "invoices": 120 },
    { "month": "Feb 2024", "revenue": 12000, "invoices": 145 }
  ]
}
```

#### GET /api/super-admin/analytics/plans
Plan distribution
```json
Response:
{
  "distribution": [
    { "name": "Basic", "count": 20, "revenue": 2000 },
    { "name": "Pro", "count": 15, "revenue": 7500 }
  ]
}
```

---

### Super Admin - User Management

#### GET /api/super-admin/users?page=1&limit=20&search=&role=&status=
List all users with filters

#### GET /api/super-admin/users/:id
Get user details

#### PUT /api/super-admin/users/:id/role
Update user role
```json
Request:
{
  "role": "ADMIN"
}
```

#### PUT /api/super-admin/users/:id/status
Update user status
```json
Request:
{
  "status": "suspended"
}
```

#### DELETE /api/super-admin/users/:id
Soft delete user

#### POST /api/super-admin/users/:id/reset-password
Send password reset email

---

### Super Admin - Organizations

#### GET /api/super-admin/organizations?page=1&limit=20&search=
List all organizations

#### GET /api/super-admin/organizations/:id
Get organization details with users and invoices

#### PUT /api/super-admin/organizations/:id
Update organization
```json
Request:
{
  "name": "Updated Name",
  "planId": "plan_uuid"
}
```

#### PUT /api/super-admin/organizations/:id/plan
Change subscription plan
```json
Request:
{
  "planId": "new_plan_uuid"
}
```

#### POST /api/super-admin/organizations/:id/suspend
Suspend organization

#### POST /api/super-admin/organizations/:id/activate
Activate organization

---

### Super Admin - Subscription Plans

#### GET /api/super-admin/plans
List all plans

#### POST /api/super-admin/plans
Create new plan
```json
Request:
{
  "name": "Enterprise",
  "price": 99.99,
  "currency": "USD",
  "billingPeriod": "monthly",
  "features": ["Unlimited invoices", "10 users", "Priority support"],
  "isActive": true
}
```

#### PUT /api/super-admin/plans/:id
Update plan

#### DELETE /api/super-admin/plans/:id
Delete plan (if no organizations using it)

#### PATCH /api/super-admin/plans/:id/toggle
Toggle plan active status

---

### Super Admin - System Logs

#### GET /api/super-admin/logs?page=1&limit=50&action=&userId=&startDate=&endDate=
Get system logs with filters

#### GET /api/super-admin/logs/export?format=csv
Export logs as CSV

---

### Super Admin - Settings

#### GET /api/super-admin/settings
Get system settings

#### PUT /api/super-admin/settings
Update system settings
```json
Request:
{
  "systemName": "InvoicePro",
  "supportEmail": "support@invoicepro.com",
  "defaultCurrency": "USD",
  "defaultTaxRate": 0,
  "dateFormat": "MM/dd/yyyy",
  "timeZone": "America/New_York"
}
```

---

### User - Invoices

#### GET /api/invoices?page=1&status=&search=
Get user's invoices

#### POST /api/invoices
Create invoice
```json
Request:
{
  "clientId": "client_uuid",
  "issueDate": "2024-01-01",
  "dueDate": "2024-01-31",
  "items": [
    {
      "description": "Web Development",
      "quantity": 10,
      "rate": 50,
      "taxable": true
    }
  ],
  "notes": "Payment terms: Net 30",
  "region": "IN" // Auto-calculates GST for India
}

Response:
{
  "id": "invoice_uuid",
  "invoiceNumber": "INV-2024-001",
  "subtotal": 500,
  "taxAmount": 90, // 18% GST
  "taxBreakdown": {
    "cgst": 45,
    "sgst": 45
  },
  "total": 590,
  "currency": "INR"
}
```

---

## Payment Gateway Integration

### Supported Payment Gateways by Region

| Region | Gateway | Currency | Tax System |
|--------|---------|----------|------------|
| India (IN) | Razorpay | INR | GST (18%) - CGST/SGST/IGST |
| Saudi Arabia (SA) | Stripe, Moyasar | SAR | VAT (15%) |
| USA (US) | Stripe | USD | Sales Tax (varies by state) |
| Global | Stripe | Multiple | Configurable |

### Payment Endpoints

#### GET /api/payments/gateways?region={region}
Get available payment gateways for region
```json
Response:
{
  "gateways": [
    {
      "id": "razorpay",
      "name": "Razorpay",
      "supportedCountries": ["IN"],
      "supportedCurrencies": ["INR"]
    },
    {
      "id": "stripe",
      "name": "Stripe",
      "supportedCountries": ["US", "SA", "IN"],
      "supportedCurrencies": ["USD", "SAR", "INR", "EUR", "GBP"]
    }
  ]
}
```

#### POST /api/payments/create-intent
Create payment intent for plan purchase
```json
Request:
{
  "planId": "plan_uuid",
  "currency": "INR",
  "amount": 999,
  "billingPeriod": "monthly",
  "paymentGateway": "razorpay"
}

Response:
{
  "id": "payment_intent_uuid",
  "amount": 999,
  "currency": "INR",
  "status": "requires_payment",
  "clientSecret": "pi_secret_key",
  "taxAmount": 179.82,
  "taxBreakdown": {
    "cgst": 89.91,
    "sgst": 89.91
  },
  "total": 1178.82
}
```

#### POST /api/payments/confirm
Confirm payment
```json
Request:
{
  "paymentIntentId": "payment_intent_uuid",
  "paymentMethodId": "pm_card_visa"
}

Response:
{
  "status": "succeeded",
  "subscriptionId": "sub_uuid",
  "invoiceId": "inv_uuid",
  "receiptUrl": "https://..."
}
```

#### GET /api/payments/history?page=1&limit=20
Get payment history

#### GET /api/payments/:id/invoice
Download payment invoice (PDF)

#### POST /api/payments/subscription/:orgId/cancel
Cancel subscription

#### PUT /api/payments/subscription/:orgId/payment-method
Update payment method

---

## Tax Calculation Logic

### India (GST)
```javascript
// Intra-state (within same state)
CGST = (Subtotal * GST_Rate) / 2
SGST = (Subtotal * GST_Rate) / 2
Total = Subtotal + CGST + SGST

// Inter-state (different states)
IGST = Subtotal * GST_Rate
Total = Subtotal + IGST

// Default GST Rates: 5%, 12%, 18%, 28%
```

### Saudi Arabia (VAT)
```javascript
VAT = Subtotal * 15%
Total = Subtotal + VAT
```

### Tax Implementation Example (Node.js)
```javascript
const calculateTax = (amount, region, isInterState = false) => {
  const taxRates = {
    IN: 18,
    SA: 15,
    US: 0, // State-specific
  };

  const rate = taxRates[region] || 0;
  const taxAmount = (amount * rate) / 100;

  if (region === 'IN') {
    if (isInterState) {
      return {
        subtotal: amount,
        igst: taxAmount,
        total: amount + taxAmount,
        breakdown: { IGST: taxAmount }
      };
    } else {
      return {
        subtotal: amount,
        cgst: taxAmount / 2,
        sgst: taxAmount / 2,
        total: amount + taxAmount,
        breakdown: { CGST: taxAmount / 2, SGST: taxAmount / 2 }
      };
    }
  } else if (region === 'SA') {
    return {
      subtotal: amount,
      vat: taxAmount,
      total: amount + taxAmount,
      breakdown: { VAT: taxAmount }
    };
  }

  return {
    subtotal: amount,
    tax: taxAmount,
    total: amount + taxAmount,
    breakdown: { Tax: taxAmount }
  };
};
```

---

## Multi-Language Support

### Supported Languages
- English (en) - Default
- Arabic (ar) - RTL support for Saudi Arabia
- Hindi (hi) - India

### Adding New Languages
1. Create translation file: `frontend/src/i18n/locales/{locale}.json`
2. Add to i18n config: `frontend/src/i18n/config.ts`
3. Update LocaleContext supported languages
4. Add to backend locale support (optional)

### Translation Structure
```json
{
  "common": { "save": "Save", "cancel": "Cancel" },
  "dashboard": { "title": "Dashboard" },
  "invoices": { "create": "Create Invoice" }
}
```

---

## Payment Gateway Implementation

### Razorpay (India)
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
const order = await razorpay.orders.create({
  amount: totalInPaise,
  currency: 'INR',
  receipt: `receipt_${Date.now()}`,
  notes: { planId, userId }
});

// Verify payment
const crypto = require('crypto');
const generated_signature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(order.id + '|' + payment.id)
  .digest('hex');

if (generated_signature === signature) {
  // Payment verified
}
```

### Stripe (Global)
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalInCents,
  currency: 'sar', // or usd, inr
  metadata: { planId, userId }
});

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
});
```

---

## Webhook Handlers

### Razorpay Webhooks
```javascript
app.post('/webhooks/razorpay', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  
  const isValid = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET
  );

  if (isValid) {
    const event = req.body.event;
    
    switch(event) {
      case 'payment.captured':
        await handlePaymentSuccess(req.body.payload);
        break;
      case 'payment.failed':
        await handlePaymentFailure(req.body.payload);
        break;
    }
  }

  res.json({ status: 'ok' });
});
```

### Stripe Webhooks
```javascript
app.post('/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
  }

  res.json({ received: true });
});
```

---

## Environment Variables (Complete List)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/invoicepro"

# JWT
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRY="7d"

# Server
PORT=3000
NODE_ENV="development"

# Payment Gateways
## Razorpay (India)
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
RAZORPAY_WEBHOOK_SECRET="..."

## Stripe (Global)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Region Defaults
DEFAULT_REGION="IN"
DEFAULT_CURRENCY="INR"
DEFAULT_TAX_RATE=18

# Frontend URL (for redirects)
FRONTEND_URL="http://localhost:5173"
```

---

## Security Implementation

### Role-Based Access Control
```javascript
// Middleware: requireRole(['SUPER_ADMIN'])
const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    const userRoles = await UserRole.findMany({
      where: { userId: req.user.id }
    });
    
    const hasPermission = userRoles.some(ur => 
      allowedRoles.includes(ur.role)
    );
    
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
};
```

### Audit Logging
```javascript
const logAction = async (action, userId, metadata) => {
  await SystemLog.create({
    data: {
      action,
      userId,
      userName: user.name,
      metadata,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    }
  });
};
```

---

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/invoicepro"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRY="7d"
PORT=3000

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Region Defaults
DEFAULT_REGION="IN"
DEFAULT_CURRENCY="INR"
DEFAULT_TAX_RATE=18
```

---

## Installation & Setup

```bash
# 1. Install dependencies
npm install express prisma @prisma/client bcrypt jsonwebtoken cors dotenv

# 2. Initialize Prisma
npx prisma init

# 3. Create database schema (copy schema from above)
# Edit prisma/schema.prisma

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Seed super admin
npx ts-node prisma/seed.ts

# 6. Start server
npm run dev
```

---

## Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const superAdminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200 // Higher limit for super admin
});

app.use('/api/', limiter);
app.use('/api/super-admin', superAdminLimiter);
```
