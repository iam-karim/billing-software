# InvoicePro - System Architecture

# Purpose

This document defines the overall backend architecture of InvoicePro.

The goal is to build a scalable, maintainable, secure, and enterprise-grade SaaS platform capable of serving thousands of organizations from a single codebase.

---

# Architecture Style

InvoicePro follows a Feature-Based Modular Architecture inspired by Clean Architecture.

Each business module owns its own controllers, services, validations, routes, and business logic.

There are no global controllers or global services.

---

# Architecture Layers

```
Client (Web / Mobile)
        │
        ▼
Express HTTP Server
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL (Neon)
```

Business rules always remain inside Services.

Controllers should never contain business logic.

Repositories should only communicate with the database.

---

# Project Structure

```
src/

config/
    Application configuration
    Environment
    Database
    Constants

modules/

    auth/
    organizations/
    branches/
    users/
    roles/
    permissions/

    clients/
    vendors/

    products/
    inventory/
    warehouses/

    quotations/
    invoices/
    payments/

    expenses/
    accounting/

    reports/

    subscriptions/

    notifications/

    super-admin/

shared/

    database/
    middleware/
    validators/
    helpers/
    errors/
    constants/
    types/
    logger/

docs/

app.ts

index.ts
```

---

# Module Structure

Every module follows the same internal structure.

Example:

```
modules/users/

controllers/
services/
repositories/
routes/
validators/
dto/
types/
interfaces/
```

This keeps every feature isolated and easy to maintain.

---

# Request Lifecycle

```
Request

↓

Middleware

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

Database

↓

Response
```

---

# Responsibilities

## Routes

* Register endpoints
* Attach middleware
* Forward request to controller

No business logic.

---

## Controllers

Responsible for:

* Reading request
* Calling service
* Returning response

Controllers never access Prisma directly.

---

## Services

Responsible for:

* Business rules
* Validations
* Calculations
* Authorization
* Transactions

Most project logic lives here.

---

## Repositories

Responsible only for database operations.

Example:

* findUser()
* createInvoice()
* updatePayment()

No business rules.

---

# Authentication

Authentication uses JWT.

Future support:

* Google Login
* Microsoft Login
* Two Factor Authentication

---

# Authorization

RBAC (Role Based Access Control)

```
Organization

↓

Role

↓

Permission

↓

User
```

Permissions are checked in middleware.

---

# Multi-Tenant Strategy

Every business record belongs to an Organization.

Example:

Organization

├── Branches

├── Users

├── Clients

├── Products

├── Invoices

├── Expenses

├── Reports

Data isolation is mandatory.

A user must never access another organization's data.

---

# Error Handling

Centralized error handler.

Standard response format.

```
Success

{
    success: true,
    message: "...",
    data: {}
}
```

```
Failure

{
    success: false,
    message: "...",
    errors: []
}
```

---

# Logging

Every important action should be logged.

Examples:

* Login
* Password Change
* Invoice Created
* Payment Received
* Organization Updated

Future:

Winston

CloudWatch

---

# Validation

All incoming requests must be validated using Zod.

Controllers should never trust request data.

---

# Security

* Helmet
* CORS
* Compression
* Rate Limiting
* JWT Authentication
* Password Hashing
* Input Validation
* SQL Injection Protection
* Audit Logging

---

# Scalability Principles

* Feature-based modules
* Thin controllers
* Business logic inside services
* Repository pattern
* Stateless APIs
* Environment-based configuration
* Database transactions where required

---

# Future Expansion

Architecture is designed to support:

* Mobile Applications
* Public APIs
* Webhooks
* Background Jobs
* Queues
* Microservices
* AI Services
* Multiple Databases
* Horizontal Scaling

without major refactoring.
