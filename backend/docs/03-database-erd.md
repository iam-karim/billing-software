# InvoicePro - Database Architecture (ERD)

# Purpose

This document defines the complete database architecture of InvoicePro.

The database is designed using Domain-Driven Design (DDD) principles and follows a multi-tenant architecture.

Every business entity belongs to an organization, ensuring complete tenant isolation.

---

# Design Principles

The database follows these principles:

* Multi Tenant
* Highly Normalized
* Scalable
* Secure
* Auditable
* Extensible
* Country Independent

---

# Root Entity

```
Platform

│

└── Organization
```

Everything starts from Organization.

---

# Identity Domain

```
Organization

├── Branches

├── Users

├── Memberships

├── Roles

├── Permissions

├── Invitations

├── Sessions

├── Refresh Tokens

├── Password Reset

├── Email Verification

└── Audit Logs
```

---

# CRM Domain

```
Organization

├── Clients

├── Client Contacts

├── Vendors

└── Vendor Contacts
```

---

# Inventory Domain

```
Organization

├── Categories

├── Products

├── Services

├── Units

├── Warehouses

├── Stock

├── Stock Movements

├── Stock Transfers

└── Stock Adjustments
```

---

# Sales Domain

```
Organization

├── Quotations

├── Estimates

├── Sales Orders

├── Invoices

├── Invoice Items

├── Payments

├── Credit Notes

├── Debit Notes

└── Recurring Invoices
```

---

# Purchase Domain

```
Organization

├── Purchase Orders

├── Purchase Bills

├── Purchase Items

└── Vendor Payments
```

---

# Accounting Domain

```
Organization

├── Accounts

├── Journal Entries

├── Ledger Entries

├── Transactions

├── Expenses

├── Income

├── Bank Accounts

└── Reconciliation
```

---

# Tax Domain

```
Organization

├── Tax Rates

├── Tax Groups

├── Tax Registrations

└── Tax Transactions
```

---

# Reporting Domain

```
Organization

├── Sales Reports

├── Purchase Reports

├── Inventory Reports

├── Financial Reports

└── Tax Reports
```

---

# Subscription Domain

```
Platform

├── Plans

├── Features

├── Subscriptions

├── Coupons

└── Payments
```

---

# Notification Domain

```
Organization

├── Notifications

├── Email Templates

├── SMS Templates

└── WhatsApp Templates
```

---

# File Management

```
Platform

└── Files
```

Every uploaded file is stored only once.

Invoices, organizations, products and users reference the same file record.

---

# AI Domain

```
Organization

├── OCR Jobs

├── AI Conversations

├── AI Reports

└── AI Suggestions
```

---

# Audit

Every critical operation should generate an audit log.

Examples:

* Login

* Invoice Created

* Invoice Deleted

* Payment Updated

* User Created

* Permission Changed

---

# Future Modules

The architecture is prepared for:

* HRMS

* Payroll

* POS

* Manufacturing

* Asset Management

* Project Management

* CRM Automation

without changing existing tables.

---

# Database Strategy

Every table should include common audit fields.

Standard Fields:

* id
* organizationId (where applicable)
* createdAt
* updatedAt
* createdBy
* updatedBy
* deletedAt (Soft Delete)
* status

---

# Soft Delete

Records should never be permanently deleted.

Soft delete should be used throughout the platform.

---

# UUID

All primary keys should use UUID.

No auto increment IDs.

---

# Transactions

All financial operations must execute inside database transactions.

Examples:

* Invoice Creation

* Payment

* Expense

* Purchase

* Subscription

---

# Indexing Strategy

Indexes should be added on:

* organizationId

* branchId

* userId

* invoiceNumber

* clientId

* email

* createdAt

* status

to optimize performance for enterprise workloads.
