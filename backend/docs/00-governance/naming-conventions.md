# Naming Conventions

> Version: 1.0.0
>
> Status: Approved
>
> Owner: Infoogle Software Solutions LLP
>
> Product: InvoicePro
>
> Last Updated: 25 June 2026

---

# Purpose

This document defines the official naming conventions used throughout the InvoicePro platform.

Consistent naming improves:

- Readability
- Maintainability
- Team Collaboration
- Searchability
- Documentation Quality
- Developer Experience

These conventions apply to all repositories, services, documentation, databases, APIs, and infrastructure.

---

# General Principles

Every name should be:

- Clear
- Descriptive
- Consistent
- Predictable
- Domain-Oriented

Avoid:

- Abbreviations
- Ambiguous names
- Personal naming styles
- One-letter variables (except loops)

---

# Business Terminology

Always use terms defined in the Product Glossary.

Example

✅ Customer

❌ Client

---

✅ Organization

❌ Company

---

# File Naming

Use:

```text
kebab-case
```

Examples

```text
customer-service.ts

invoice-controller.ts

payment.repository.ts

database-architecture.md
```

Avoid

```text
CustomerService.ts

customerService.ts

CUSTOMER_SERVICE.ts
```

---

# Folder Naming

Use:

```text
kebab-case
```

Examples

```text
customer

invoice

payment

shared

middlewares
```

---

# TypeScript Variables

Use:

```text
camelCase
```

Examples

```typescript
customerId

invoiceNumber

totalAmount

paymentMethod
```

---

# Constants

Use:

```text
UPPER_SNAKE_CASE
```

Examples

```text
JWT_SECRET

MAX_FILE_SIZE

DEFAULT_PAGE_SIZE

API_VERSION
```

---

# Functions

Use:

```text
camelCase
```

Function names should start with verbs.

Examples

```typescript
createInvoice()

calculateTax()

sendEmail()

validatePermission()

generateInvoiceNumber()
```

---

# Classes

Use:

```text
PascalCase
```

Examples

```typescript
InvoiceService

CustomerRepository

PaymentController

NotificationWorker
```

---

# Interfaces

Use:

```text
PascalCase
```

Prefix with **I** only if the project adopts that convention consistently.

Recommended

```typescript
Customer

InvoiceRepository

PaymentGateway
```

Avoid

```typescript
ICustomer

IInvoiceRepository
```

---

# Types

Use:

```text
PascalCase
```

Examples

```typescript
CustomerDto

InvoiceStatus

PaymentMethod

UserSession
```

---

# Enums

Use:

```text
PascalCase
```

Members use:

```text
UPPER_SNAKE_CASE
```

Example

```typescript
enum InvoiceStatus {
    DRAFT,
    SENT,
    PAID,
    CANCELLED
}
```

---

# React Components

Use:

```text
PascalCase
```

Examples

```text
CustomerTable

InvoiceForm

PaymentModal

DashboardCard
```

---

# React Hooks

Always begin with

```text
use
```

Examples

```typescript
useAuth()

useInvoices()

usePermissions()

useCurrentOrganization()
```

---

# API Endpoints

Use:

```text
Plural

Lowercase

kebab-case
```

Examples

```text
/customers

/invoices

/payment-methods

/invoice-items
```

Avoid

```text
/getCustomers

/customer

/InvoiceItems
```

---

# Query Parameters

Use:

```text
camelCase
```

Examples

```text
customerId

createdFrom

createdTo

page

limit

sort
```

---

# Database Tables

Use:

```text
snake_case

Plural
```

Examples

```text
customers

invoice_items

payment_methods

organization_memberships
```

---

# Database Columns

Use:

```text
snake_case
```

Examples

```text
customer_id

created_at

updated_at

organization_id
```

---

# Primary Keys

Use

```text
id
```

Foreign Keys

```text
customer_id

invoice_id

organization_id
```

---

# Prisma Models

Use:

```text
PascalCase

Singular
```

Examples

```text
Customer

Invoice

Payment

Organization
```

---

# Prisma Fields

Use:

```text
camelCase
```

Examples

```text
customerId

createdAt

updatedAt

invoiceNumber
```

---

# Environment Variables

Use:

```text
UPPER_SNAKE_CASE
```

Examples

```text
DATABASE_URL

JWT_SECRET

REDIS_URL

SMTP_HOST

AWS_REGION
```

---

# Docker Resources

Images

```text
invoicepro-api
```

Containers

```text
invoicepro-api-dev
```

Networks

```text
invoicepro-network
```

Volumes

```text
invoicepro-postgres-data
```

---

# Redis Keys

Use:

```text
namespace:resource:id
```

Examples

```text
auth:session:123

invoice:cache:456

rate-limit:user:789
```

---

# Queue Names

Use:

```text
kebab-case
```

Examples

```text
email-queue

notification-queue

webhook-delivery

report-generation
```

---

# Event Names

Use:

```text
resource.action
```

Examples

```text
invoice.created

payment.completed

customer.updated

user.invited
```

---

# Permission Names

Use:

```text
resource.action
```

Examples

```text
invoice.read

invoice.create

invoice.update

payment.refund
```

---

# Git Branches

Examples

```text
feature/customer-module

feature/payment-api

bugfix/login-timeout

hotfix/security-patch

release/v1.2.0

docs/api-architecture
```

---

# Commit Messages

Follow Conventional Commits.

Examples

```text
feat: add customer import

fix: resolve payment validation issue

docs: update api architecture

refactor: simplify invoice service

test: add payment integration tests

chore: update dependencies
```

---

# Documentation Files

Use:

```text
kebab-case
```

Examples

```text
system-architecture.md

database-architecture.md

coding-standards.md
```

---

# API Versions

Examples

```text
/api/v1

/api/v2
```

Never

```text
/api/version1
```

---

# Abbreviations

Avoid unless universally accepted.

Acceptable

```text
API

URL

UUID

JWT

PDF

CSV
```

Avoid

```text
Cust

Inv

Org

Usr
```

---

# Reserved Prefixes

```text
use     React Hooks

is      Boolean Values

has     Boolean Values

can     Boolean Values

get     Read Functions

set     Write Functions

create  Resource Creation

update  Resource Update

delete  Resource Deletion

validate Validation

generate Generation
```

---

# Examples

| Item | Convention | Example |
|------|------------|---------|
| Variable | camelCase | customerId |
| Function | camelCase | createInvoice |
| Class | PascalCase | InvoiceService |
| Component | PascalCase | CustomerTable |
| Hook | camelCase | useInvoices |
| Table | snake_case | invoice_items |
| Column | snake_case | customer_id |
| API | kebab-case | /payment-methods |
| Folder | kebab-case | customer-service |
| File | kebab-case | invoice-service.ts |
| Environment | UPPER_SNAKE_CASE | DATABASE_URL |

---

# Architecture Decision

Decision

Adopt a single naming convention across documentation, source code, infrastructure, APIs, and databases.

---

Reason

Consistent naming improves readability, reduces onboarding time, minimizes confusion, and supports long-term maintainability.

---

# Revision History

| Version | Date | Author | Changes |
|----------|------|--------|---------|
| 1.0.0 | 25 June 2026 | Infoogle Software Solutions LLP | Initial Draft |